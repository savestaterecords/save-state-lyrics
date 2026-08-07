import type { TranslatableText } from "./Lyric.ts"

export type UpcomingResource = {
    label: string
    href: string
    disabled?: boolean
}

export type Upcoming =
    | {
        artistSlug: string
        releaseSlug: string
        title?: never
        releaseDate?: never
        note?: never
        resources?: never
    }

    | {
        artistSlug: string
        releaseSlug?: never
        title: TranslatableText
        releaseDate?: number
        note?: string
        resources: UpcomingResource[]
    }
