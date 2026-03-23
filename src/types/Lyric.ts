export type Lyric = {
    slug: string

    head: {
        title: "Sinai",
        composer: ["Dan", "Rain"],
        lyricist: ["Dan"],
        PV: string | null
    }

    body: {
        lyrics: string
        footnotes?: string
        credits?: string
    }
}