import type { Release } from "../types/Release.ts"
import { getArtistBySlug } from "../data/registry.ts"

export function ordinalLabel(n: number): string {
    const remainder100 = n % 100
    if (remainder100 >= 11 && remainder100 <= 13) return `${n}th`

    switch (n % 10) {
        case 1: return `${n}st`
        case 2: return `${n}nd`
        case 3: return `${n}rd`
        default: return `${n}th`
    }
}

export function getReleaseOrdinal(release: Release): number {
    const artist = getArtistBySlug(release.artistSlug)
    if (!artist) return 1

    const sameType = artist.releases
        .filter((entry) => entry.type === release.type)
        .sort((a, b) => a.releaseDate - b.releaseDate)

    const index = sameType.findIndex((entry) => entry.slug === release.slug)
    return index === -1 ? 1 : index + 1
}
