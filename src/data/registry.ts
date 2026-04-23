import type {Artist} from "../types/Artist.ts";
import type { TranslatableText } from "../types/Lyric.ts";

export type ArtistRegistryEntry = {
    slug: string
    name: TranslatableText
}

export const artists: ArtistRegistryEntry[] = [
    { slug: "lllll", name: "[_lllll_]" },
    { slug: "posadas", name: {original: "Posadas", english: "Inns" }},
    { slug: "reset-memory", name: "reset memory" },
    { slug: "xrosz", name: "XROSZ" },
]

const artistModules = import.meta.glob("./artists/*.ts", { eager: true })

export function getArtistBySlug(slug: string): Artist | undefined {
    const path = `./artists/${slug}.ts`
    const mod = artistModules[path] as { default: Artist } | undefined
    return mod?.default
}