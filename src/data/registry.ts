import type {Artist} from "../types/Artist.ts";

export type ArtistRegistryEntry = {
    slug: string
    name: string
}

export const artists: ArtistRegistryEntry[] = [
    { slug: "lllll", name: "lllll" },
    { slug: "posadas", name: "Posadas" },
    { slug: "reset-memory", name: "reset memory" },
    { slug: "xrosz", name: "XROSZ" },
]

const artistModules = import.meta.glob("./artists/*.ts", { eager: true })

export function getArtistBySlug(slug: string): Artist | undefined {
    const path = `./artists/${slug}.ts`
    const mod = artistModules[path] as { default: Artist } | undefined
    return mod?.default
}