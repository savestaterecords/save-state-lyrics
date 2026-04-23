import type {TranslatableText} from "./Lyric.ts";

export type ReleaseType =
    | "album"
    | "mini-album"
    | "ep"
    | "single"
    | "demo"
    | "other"

export type Release = {
    slug: string
    title: TranslatableText
    artist: TranslatableText
    artistSlug: string
    type: ReleaseType
    releaseDate: number
    tracklist: { title: TranslatableText; slug: string }[]
    theme?: ReleaseTheme
    credits?: string
}

export type ReleaseTheme = {
    Hue: number
    strength?: string
    falloffHue?: number
    falloffStrength?: string
    toWhite?: string
    titlesHue: number
} | null