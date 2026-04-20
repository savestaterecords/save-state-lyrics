import { useParams } from "react-router-dom"
import { getArtistBySlug } from "../data/registry.ts"
import SongView from "../views/SongView.tsx"
import { getLyricBySlug } from "../utils/resolveLyricsBySlug.ts"
import { getMiscTracksByArtist } from "../utils/resolveMiscTracksByArtist.ts"
import type { Release } from "../types/Release.ts"

export default function MiscSongRoute() {
    const { artistSlug, trackSlug } = useParams()

    if (!artistSlug || !trackSlug) {
        return <div className="site-column">Nothing added yet. Tell Rain to work harder.</div>
    }

    const artist = getArtistBySlug(artistSlug)

    if (!artist) {
        return <div className="site-column">Nothing added yet. Tell Rain to work harder.</div>
    }

    const miscTracks = getMiscTracksByArtist(artistSlug)
    const track = miscTracks.find((entry) => entry.slug === trackSlug)

    if (!track) {
        return <div className="site-column">Nothing added yet. Tell Rain to work harder.</div>
    }

    const lyric = getLyricBySlug(trackSlug)

    if (!lyric) {
        return <div className="site-column">Nothing added yet. Tell Rain to work harder.</div>
    }

    const miscRelease: Release = {
        slug: "misc",
        title: "Misc",
        artist: artist.name,
        artistSlug: artist.slug,
        type: "track",
        releaseDate: 0,
        tracklist: miscTracks.map((entry) => ({
            title: entry.title,
            slug: entry.slug,
        })),
    }

    return <SongView lyric={lyric} release={miscRelease} />
}