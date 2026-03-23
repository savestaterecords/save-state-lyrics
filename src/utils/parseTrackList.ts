export type TrackListingEntry = {
    title: string
    slug: string
}

function splitOnFirstUnescapedBackslash(line: string): [string, string | undefined] {
    let title = ""
    let i = 0

    while (i < line.length) {
        const char = line[i]
        const next = line[i + 1]

        if (char === "\\" && next === "\\") {
            title += "\\"
            i += 2
            continue
        }

        if (char === "\\") {
            const rawTitle = title.trimEnd()
            const rawSlugSeed = line.slice(i + 1).trim()
            return [rawTitle, rawSlugSeed || undefined]
        }

        title += char
        i += 1
    }

    return [title.trim(), undefined]
}

function normalizeSlugSeed(seed: string): string {
    return seed
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "")
        .replace(/-+/g, "-")
        .replace(/^-+|-+$/g, "")
}

export function parseTrackList(titlesSource: string): TrackListingEntry[] {
    const lines = titlesSource
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => line.length > 0)

    const ordinalWidth = lines.length >= 100 ? 3 : 2

    return lines.map((line, index) => {
        const [title, manualSlugSeed] = splitOnFirstUnescapedBackslash(line)

        const normalizedCore = normalizeSlugSeed(manualSlugSeed ?? title)
        const slugCore = normalizedCore || "unknown-title"

        const ordinal = String(index + 1).padStart(ordinalWidth, "0")

        return {
            title,
            slug: `${ordinal}-${slugCore}`,
        }
    })
}