import { Link } from "react-router-dom"
import type { CSSProperties } from "react"
import type { Lyric } from "../types/Lyric.ts"
import type { Release } from "../types/Release.ts"
import { useTranslation } from "../context/TranslationContext.tsx"
import { pickText } from "../utils/pickText.ts"
import "../style/SongView.css"

type SongViewProps = {
    lyric: Lyric
    release: Release
}

export default function SongView({ lyric, release }: SongViewProps) {
    const { showTranslation } = useTranslation()

    const theme = release.theme ?? null

    const songThemeStyle = {
        "--theme-h": String(theme?.Hue ?? 0),
        "--theme-s": theme?.strength ?? "0%",
        "--theme-h2": String(theme?.falloffHue ?? theme?.Hue ?? 0),
        "--theme-s-delta": theme?.falloffStrength ?? "0%",
        "--theme-l-delta": theme?.toWhite ?? "0%",
        "--theme-titles-h": String(theme?.titlesHue ?? theme?.falloffHue ?? theme?.Hue ?? 0),
    } as CSSProperties

    const trackIndex = release.tracklist.findIndex((track) => track.slug === lyric.slug)
    const previousTrack = trackIndex > 0 ? release.tracklist[trackIndex - 1] : null
    const nextTrack =
        trackIndex >= 0 && trackIndex < release.tracklist.length - 1
            ? release.tracklist[trackIndex + 1]
            : null

    return (
        <div className="song-page" style={songThemeStyle}>
            <div className="site-column song-view">
                <div className="song-meta">
                    <h1 className="song-title">
                        {pickText(lyric.head.title, showTranslation)}
                    </h1>

                    <p className="song-subtitle">
                        <Link
                            to={`/${release.artistSlug}/`}
                            className="song-artist-link"
                        >
                            {release.artistSlug === "posadas"
                                ? "Posadas"
                                : release.artistSlug}
                        </Link>
                        <span className="song-subtitle-separator"> - </span>
                        <Link
                            to={`/${release.artistSlug}/${release.slug}/`}
                            className="song-release-link"
                        >
                            {pickText(release.title, showTranslation)}
                        </Link>
                    </p>
                </div>

                <div className="song-body">
                    {"blocks" in lyric.body ? (
                        lyric.body.blocks.map((block, index) => {
                            if (block.type === "scripture") {
                                return (
                                    <p key={index} className="song-lyric-text scripture">
                                        {pickText(block.text, showTranslation)}
                                    </p>
                                )
                            }

                            if (block.type === "feature") {
                                return (
                                    <p key={index} className="song-lyric-text feature">
                                        {pickText(block.text, showTranslation)}
                                    </p>
                                )
                            }

                            return (
                                <p key={index} className="song-lyric-text">
                                    {pickText(block.text, showTranslation)}
                                </p>
                            )
                        })
                    ) : (
                        <p className="song-lyric-text">
                            {pickText(lyric.body.lyrics, showTranslation)}
                        </p>
                    )}
                </div>

                {lyric.body.footnotes && (
                    <div className="song-footnotes">
                        <p className="song-footnotes-text">
                            {pickText(lyric.body.footnotes, showTranslation)}
                        </p>
                    </div>
                )}

                {lyric.body.credits && (
                    <div className="song-credits">
                        <p className="song-credits-text">
                            {pickText(lyric.body.credits, showTranslation)}
                        </p>
                    </div>
                )}

                <div className="song-nav">
                    {previousTrack ? (
                        <Link
                            to={`/${release.artistSlug}/${release.slug}/${previousTrack.slug}/`}
                            className="song-nav-link song-nav-prev"
                        >
                            ← {pickText(previousTrack.title, showTranslation)}
                        </Link>
                    ) : (
                        <span className="song-nav-spacer" />
                    )}

                    {nextTrack ? (
                        <Link
                            to={`/${release.artistSlug}/${release.slug}/${nextTrack.slug}/`}
                            className="song-nav-link song-nav-next"
                        >
                            {pickText(nextTrack.title, showTranslation)} →
                        </Link>
                    ) : (
                        <span className="song-nav-spacer" />
                    )}
                </div>
            </div>
        </div>
    )
}