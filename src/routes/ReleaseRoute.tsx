import { useParams } from "react-router-dom"
import { getArtistBySlug } from "../data/registry.ts"
import ReleaseView from "../views/ReleaseView.tsx"
import { useNoindex } from "../utils/useNoindex.ts"

export default function ReleaseRoute() {
    const { artistSlug, releaseSlug } = useParams()

    const artist = artistSlug ? getArtistBySlug(artistSlug) : undefined
    const release = artist?.releases.find((entry) => entry.slug === releaseSlug)

    useNoindex(release?.private === true)

    if (!artistSlug || !releaseSlug || !artist || !release) {
        return <div className="site-column">Nothing added yet. Tell Rain to work harder.</div>
    }

    return <ReleaseView release={release} />
}