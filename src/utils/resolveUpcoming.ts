import type { Upcoming, UpcomingResource } from "../types/Upcoming.ts"
import type { TranslatableText } from "../types/Lyric.ts"
import { getReleaseBySlug } from "./resolveRelease.ts"
import { getReleaseOrdinal, ordinalLabel } from "./getReleaseOrdinal.ts"
import { getReleaseImages } from "./resolveReleaseImages.ts"
import { getLyricBySlug } from "./resolveLyricsBySlug.ts"
import { getMiscTracksByArtist } from "./resolveMiscTracksByArtist.ts"

export type ResolvedTrack = {
    number: number
    title: TranslatableText
}

export type ResolvedUpcoming = {
    artistSlug: string
    title: TranslatableText
    releaseDate?: number
    note?: string
    resources: UpcomingResource[]
    art?: string
    artFull?: string
    accentHue?: number
    tracklist?: ResolvedTrack[]
}

export function resolveUpcoming(upcoming: Upcoming): ResolvedUpcoming {
    if (upcoming.miscTrackSlug !== undefined) {
        const lyric = getLyricBySlug(upcoming.miscTrackSlug)
        const track = getMiscTracksByArtist(upcoming.artistSlug)
            .find((entry) => entry.slug === upcoming.miscTrackSlug)

        if (!lyric || !track) {
            return {
                artistSlug: upcoming.artistSlug,
                title: upcoming.miscTrackSlug,
                resources: [],
            }
        }

        const { thumb, full } = getReleaseImages(upcoming.artistSlug, upcoming.miscTrackSlug)

        return {
            artistSlug: upcoming.artistSlug,
            title: lyric.head.title,
            releaseDate: lyric.head.releaseDate,
            note: "single",
            resources: [
                { label: "lyrics", href: `/${upcoming.artistSlug}/misc/${upcoming.miscTrackSlug}/` },
            ],
            art: thumb,
            artFull: full,
            accentHue: lyric.head.theme?.Hue,
        }
    }

    if (upcoming.releaseSlug === undefined) {
        return {
            artistSlug: upcoming.artistSlug,
            title: upcoming.title,
            releaseDate: upcoming.releaseDate,
            note: upcoming.note,
            resources: upcoming.resources,
        }
    }

    const release = getReleaseBySlug(upcoming.artistSlug, upcoming.releaseSlug)

    if (!release) {
        return {
            artistSlug: upcoming.artistSlug,
            title: upcoming.releaseSlug,
            resources: [],
        }
    }

    const trackCount = release.tracklist.length
    const ordinal = ordinalLabel(getReleaseOrdinal(release))
    const note = `${ordinal} ${release.type}, ${trackCount} track${trackCount === 1 ? "" : "s"}`

    const resources: UpcomingResource[] = [
        { label: "tracklist", href: "" },
        { label: "lyrics", href: `/${release.artistSlug}/${release.slug}/` },
    ]

    const tracklist: ResolvedTrack[] = release.tracklist.map((track, index) => ({
        number: index + 1,
        title: track.title,
    }))

    const { thumb, full } = getReleaseImages(release.artistSlug, release.slug)

    return {
        artistSlug: release.artistSlug,
        title: release.title,
        releaseDate: release.releaseDate,
        note,
        resources,
        art: thumb,
        artFull: full,
        accentHue: release.theme?.Hue,
        tracklist,
    }
}
