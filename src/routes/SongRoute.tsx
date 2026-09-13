import { useParams } from "react-router-dom"
import { getArtistBySlug } from "../data/registry.ts"
import SongView from "../views/SongView.tsx"
import { getLyricByRelease } from "../utils/resolveLyricsBySlug.ts"
import { useNoindex } from "../utils/useNoindex.ts"

export default function SongRoute() {
    const { artistSlug, releaseSlug, trackSlug } = useParams()

    const artist = artistSlug ? getArtistBySlug(artistSlug) : undefined
    const release = artist?.releases.find((entry) => entry.slug === releaseSlug)

    useNoindex(release?.private === true)

    if (!artistSlug || !releaseSlug || !trackSlug || !artist || !release) {
        return <div className="site-column">Nothing added yet. Tell Rain to work harder.</div>
    }

    const track = release.tracklist
        .find((entry) => entry.slug === trackSlug)

    if (!track) {
        return <div className="site-column">Nothing added yet. Tell Rain to work harder.</div>
    }

    const lyric = getLyricByRelease(artistSlug, release.slug, trackSlug)

    if (!lyric) {
        return <div className="site-column">Nothing added yet. Tell Rain to work harder.</div>
    }

    return <SongView lyric={lyric} release={release} />
}