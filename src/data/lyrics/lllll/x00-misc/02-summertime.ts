import type { Lyric } from "../../../../types/Lyric.ts"

const summertime: Lyric = {
    slug: "summertime",

    head: {
        title: "Summertime",
        PV: "youtu.be/EWYqRYVjA1U",
        releaseDate: 260325,
        composition: {
            lyrics: "Rain",
            music: "Rain"
        },
        theme: {
            Hue: 43,
            strength: "70%",
            falloffHue: 25,
            falloffStrength: "45%",
            toWhite: "6%",
            titlesHue: 40,
        },
    },

    body: {
        lyrics: `
        thanks to you
        i always knew
        the motions
        of summertime
        
        true to you
        against all i knew
        i gave in
        i opened up my heart
        as if in a dream
        
        and yet again
        i’m winter burning
        through the freezing rain
        `,
        credits: `
        photos and video by Mou @moukiyoe
        `
    },
}

export default summertime