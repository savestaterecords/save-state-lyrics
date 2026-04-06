export type ReleaseType =
    | "album"
    | "mini-album"
    | "ep"
    | "single"
    | "track"
    | "demo"
    | "other"

export type Release = {
    slug: string
    title: string
    artist: string
    artistSlug: string
    type: ReleaseType
    releaseDate: number
    tracklist: { title: string; slug: string }[]
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