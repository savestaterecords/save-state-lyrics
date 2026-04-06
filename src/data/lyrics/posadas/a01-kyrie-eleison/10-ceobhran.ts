import type { Lyric } from "../../../../types/Lyric.ts"

const ceobhran: Lyric = {
    slug: "ceobhran",

    head: {
        title: {
            original: "Ceobhrán",
            english: "Little Mist",
        },
        PV: "youtu.be/4SuXcPpa7G4",
        composition: {
            lyrics: "Dan",
            music: "Dan",
            production: "Dan",
        }
    },

    body: {
        blocks: [
            {
                type: "lyrics",
                text: `
                plagues of locusts coming down, reckoning
                swarming, bringing misery, misery
                merciful Ophanim spinning round, beckoning
                all your splattered fluids drizzling, drizzling down
                
                Gᴏᴅ on high brought sky to ground, reckoning
                feel His love though misery, misery
                something’s in the fire spinning round, beckoning
                watch as all your fluids go drizzling, drizzling down
                `,
            },
            {
                type: "scripture",
                text: `
                and it came to pass, that when He had commanded the man clothed with linen, saying,
                ‘take fire from between the whirlwind, from between the cherubim’
                then he went in, and stood beside the Ophanim
                `,
            },
        ],

        credits: `
        `,
    },
}

export default ceobhran