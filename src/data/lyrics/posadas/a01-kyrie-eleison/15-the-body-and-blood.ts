import type { Lyric } from "../../../../types/Lyric.ts"

const theBodyAndBlood: Lyric = {
    slug: "the-body-and-blood",

    head: {
        title: "The Body and Blood",
        PV: "youtu.be/17043i_Q0yc",
        composition: {
            lyrics: "Dan",
            music: "Dan",
            production: "Dan"
        }
    },

    body: {
        blocks: [
            {
                type: "lyrics",
                text: `
                this is my body
                I give it up for you
                
                baby son in babylon
                rejoice, rejoice
                for your god is dead and gone
                
                if you eat my flesh, our sins we'll mend
                and still you spit me out again
                blissful in your arms
                forgetting I knew heaven
                `,
            },
            {
                type: "scripture",
                text: `
                blessed shall he be who repays you
                with what you have done
                to us
                `,
            },
            {
                type: "lyrics",
                text: `
                I burned
                our garden by the sea
                my offering
                
                I burned
                scattered in the wind
                into your dreams again
                `,
            },
        ],

        credits: `
        photography & videography by Gio @xrz_gio
        as herself, Maivy @kimi.kosakurai
        prop support by Corrine
        `,
    },
}

export default theBodyAndBlood