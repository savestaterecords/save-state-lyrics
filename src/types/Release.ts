export type ReleaseType =
    | "album"
    | "mini-album"
    | "ep"
    | "single"
    | "track"
    | "other"

export type Release = {
    slug: string
    title: string
    artistSlug: string
    type: ReleaseType
    releaseDate: number
}
