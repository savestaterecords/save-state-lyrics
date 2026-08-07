import type { CSSProperties } from "react"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getArtistBySlug } from "../../data/registry.ts"
import { useTranslation } from "../../context/TranslationContext.tsx"
import { pickText } from "../../utils/pickText.tsx"
import { formatReleaseDate } from "../../utils/formatReleaseDate.ts"
import { buildUpcomingStatusLine } from "../../utils/buildUpcomingStatusLine.ts"
import { resolveUpcoming } from "../../utils/resolveUpcoming.ts"
import upcoming from "../../data/upcoming.ts"

export default function UpcomingModule() {
    const { showTranslation } = useTranslation()

    const resolvedUpcoming = upcoming ? resolveUpcoming(upcoming) : null
    const upcomingArtist = resolvedUpcoming ? getArtistBySlug(resolvedUpcoming.artistSlug) : undefined
    const upcomingArtistLabel = resolvedUpcoming
        ? upcomingArtist
            ? pickText(upcomingArtist.name, showTranslation)
            : resolvedUpcoming.artistSlug
        : ""

    const upcomingAccentStyle = resolvedUpcoming?.accentHue !== undefined
        ? ({ "--upcoming-accent-h": String(resolvedUpcoming.accentHue) } as CSSProperties)
        : undefined

    const [upcomingArtOpen, setUpcomingArtOpen] = useState(false)

    useEffect(() => {
        if (!upcomingArtOpen) return

        const previousOverflow = document.body.style.overflow
        document.body.style.overflow = "hidden"

        window.history.pushState({ upcomingArtOpen: true }, "")

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                window.history.back()
            }
        }

        const handlePopState = () => {
            setUpcomingArtOpen(false)
        }

        window.addEventListener("keydown", handleKeyDown)
        window.addEventListener("popstate", handlePopState)

        return () => {
            document.body.style.overflow = previousOverflow
            window.removeEventListener("keydown", handleKeyDown)
            window.removeEventListener("popstate", handlePopState)
        }
    }, [upcomingArtOpen])

    function openUpcomingArt() {
        if (!resolvedUpcoming?.artFull) return
        setUpcomingArtOpen(true)
    }

    function closeUpcomingArt() {
        if (upcomingArtOpen) {
            window.history.back()
        }
    }

    const [tracklistOpen, setTracklistOpen] = useState(false)

    return (
        <>
            <section
                className={`home-demo-upcoming${resolvedUpcoming 
                    ? "" : " home-demo-upcoming--empty"}${upcomingAccentStyle ? " home-demo-upcoming--accent" : ""}`}
                style={upcomingAccentStyle}
            >
                {resolvedUpcoming && (
                    resolvedUpcoming.art ? (
                        resolvedUpcoming.artFull ? (
                            <button
                                type="button"
                                className="home-demo-upcoming-art home-demo-upcoming-art-button"
                                onClick={openUpcomingArt}
                                aria-label={`Open ${pickText(resolvedUpcoming.title, showTranslation)} album art`}
                            >
                                <img
                                    src={resolvedUpcoming.art}
                                    alt=""
                                    className="home-demo-upcoming-art-img"
                                    draggable={false}
                                />
                            </button>
                        ) : (
                            <div className="home-demo-upcoming-art">
                                <img
                                    src={resolvedUpcoming.art}
                                    alt=""
                                    className="home-demo-upcoming-art-img"
                                    draggable={false}
                                />
                            </div>
                        )
                    ) : (
                        <div
                            className="home-demo-upcoming-art"
                            role="img"
                            aria-label="No artwork available yet"
                        >
                            <span aria-hidden="true">♫</span>
                        </div>
                    )
                )}

                <div className="home-demo-upcoming-main">
                    {resolvedUpcoming ? (
                        <>
                            <p className="home-demo-upcoming-status">
                                <span className="home-demo-upcoming-tag">next release:</span>
                                {" "}
                                {buildUpcomingStatusLine(resolvedUpcoming, showTranslation)}
                            </p>
                            <div className="home-demo-upcoming-stack">
                                <p className="home-demo-upcoming-stack-line home-demo-upcoming-stack-tag">
                                    next release:
                                </p>
                                <p className="home-demo-upcoming-stack-line">
                                    {upcomingArtistLabel}
                                </p>
                                <p className="home-demo-upcoming-stack-line">
                                    {pickText(resolvedUpcoming.title, showTranslation)}
                                </p>
                                {resolvedUpcoming.releaseDate && (
                                    <p className="home-demo-upcoming-stack-line">
                                        {formatReleaseDate(resolvedUpcoming.releaseDate)}
                                    </p>
                                )}
                                {resolvedUpcoming.note && resolvedUpcoming.note.split(", ")
                                    .map((part) => (
                                    <p
                                        key={part}
                                        className="home-demo-upcoming-stack-line home-demo-upcoming-stack-note"
                                    >
                                        {part}
                                    </p>
                                ))}
                            </div>
                        </>
                    ) : (
                        <p className="home-demo-upcoming-empty">
                            Lyrics for all works of Save State Records.
                        </p>
                    )}
                </div>

                {resolvedUpcoming && resolvedUpcoming.resources.length > 0 && (
                    <ul className="home-demo-resource-list">
                        {resolvedUpcoming.resources.map((resource) => (
                            <li key={resource.label}>
                                {resource.label === "tracklist" && resolvedUpcoming.tracklist ? (
                                    <button
                                        type="button"
                                        className={
                                            `home-demo-resource home-demo-resource-button${tracklistOpen 
                                            ? " is-open" : ""}`
                                        }
                                        onClick={() => setTracklistOpen((open) => !open)}
                                        aria-expanded={tracklistOpen}
                                    >
                                        {resource.label}
                                    </button>
                                ) : resource.disabled ? (
                                    <span className="home-demo-resource home-demo-resource--disabled">
                                        {resource.label}
                                    </span>
                                ) : (
                                    <Link
                                        to={resource.href}
                                        className="home-demo-resource"
                                    >
                                        {resource.label}
                                    </Link>
                                )}
                            </li>
                        ))}
                    </ul>
                )}

                {resolvedUpcoming?.tracklist && (
                    <div
                        className={`home-demo-tracklist-drawer${tracklistOpen ? " is-open" : ""}`}
                    >
                        <div className="home-demo-tracklist-drawer-inner">
                            <div className="home-demo-tracklist-drawer-content">
                                <p className="home-demo-tracklist-drawer-title">
                                    {pickText(resolvedUpcoming.title, showTranslation)}
                                </p>

                                <ol className="home-demo-tracklist">
                                    {resolvedUpcoming.tracklist.map((track) => {
                                        const label = pickText(track.title, showTranslation).trim()

                                        return (
                                            <li key={track.number} className="home-demo-tracklist-row">
                                                <span className="home-demo-tracklist-num">
                                                    {String(track.number).padStart(2, "0")}
                                                </span>
                                                <span className="home-demo-tracklist-title">
                                                    {label || "________"}
                                                </span>
                                            </li>
                                        )
                                    })}
                                </ol>
                            </div>
                        </div>
                    </div>
                )}
            </section>

            {upcomingArtOpen && resolvedUpcoming?.artFull && (
                <div
                    className="home-demo-upcoming-art-modal"
                    role="dialog"
                    aria-modal="true"
                    aria-label={`${pickText(resolvedUpcoming.title, showTranslation)} album art`}
                    onClick={closeUpcomingArt}
                >
                    <button
                        type="button"
                        className="home-demo-upcoming-art-modal-close"
                        onClick={(event) => {
                            event.stopPropagation()
                            closeUpcomingArt()
                        }}
                        aria-label="Close album art"
                    >
                        ×
                    </button>

                    <img
                        className="home-demo-upcoming-art-modal-image"
                        src={resolvedUpcoming.artFull}
                        alt={`${pickText(resolvedUpcoming.title, showTranslation)} album art`}
                        draggable={false}
                        onClick={(event) => event.stopPropagation()}
                    />
                </div>
            )}
        </>
    )
}
