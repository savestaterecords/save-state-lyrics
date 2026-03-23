import type { Artist } from "../types/Artist.ts"
import "../style/ArtistBanner.css"

const artistImages = import.meta.glob("../img/artist/*.{jpg,jpeg,webp,png,avif}", {
    eager: true,
    import: "default",
}) as Record<string, string>

type ArtistBannerProps = {
    artist: Artist
}

function getArtistImage(slug: string): string | undefined {
    const candidates = [
        `../img/artist/${slug}.jpg`,
        `../img/artist/${slug}.jpeg`,
        `../img/artist/${slug}.webp`,
        `../img/artist/${slug}.png`,
        `../img/artist/${slug}.avif`,
    ]

    for (const candidate of candidates) {
        if (candidate in artistImages) return artistImages[candidate]
    }

    return undefined
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