import type { Composition } from "./Credit.ts"

export type TranslatableText =
    | string
    | {
    original: string
    english?: string
}

export type LyricBlock =
    | {
    type: "lyrics"
    text: TranslatableText
}
    | {
    type: "scripture"
    text: TranslatableText
}
    | {
    type: "feature"
    artist?: string
    text: TranslatableText
}

export type Lyric = {
    slug: string

    head: {
        title: TranslatableText
        PV: string | null
        composition: Composition
    }

    body:
        | {
        lyrics: TranslatableText
        footnotes?: TranslatableText
        credits?: TranslatableText
    }
        | {
        blocks: LyricBlock[]
        footnotes?: TranslatableText
        credits?: TranslatableText
    }
}