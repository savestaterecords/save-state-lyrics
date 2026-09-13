import type { Lyric } from "../../../../types/Lyric.ts"

const reason: Lyric = {
    slug: "reason",

    head: {
        title: "Reason",
        PV: "",
        composition: {
            music: "Zen, Rain",
            lyrics: "Zen"
        }
    },

    body: {
        blocks: [
            {
                type: "lyrics",
                text: `
                    sometime I wonder if I'll ever be enough
                    sometimes my heart stops beating
                    could I be the only one?
                    cuz I'm the outside looking inwards
                    wondering what I've done
                    to turn away the one who loved me
                    exchanged you for a gun
                    
                    it's hard to know
                    that what I did had a reason
                    it's hard to know
                    exactly what it was
                `
            },
            {
                type: "feature",
                text: `
                    I need a reason to hold on
                    and it eats me alive
                `
            },
            {
                type: "lyrics",
                text: `
                    I left you my love in the sun
                    still my only one
                    every time I hear your voice
                    whisper in the dusk - I'm alone
                    I know I was not enough
                    as my heart stops
                    
                    it's hard to know
                    that what you did had a reason
                    it's hard to know
                    exactly what it was
                    
                    I want to take you down
                    I want to take you out
                `
            }
        ]
    },
}

export default reason