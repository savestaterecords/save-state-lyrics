import type { Lyric } from "../types/Lyric.ts"

const lyricModules = import.meta.glob("../data/lyrics/**/*.ts", {
    eager: true,
}) as Record<string, { default: Lyric }>

export function getLyricBySlug(slug: string): Lyric | undefined {
    const match = Object.entries(lyricModules).find(([path]) =>
        path.endsWith(`/${slug}.ts`)
    )

    return match?.[1].default
}