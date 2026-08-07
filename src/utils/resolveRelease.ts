import type { Artist } from "../types/Artist.ts"
import type { Release } from "../types/Release.ts"
import { artists, getArtistBySlug } from "../data/registry.ts"

export function getLatestRelease(): Release | undefined {
    const publicReleases = artists
        .map((entry) => getArtistBySlug(entry.slug))
        .filter((artist): artist is Artist => artist !== undefined)
        .flatMap((artist) => artist.releases)
        .filter((release) => release.private !== true)

    if (publicReleases.length === 0) return undefined

    return publicReleases.reduce((mostRecent, release) =>
        release.releaseDate > mostRecent.releaseDate ? release : mostRecent
    )
}

export function getReleaseBySlug(artistSlug: string, releaseSlug: string): Release | undefined {
    const artist = getArtistBySlug(artistSlug)
    return artist?.releases.find((release) => release.slug === releaseSlug)
}
