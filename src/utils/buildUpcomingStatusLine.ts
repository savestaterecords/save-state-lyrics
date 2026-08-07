import type { ResolvedUpcoming } from "./resolveUpcoming.ts"
import { getArtistBySlug } from "../data/registry.ts"
import { pickText } from "./pickText.tsx"
import { formatReleaseDate } from "./formatReleaseDate.ts"

export function buildUpcomingStatusLine(
    upcoming: ResolvedUpcoming,
    showTranslation: boolean,
): string {
    const artist = getArtistBySlug(upcoming.artistSlug)
    const artistLabel = artist
        ? pickText(artist.name, showTranslation)
        : upcoming.artistSlug

    const titleLabel = pickText(upcoming.title, showTranslation)

    const segments = [titleLabel]
    if (upcoming.releaseDate) segments.push(formatReleaseDate(upcoming.releaseDate))
    if (upcoming.note) segments.push(upcoming.note)

    return `${artistLabel} ~ ${segments.join(" - ")}`
}
