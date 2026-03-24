export type LyricBlock =
    | {
    type: "lyrics"
    text: string
}
    | {
    type: "scripture"
    text: string
}
    | {
    type: "feature"
    artist: string
    text: string
}

export type Lyric = {
    slug: string

    head: {
        title: string
        composer: string[]
        lyricist: string[]
        PV: string | null
    }

    body:
        | {
        lyrics: string
        footnotes?: string
        credits?: string
    }
        | {
        blocks: LyricBlock[]
        footnotes?: string
        credits?: string
    }
}