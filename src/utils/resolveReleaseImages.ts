const releaseImages = import.meta.glob("../img/release/*/*.{jpg,jpeg,webp}", {
    eager: true,
    import: "default",
}) as Record<string, string>

export function getReleaseImages(
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
