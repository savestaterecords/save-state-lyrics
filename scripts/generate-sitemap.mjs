import { writeFileSync } from "node:fs"
import { createServer } from "vite"

const BASE_URL = "https://lyr.savestate.fm"

const vite = await createServer({
    server: { middlewareMode: true },
    appType: "custom",
})

const { artists, getArtistBySlug } = await vite.ssrLoadModule("/src/data/registry.ts")
const { getMiscTracksByArtist } = await vite.ssrLoadModule("/src/utils/resolveMiscTracksByArtist.ts")

const urls = [`${BASE_URL}/`, `${BASE_URL}/about/`]

for (const entry of artists) {
    const artist = getArtistBySlug(entry.slug)
    if (!artist) continue

    urls.push(`${BASE_URL}/${artist.slug}/`)

    for (const release of artist.releases) {
        if (release.private === true) continue

        urls.push(`${BASE_URL}/${artist.slug}/${release.slug}/`)

        for (const track of release.tracklist) {
            urls.push(`${BASE_URL}/${artist.slug}/${release.slug}/${track.slug}/`)
        }
    }

    for (const track of getMiscTracksByArtist(artist.slug)) {
        urls.push(`${BASE_URL}/${artist.slug}/misc/${track.slug}/`)
    }
}

await vite.close()

const xml =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    urls.map((url) => `  <url><loc>${url}</loc></url>`).join("\n") +
    `\n</urlset>\n`

writeFileSync(new URL("../public/sitemap.xml", import.meta.url), xml)

console.log(`sitemap.xml written with ${urls.length} URLs`)
