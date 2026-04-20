import type { Lyric, TranslatableText } from "../types/Lyric.ts"

type MiscTrackEntry = {
    title: TranslatableText
    slug: string
    ordinal: number
}

const miscLyricModules = import.meta.glob("../data/lyrics/*/x00-misc/*.ts", {
    eager: true,
}) as Record<string, { default: Lyric }>

function extractOrdinal(path: string): number {
    const match = path.match(/\/(\d+)-[^/]+\.ts$/)
    return match ? Number(match[1]) : 0
}

function extractMiscSlug(path: string): string {
    const match = path.match(/\/\d+-(.+)\.ts$/)
    return match ? match[1] : ""
}

export function getMiscTracksByArtist(artistSlug: string): MiscTrackEntry[] {
    return Object.entries(miscLyricModules)
        .filter(([path]) =>
            path.includes(`/data/lyrics/${artistSlug}/x00-misc/`)
        )
        .map(([path, module]) => ({
            title: module.default.head.title,
            slug: extractMiscSlug(path),
            ordinal: extractOrdinal(path),
        }))
        .sort((a, b) => b.ordinal - a.ordinal)
}