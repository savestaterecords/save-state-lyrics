import { useParams } from "react-router-dom"
import { getArtistBySlug } from "../data/registry.ts"
import SongView from "../views/SongView.tsx"
import { getLyricBySlug } from "../utils/resolveLyricsBySlug.ts"

export default function SongRoute() {
    const { artistSlug, releaseSlug, trackSlug } = useParams()

    if (!artistSlug || !releaseSlug || !trackSlug) {
        return <div className="site-column">Nothing added yet. Tell Rain to work harder.</div>
    }

    const artist = getArtistBySlug(artistSlug)

    if (!artist) {
        return <div className="site-column">Nothing added yet. Tell Rain to work harder.</div>
    }

    const release = artist.releases.find((entry) => entry.slug === releaseSlug)

    if (!release) {
        return <div className="site-column">Nothing added yet. Tell Rain to work harder.</div>
    }

    const track = release.tracklist.find((entry) => entry.slug === trackSlug)

    if (!track) {
        return <div className="site-column">Nothing added yet. Tell Rain to work harder.</div>
    }

    const lyric = getLyricBySlug(trackSlug)

    if (!lyric) {
        return <div className="site-column">Nothing added yet. Tell Rain to work harder.</div>
    }

    return <SongView lyric={lyric} release={release} />
}