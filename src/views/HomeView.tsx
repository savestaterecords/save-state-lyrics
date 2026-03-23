
import "../style/HomeView.css"
import {artists} from "../types/Artist.ts";

export default function HomeView() {
    return (
        <div className="site-column home-view">
            <nav aria-label="Artists">
                <ul className="artist-list">
                    {artists.map((artist) => (
                        <li key={artist.slug}>
                            <a href={`/${artist.slug}/`} className="artist-link">
                                {artist.name}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    )
}