import type { Lyric } from "../../../../types/Lyric.ts"

const lucid: Lyric = {
    slug: "lucid",

    head: {
        title: "Lucid",
        PV: "youtu.be/C5b7KxdkHU0",
        composition: {
            lyrics: ["Dan", "Coraline", "Rain"],
            music: "Dan",
            production: "Dan"
        }
    },

    body: {
        blocks: [
            {
                type: "lyrics",
                text: `
                I’m haunted by the man that I used to be
                I laid him in the tomb with some Louis V
                he answered all my prayers on the rosary
                he made me feel so little looking over me
                `
            },
            {
                type: "feature",
                artist: "Coraline",
                text: `
                I was stillborn looking up
                my neck and spine in spirals
                the moon just so out of touch
                that’s why I want to reach for the stars so much
                
                feel like I was born in a different galaxy
                that’s why they call me starseed
                cuz I wanna fuck this whole world up
                third eye opening up
                
                burning out like my last cigarette
                this world’s just too much for me
                I don’t wanna lose my touch
                my other five senses feeling all my regrets  
                `
            },
            {
                type: "lyrics",
                text: `
                when i die bury my in my Versace
                let me see Donatella when she comes for me
                i hold my necklace like a rosary
                asking if this is who I’m supposed to be
                `

            }
        ],
        credits: `
        directed and filmed by Taylor Bagley
        as the woman in the blue dress, Maivy @kimi.kosakurai
        as the man with the mask, Day$tar @lorddaystarshandala
        `,
    },
}

export default lucid