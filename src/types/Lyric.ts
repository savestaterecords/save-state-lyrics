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
    artist: string
    text: TranslatableText
}

export type Lyric = {
    slug: string

    head: {
        title: TranslatableText
        composer: string[]
        lyricist: string[]
        PV: string | null
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