import { Link } from "react-router-dom"
import type { Artist } from "../types/Artist"
import "../style/ArtistView.css"
import ArtistBanner from "../components/ArtistBanner.tsx"
import { useTranslation } from "../context/TranslationContext.tsx"
import { pickText } from "../utils/pickText.tsx"
import { getMiscTracksByArtist } from "../utils/resolveMiscTracksByArtist.ts"

type ArtistViewProps = {
    artist: Artist
}

const sectionOrder = [
    "album",
    "mini-album",
    "ep",
    "single",
    "other",
    "demo",
] as const

const sectionLabels: Record<(typeof sectionOrder)[number], string> = {
    album: "Albums",
    "mini-album": "Mini-Albums",
    ep: "EPs",
    single: "Singles",
    other: "Other",
    demo: "Demos",
}

export default function ArtistView({ artist }: ArtistViewProps) {
    const { showTranslation } = useTranslation()
    const miscTracks = getMiscTracksByArtist(artist.slug)

    const releaseSections = sectionOrder
        .map((type) => ({
            type,
            releases: artist.releases
                .filter((release) => release.type === type)
                .sort((a, b) => b.releaseDate - a.releaseDate),
        }))
        .filter((section) => section.releases.length > 0)

    const hasRealReleaseSections = releaseSections.length > 0

    return (
        <div className="artist-page">
            <ArtistBanner artist={artist} />

            <div className="site-column artist-view">
                {releaseSections.map(({ type, releases }) => (
                    <section key={type} className="artist-release-group">
                        <h2 className="artist-release-group-title">
                            {sectionLabels[type]}
                        </h2>

                        <ul className="artist-release-list">
                            {releases.map((release) => (
                                <li key={release.slug}>
                                    <Link
                                        to={`/${artist.slug}/${release.slug}/`}
                                        className="artist-release-link"
                                    >
                                        {pickText(release.title, showTranslation)}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </section>
                ))}

                {miscTracks.length > 0 && (
                    <section className="artist-release-group">
                        {hasRealReleaseSections && (
                            <h2 className="artist-release-group-title">Misc</h2>
                        )}

                        <ul className="artist-release-list">
                            {miscTracks.map((track) => (
                                <li key={track.slug}>
                                    <Link
                                        to={`/${artist.slug}/misc/${track.slug}/`}
                                        className="artist-release-link"
                                    >
                                        {pickText(track.title, showTranslation)}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </section>
                )}
            </div>
        </div>
    )
}