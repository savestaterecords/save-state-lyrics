import { Link } from "react-router-dom"
import { artists } from "../../data/registry.ts"
import { useTranslation } from "../../context/TranslationContext.tsx"
import { pickText } from "../../utils/pickText.tsx"
import { getArtistImage } from "../../utils/resolveArtistImage.ts"
import xroszLogo from "../../img/logo/fixed/xrosz.png"
import resetMemoryLogo from "../../img/logo/fixed/resetmemory.png"
import lllllLogo from "../../img/logo/fixed/lllll.png"
import posadasLogo from "../../img/logo/fixed/posadas.png"

const artistLogos: Record<string, string> = {
    "xrosz": xroszLogo,
    "reset-memory": resetMemoryLogo,
    "lllll": lllllLogo,
    "posadas": posadasLogo,
}

export default function ArtistGrid() {
    const { showTranslation } = useTranslation()

    return (
        <section className="home-demo-artists">
            <div className="home-demo-artist-grid">
                {artists.map((artist) => {
                    const image = getArtistImage(artist.slug)
                    const logo = artistLogos[artist.slug]

                    return (
                        <Link
                            key={artist.slug}
                            to={`/${artist.slug}/`}
                            className="home-demo-artist-tile"
                        >
                            {image && (
                                <img
                                    src={image}
                                    alt={pickText(artist.name, showTranslation)}
                                    className="home-demo-artist-tile-img"
                                    draggable={false}
                                />
                            )}
                            <span className="home-demo-artist-tile-fade" aria-hidden="true" />
                            {logo && (
                                <span
                                    className={`home-demo-artist-tile-logo home-demo-artist-tile-logo--${artist.slug}`}
                                    style={{ maskImage: `url(${logo})`, WebkitMaskImage: `url(${logo})` }}
                                    aria-hidden="true"
                                />
                            )}
                        </Link>
                    )
                })}
            </div>
        </section>
    )
}
