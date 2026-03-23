import type { Release } from "./Release"

export type ArtistTheme = {
    bannerStart?: string
    bannerEnd?: string
}

export type Artist = {
    slug: string
    name: string
    releases: Release[]
    theme?: ArtistTheme
}