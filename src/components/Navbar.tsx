import { Link, useLocation } from "react-router-dom"
import { artists } from "../data/registry.ts"
import "../style/Navbar.css"
import {useTranslation} from "../context/TranslationContext.tsx";
import {pickText} from "../utils/pickText.tsx";

export default function Navbar() {
    const location = useLocation()
    const pathParts = location.pathname.split("/").filter(Boolean)
    const currentArtistSlug = pathParts[0] ?? null
    const { showTranslation } = useTranslation()

    return (
        <header className="site-navbar">
            <div className="site-column navbar-inner">
                <nav className="navbar-nav" aria-label="Artists">
                    {artists.map((artist, index) => {
                        const isCurrent = artist.slug === currentArtistSlug

                        return (
                            <span key={artist.slug} className="navbar-item-wrap">
                                <Link
                                    to={`/${artist.slug}/`}
                                    className={`navbar-item${isCurrent ? " is-current" : ""}`}
                                    aria-current={isCurrent ? "page" : undefined}
                                >
                                    {pickText(artist.name, showTranslation)}
                                </Link>

                                {index < artists.length - 1 && (
                                    <span className="navbar-separator" aria-hidden="true">
                                        ・
                                    </span>
                                )}
                            </span>
                        )
                    })}
                </nav>
            </div>
        </header>
    )
}