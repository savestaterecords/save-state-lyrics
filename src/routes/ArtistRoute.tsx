import { useParams } from "react-router-dom";
import { getArtistBySlug } from "../data/registry.ts";
import ArtistView from "../views/ArtistView.tsx";

export default function ArtistRoute() {
    const { artistSlug } = useParams()

    if (!artistSlug) {
        return <div className="site-column">Nothing added yet. Tell Rain to work harder.</div>
    }

    const artist = getArtistBySlug(artistSlug)

    if (!artist) {
        return <div className="site-column">Nothing added yet. Tell Rain to work harder.</div>
    }

    return <ArtistView artist={artist} />
}