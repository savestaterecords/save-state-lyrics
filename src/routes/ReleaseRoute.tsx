import { useParams } from "react-router-dom"
import { getArtistBySlug } from "../data/registry.ts"
import ReleaseView from "../views/ReleaseView.tsx"

export default function ReleaseRoute() {
    const { artistSlug, releaseSlug } = useParams()

    if (!artistSlug || !releaseSlug) {
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

    return <ReleaseView release={release} />
}