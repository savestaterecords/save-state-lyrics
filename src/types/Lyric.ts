export type Lyric = {
    slug: string

    head: {
        title: string
        composer: string[]
        lyricist: string[]
        PV: string | null
    }

    body: {
        lyrics: string
        footnotes?: string
        credits?: string
    }
}