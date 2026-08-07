const artistImages = import.meta.glob("../img/artist/*.{jpg,jpeg,webp,png,avif}", {
    eager: true,
    import: "default",
}) as Record<string, string>

export function getArtistImage(slug: string): string | undefined {
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
