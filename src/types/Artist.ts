import type { Release } from "./Release"
import type {TranslatableText} from "./Lyric.ts";

export type ArtistTheme = {
    bannerStart?: string
    bannerEnd?: string
}

export type Artist = {
    slug: string
    name: TranslatableText
    releases: Release[]
    theme?: ArtistTheme
}