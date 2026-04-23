import { Link } from "react-router-dom"
import { artists } from "../data/registry.ts"
import type { Release } from "../types/Release.ts"
import "../style/ReleaseView.css"
import { getLyricBySlug } from "../utils/resolveLyricsBySlug.ts"
import { useTranslation } from "../context/TranslationContext.tsx"
import type { CSSProperties } from "react"
import { useEffect, useState } from "react"
import {pickText} from "../utils/pickText.tsx";
import {renderCreditsWithHandles} from "../utils/renderCreditsWithHandles.tsx";

const releaseImages = import.meta.glob("../img/release/*/*.{jpg,jpeg,webp}", {
    eager: true,
    import: "default",
}) as Record<string, string>

type ReleaseViewProps = {
    release: Release
}

function getReleaseImages(
    artistSlug: string,
    releaseSlug: string,
): { thumb?: string; full?: string } {
    const thumbCandidates = [
        `../img/release/${artistSlug}/${releaseSlug}_thumb.webp`,
    ]

    const fullCandidates = [
        `../img/release/${artistSlug}/${releaseSlug}.jpg`,
        `../img/release/${artistSlug}/${releaseSlug}.jpeg`,
        `../img/release/${artistSlug}/${releaseSlug}.webp`,
    ]

    let thumb: string | undefined
    let full: string | undefined

    for (const candidate of thumbCandidates) {
        if (candidate in releaseImages) {
            thumb = releaseImages[candidate]
            break
        }
    }

    for (const candidate of fullCandidates) {
        if (candidate in releaseImages) {
            full = releaseImages[candidate]
            break
        }
    }

    return { thumb, full }
}

function formatReleaseDate(date: number): string {
    const raw = date.toString().padStart(6, "0")

    const yy = raw.slice(0, 2)
    const mm = raw.slice(2, 4)
    const dd = raw.slice(4, 6)

    const year = Number(`20${yy}`)
    const monthIndex = Number(mm) - 1
    const day = Number(dd)

    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ]

    return `${months[monthIndex]} ${day}, ${year}`
}

export default function ReleaseView({ release }: ReleaseViewProps) {
    const { showTranslation } = useTranslation()

    const artist = artists
        .find((entry) => entry.slug === release.artistSlug)
    const artistName = artist?.name ?? release.artistSlug
    const releaseTitle = pickText(release.title, showTranslation)

    const { thumb: releaseThumbImage, full: releaseFullImage } = getReleaseImages(
        release.artistSlug,
        release.slug,
    )

    const [artOpen, setArtOpen] = useState(false)
    const theme = release.theme ?? null

    const releaseThemeStyle = {
        "--theme-h": String(theme?.Hue ?? 0),
        "--theme-s": theme?.strength ?? "0%",
        "--theme-h2": String(theme?.falloffHue ?? theme?.Hue ?? 0),
        "--theme-s-delta": theme?.falloffStrength ?? "0%",
        "--theme-l-delta": theme?.toWhite ?? "0%",
        "--theme-titles-h": String(theme?.titlesHue ?? theme?.falloffHue ?? theme?.Hue ?? 0),
    } as CSSProperties

    useEffect(() => {
        if (!artOpen) return

        const previousOverflow = document.body.style.overflow
        document.body.style.overflow = "hidden"

        window.history.pushState({ releaseArtOpen: true }, "")

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                window.history.back()
            }
        }

        const handlePopState = () => {
            setArtOpen(false)
        }

        window.addEventListener("keydown", handleKeyDown)
        window.addEventListener("popstate", handlePopState)

        return () => {
            document.body.style.overflow = previousOverflow
            window.removeEventListener("keydown", handleKeyDown)
            window.removeEventListener("popstate", handlePopState)
        }
    }, [artOpen])

    function openArt() {
        if (!releaseFullImage) return
        setArtOpen(true)
    }

    function closeArt() {
        if (artOpen) {
            window.history.back()
        }
    }

    return (
        <div className="release-page" style={releaseThemeStyle}>
            <div className="site-column release-head">
                {releaseFullImage && (
                    <button
                        type="button"
                        className="release-art-button"
                        onClick={openArt}
                        aria-label={`Open ${releaseTitle} album art`}
                    >
                        <div className="release-art-frame">
                            <img
                                className="release-art"
                                src={releaseThumbImage ?? releaseFullImage}
                                alt={`${releaseTitle} album art`}
                                draggable={false}
                            />
                        </div>
                    </button>
                )}

                <h1 className="release-title">{releaseTitle}</h1>

                <p className="release-meta">
                    <Link
                        to={`/${release.artistSlug}/`}
                        className="release-artist-link"
                    >
                        {pickText(artistName, showTranslation)}
                    </Link>
                    <span className="release-meta-separator"> ・ </span>
                    <span>{formatReleaseDate(release.releaseDate)}</span>
                </p>
            </div>

            <div className="site-column release-body">
                {release.tracklist.map((track) => {
                    const lyric = getLyricBySlug(track.slug)

                    if (!lyric) {
                        return (
                            <section key={track.slug} className="release-lyric-block missing">
                                <h2>{pickText(track.title, showTranslation)}</h2>
                                <p>Missing lyric</p>
                            </section>
                        )
                    }

                    return (
                        <section
                            key={lyric.slug}
                            className="release-lyric-block"
                            id={lyric.slug}
                        >
                            <h2 className="release-lyric-title">
                                <Link
                                    to={`/${release.artistSlug}/${release.slug}/${track.slug}/`}
                                    className="release-lyric-title-link"
                                >
                                    {pickText(lyric.head.title, showTranslation)}
                                </Link>
                            </h2>

                            {"blocks" in lyric.body ? (
                                lyric.body.blocks.map((block, index) => {
                                    if (block.type === "scripture") {
                                        return (
                                            <p key={index} className="release-lyric-text scripture">
                                                {pickText(block.text, showTranslation)}
                                            </p>
                                        )
                                    }

                                    if (block.type === "feature") {
                                        return (
                                            <p key={index} className="release-lyric-text feature">
                                                {pickText(block.text, showTranslation)}
                                            </p>
                                        )
                                    }

                                    return (
                                        <p key={index} className="release-lyric-text">
                                            {pickText(block.text, showTranslation)}
                                        </p>
                                    )
                                })
                            ) : (
                                <p className="release-lyric-text">
                                    {pickText(lyric.body.lyrics, showTranslation)}
                                </p>
                            )}
                        </section>
                    )
                })}
            </div>

            {release.credits && (
                <div className="site-column release-foot">
                    <p className="release-credits">
                        {renderCreditsWithHandles(pickText(release.credits, showTranslation))}
                    </p>
                </div>
            )}

            {artOpen && releaseFullImage && (
                <div
                    className="release-art-modal"
                    role="dialog"
                    aria-modal="true"
                    aria-label={`${releaseTitle} album art`}
                    onClick={closeArt}
                >
                    <button
                        type="button"
                        className="release-art-modal-close"
                        onClick={(event) => {
                            event.stopPropagation()
                            closeArt()
                        }}
                        aria-label="Close album art"
                    >
                        ×
                    </button>

                    <img
                        className="release-art-modal-image"
                        src={releaseFullImage}
                        alt={`${releaseTitle} album art`}
                        draggable={false}
                        onClick={(event) => event.stopPropagation()}
                    />
                </div>
            )}
        </div>
    )
}