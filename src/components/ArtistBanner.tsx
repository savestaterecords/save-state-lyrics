import type { Artist } from "../types/Artist.ts"
import "../style/ArtistBanner.css"
import { getArtistImage } from "../utils/resolveArtistImage.ts"

type ArtistBannerProps = {
    artist: Artist
}

export default function ArtistBanner({ artist }: ArtistBannerProps) {
    const imageSrc = getArtistImage(artist.slug)

    const bannerStyle = {
        ...(artist.theme?.bannerStart && { "--banner-start": artist.theme.bannerStart }),
        ...(artist.theme?.bannerEnd && { "--banner-end": artist.theme.bannerEnd }),
    } as React.CSSProperties

    return (
        <section className="artist-banner" style={bannerStyle} aria-hidden="true">
            {imageSrc ? (
                <>
                    <div
                        className="artist-banner-bg"
                        style={{ backgroundImage: `url(${imageSrc})` }}
                    />
                    <img
                        className="artist-banner-fg"
                        src={imageSrc}
                        alt=""
                        draggable={false}
                    />
                </>
            ) : (
                <div className="artist-banner-fallback" />
            )}

            <div className="artist-banner-bottom-fade" />
        </section>
    )
}