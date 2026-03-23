import { Link } from "react-router-dom"
import type { Artist } from "../types/Artist"
import "../style/ArtistView.css"
import ArtistBanner from "../components/ArtistBanner.tsx";

type ArtistViewProps = {
    artist: Artist
}

const sectionOrder = [
    "album",
    "mini-album",
    "ep",
    "single",
    "other",
    "track",
] as const

const sectionLabels: Record<(typeof sectionOrder)[number], string> = {
    album: "Albums",
    "mini-album": "Mini-Albums",
    ep: "EPs",
    single: "Singles",
    other: "Other",
    track: "Tracks",
}

export default function ArtistView({ artist }: ArtistViewProps) {
    return (
        <div className="artist-page">
            <ArtistBanner artist={artist} />

            <div className="site-column artist-view">

                {sectionOrder.map((type) => {
                    const releases = artist.releases
                        .filter((release) => release.type === type)
                        .sort((a, b) => b.releaseDate - a.releaseDate)

                    if (releases.length === 0) return null

                    return (
                        <section key={type} className="artist-release-group">
                            <h2 className="artist-release-group-title">{sectionLabels[type]}</h2>

                            <ul className="artist-release-list">
                                {releases.map((release) => (
                                    <li key={release.slug}>
                                        <Link
                                            to={`/${artist.slug}/${release.slug}/`}
                                            className="artist-release-link"
                                        >
                                            {release.title}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    )
                })}
            </div>
        </div>
    )
}