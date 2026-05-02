import type { Lyric } from "../../../../types/Lyric.ts"

const perfect: Lyric = {
    slug: "perfect",

    head: {
        title: "Perfect",
        PV: "",
        composition: {
            music: "Matt",
            lyrics: ["Matt", "Grex"]
        }
    },

    body: {
        blocks: [
            {
                type: "lyrics",
                text: `
                    your perfect taste meant happiness, if i'm being honest
                    calmly erase my memory, cuz i don't even want it'
                    make my toxic dreams come true, make me feel guiltless
                    start life over as someone new, it sounds so perfect
                    
                    i think i lost control again
                    flooding my mind with raw emotion again
                    feeding the demons as they crawl to gain control as i fall
                    to lose myself in it all - it sounds so perfect
                    
                    could it be the end? i don't know how much more i can take of this
                    it's hard to even exist without - it's hard to even imagine a world without it
                    there's so much i want to do in this world instead of this habit
                    but i can't seem to shake it
                    
                    i want to feel alive again
                `
            },
            {
                type: "feature",
                text: `
                    grex
                    grex
                    grex
                    grex
                    
                    grex
                    grex
                    grex
                    grex
                `
            }
        ]
    }
}

export default perfect