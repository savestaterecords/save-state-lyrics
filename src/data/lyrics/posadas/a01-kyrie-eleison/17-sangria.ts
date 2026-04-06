import type { Lyric } from "../../../../types/Lyric.ts"

const Sangria: Lyric = {
    slug: "sangria",

    head: {
        title: "Sangria",
        PV: "outu.be/sETMS7b7SI8",
        composition: {
            lyrics: "Dan",
            music: ["Dan", "IMAX"],
            production: "Rain",
        }
    },

    body: {
        blocks: [
            {
                type: "lyrics",
                text: `
                red skies coloring the ocean
                last night we split our bodies open
                in love
                
                there’s nothing out here but sands of our devotion
                the sacrifice of the giving tree
                in time, we’ll both absolve emotions
                with blood
                `
            },
            {
                type: "feature",
                artist: "Lividéa",
                text: `
                place your hands in mine
                dripping fingertips
                echoes of a life
                seal them with your lips
                limbs we hold up high
                bodies in the mist
                left ourselves to die
                with nothing but a kiss
                `
            },
            {
                type: "lyrics",
                text: `
                red skies coloring the ocean
                last night dancing with emotion
                undone
                
                hell’s gates have opened and still the land is frozen
                from the cold dead stare that you gave to me
                this time, the creeping sense of anguish
                is love
                `
            }
        ],
        credits: `     
        samples & 808s by IMAX @imaxbeats
        chorus vocals by Lividéa
        photography by Gabriela @g3mstone

        `,
    },
}

export default Sangria