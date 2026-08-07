import { useEffect, useRef, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { artists } from "../data/registry.ts"
import "../style/Navbar.css"
import {useTranslation} from "../context/TranslationContext.tsx";
import {pickText} from "../utils/pickText.tsx";
import ssrLettersLogo from "../img/logo/adaptive/ssr_letters.png"
import ssrLyricsLogo from "../img/logo/adaptive/ssr_lyricsB.png"

export default function Navbar() {
    const location = useLocation()
    const pathParts = location.pathname.split("/").filter(Boolean)
    const currentArtistSlug = pathParts[0] ?? null
    const { showTranslation } = useTranslation()

    // Simple click-outside/Escape-to-close dropdown — no history/modal
    // wiring needed here since it's a lightweight menu, not a full-screen
    // overlay (compare UpcomingModule's art modal, which does need that).
    // Structured to match .home-demo-tracklist-drawer as closely as
    // possible (plain in-DOM child, not portaled) — that drawer's glass
    // effect is the one that's actually confirmed working.
    const [artistsOpen, setArtistsOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement | null>(null)

    // Closes the dropdown on route change (i.e. after picking an artist).
    // Reset happens during render (React's recommended pattern for "adjust
    // state when a value changes") rather than in an effect — calling
    // setState synchronously inside an effect body triggers an avoidable
    // extra render pass; this way it's just one.
    const [prevPathname, setPrevPathname] = useState(location.pathname)
    if (location.pathname !== prevPathname) {
        setPrevPathname(location.pathname)
        setArtistsOpen(false)
    }

    useEffect(() => {
        if (!artistsOpen) return

        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setArtistsOpen(false)
            }
        }
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") setArtistsOpen(false)
        }

        document.addEventListener("mousedown", handleClickOutside)
        document.addEventListener("keydown", handleKeyDown)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
            document.removeEventListener("keydown", handleKeyDown)
        }
    }, [artistsOpen])

    return (
        <header className="site-navbar">
            <div className="site-column navbar-inner">
                <Link
                    to="/"
                    className="navbar-mark"
                    aria-label="save state records — home"
                >
                    <span
                        className="navbar-mark-logo navbar-mark-logo-letters"
                        style={{ maskImage: `url(${ssrLettersLogo})`, WebkitMaskImage: `url(${ssrLettersLogo})` }}
                        aria-hidden="true"
                    />
                    <span
                        className="navbar-mark-logo navbar-mark-logo-lyrics"
                        style={{ maskImage: `url(${ssrLyricsLogo})`, WebkitMaskImage: `url(${ssrLyricsLogo})` }}
                        aria-hidden="true"
                    />
                </Link>

                <div className="navbar-artists" ref={dropdownRef}>
                    <button
                        type="button"
                        className={`navbar-artists-trigger${artistsOpen ? " is-open" : ""}`}
                        aria-haspopup="true"
                        aria-expanded={artistsOpen}
                        onClick={() => setArtistsOpen((open) => !open)}
                    >
                        Artists
                        <span className="navbar-artists-caret" aria-hidden="true" />
                    </button>

                    <div
                        className={`navbar-artists-menu${artistsOpen ? " is-open" : ""}`}
                    >
                        <div className="navbar-artists-menu-clip">
                            <div className="navbar-artists-menu-inner">
                                {artists.map((artist) => {
                                    const isCurrent = artist.slug === currentArtistSlug

                                    return (
                                        <Link
                                            key={artist.slug}
                                            to={`/${artist.slug}/`}
                                            className={`navbar-artists-menu-item${isCurrent ? " is-current" : ""}`}
                                            aria-current={isCurrent ? "page" : undefined}
                                        >
                                            {pickText(artist.name, showTranslation)}
                                        </Link>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>

                <form
                    className="navbar-search"
                    onSubmit={(event) => {
                        event.preventDefault()
                        window.alert("search doesn't work yet. tell rain to work harder.")
                    }}
                >
                    <input
                        type="search"
                        className="navbar-search-input"
                        placeholder="Search"
                        aria-label="Search"
                    />
                    <span className="navbar-search-icon" aria-hidden="true" />
                </form>
            </div>
        </header>
    )
}
