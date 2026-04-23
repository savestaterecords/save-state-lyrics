import { Link, useNavigate, useParams } from "react-router-dom"
import type { CSSProperties } from "react"
import type { Lyric } from "../types/Lyric.ts"
import type { Release } from "../types/Release.ts"
import type { CreditPeople } from "../types/Credit.ts"
import { useEffect, useRef } from "react"
import { useTranslation } from "../context/TranslationContext.tsx"
import { pickText } from "../utils/pickText.tsx"
import { renderCreditsWithHandles } from "../utils/renderCreditsWithHandles.tsx"
import "../style/SongView.css"

type SongViewProps = {
    lyric: Lyric
    release: Release
}

function formatPeople(people: CreditPeople): string {
    return Array.isArray(people) ? people.join(", ") : people
}

export default function SongView({ lyric, release }: SongViewProps) {
    const { showTranslation } = useTranslation()
    const navigate = useNavigate()
    const { trackSlug } = useParams()
    const songPageRef = useRef<HTMLDivElement | null>(null)

    const isMisc = release.slug === "misc"
    const theme = release.theme ?? null

    const songThemeStyle = {
        "--theme-h": String(theme?.Hue ?? 0),
        "--theme-s": theme?.strength ?? "0%",
        "--theme-h2": String(theme?.falloffHue ?? theme?.Hue ?? 0),
        "--theme-s-delta": theme?.falloffStrength ?? "0%",
        "--theme-l-delta": theme?.toWhite ?? "0%",
        "--theme-titles-h": String(theme?.titlesHue ?? theme?.falloffHue ?? theme?.Hue ?? 0),
    } as CSSProperties

    function buildSongPath(slug: string): string {
        if (isMisc) {
            return `/${release.artistSlug}/misc/${slug}/`
        }

        return `/${release.artistSlug}/${release.slug}/${slug}/`
    }

    function goToAdjacentTrack(direction: "previous" | "next") {
        if (!trackSlug) return

        const trackIndex = release.tracklist.findIndex(
            (track) => track.slug === trackSlug
        )

        if (trackIndex === -1) return

        const targetIndex =
            direction === "previous"
                ? (trackIndex - 1 + release.tracklist.length) % release.tracklist.length
                : (trackIndex + 1) % release.tracklist.length

        const targetTrack = release.tracklist[targetIndex]

        navigate(buildSongPath(targetTrack.slug))
    }

    useEffect(() => {
        function handleKeyDown(event: KeyboardEvent) {
            if (event.key === "ArrowLeft") {
                goToAdjacentTrack("previous")
            }

            if (event.key === "ArrowRight") {
                goToAdjacentTrack("next")
            }
        }

        window.addEventListener("keydown", handleKeyDown)
        return () => window.removeEventListener("keydown", handleKeyDown)
    }, [trackSlug, release.tracklist, release.artistSlug, release.slug, navigate])

    useEffect(() => {
        const element = songPageRef.current
        if (!element) return

        let startX = 0
        let startY = 0

        function handleTouchStart(event: TouchEvent) {
            const touch = event.changedTouches[0]
            startX = touch.clientX
            startY = touch.clientY
        }

        function handleTouchEnd(event: TouchEvent) {
            const touch = event.changedTouches[0]
            const deltaX = touch.clientX - startX
            const deltaY = touch.clientY - startY

            const horizontalThreshold = 60

            if (Math.abs(deltaX) < horizontalThreshold) return
            if (Math.abs(deltaX) <= Math.abs(deltaY)) return

            if (deltaX > 0) {
                goToAdjacentTrack("previous")
            } else {
                goToAdjacentTrack("next")
            }
        }

        element.addEventListener("touchstart", handleTouchStart, { passive: true })
        element.addEventListener("touchend", handleTouchEnd, { passive: true })

        return () => {
            element.removeEventListener("touchstart", handleTouchStart)
            element.removeEventListener("touchend", handleTouchEnd)
        }
    }, [trackSlug, release.tracklist, release.artistSlug, release.slug, navigate])

    const compositionParts: Array<{ label: string; value: CreditPeople }> = []

    if (lyric.head.composition.lyrics) {
        compositionParts.push({
            label: "Lyrics",
            value: lyric.head.composition.lyrics,
        })
    }

    if (lyric.head.composition.music) {
        compositionParts.push({
            label: "Music",
            value: lyric.head.composition.music,
        })
    }

    if (lyric.head.composition.production) {
        compositionParts.push({
            label: "Production",
            value: lyric.head.composition.production,
        })
    }

    return (
        <div ref={songPageRef} className="song-page" style={songThemeStyle}>
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
                            {pickText(release.artist, showTranslation)}
                        </Link>

                        {!isMisc && (
                            <>
                                <span className="song-subtitle-separator"> - </span>
                                <Link
                                    to={`/${release.artistSlug}/${release.slug}/`}
                                    className="song-release-link"
                                >
                                    {pickText(release.title, showTranslation)}
                                </Link>
                            </>
                        )}
                    </p>

                    {compositionParts.length > 0 && (
                        <p className="song-composition">
                            {compositionParts.map((part, index) => (
                                <span key={part.label}>
                                    <span className="song-composition-label">
                                        {part.label}:
                                    </span>{" "}
                                    <span className="song-composition-value">
                                        {formatPeople(part.value)}
                                    </span>
                                    {index < compositionParts.length - 1 && (
                                        <span className="song-composition-separator"> ・ </span>
                                    )}
                                </span>
                            ))}
                        </p>
                    )}
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
                            {typeof lyric.body.credits === "string"
                                ? renderCreditsWithHandles(pickText(lyric.body.credits, showTranslation))
                                : renderCreditsWithHandles(pickText(lyric.body.credits, showTranslation))
                            }
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}