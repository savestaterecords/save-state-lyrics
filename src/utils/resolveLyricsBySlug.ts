import type { Lyric } from "../types/Lyric.ts"

const lyricModules = import.meta.glob("../data/lyrics/**/*.ts", {
    eager: true,
}) as Record<string, { default: Lyric }>

export function getLyricBySlug(slug: string): Lyric | undefined {
    const directMatch = Object.entries(lyricModules).find(([path]) =>
        path.endsWith(`/${slug}.ts`)
    )

    if (directMatch) {
        return directMatch[1].default
    }

    const miscMatch = Object.entries(lyricModules).find(([path]) =>
        /\/x00-misc\/\d+-[^/]+\.ts$/.test(path) &&
        path.match(/\/x00-misc\/\d+-(.+)\.ts$/)?.[1] === slug
    )

    return miscMatch?.[1].default
}