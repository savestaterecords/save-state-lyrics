import type { Lyric } from "../../../../types/Lyric.ts"

const recompence: Lyric = {
    slug: "recompence",

    head: {
        title: "Recompence",
        PV: "",
        composition: {
            music: "Gio",
            lyrics: "Zen"
        }
    },

    body: {
        blocks: [
            {
                type: "feature",
                text: `
                    so you want a reason?
                    I gave you every chance and still you ran
                    nevermore - you took it on yourself
                    your name is gone - I won't call you mine
                    
                    now depart from me
                    you've sealed your fate
                    you gave me nothing
                    so I'll give you less
                    
                    say it one more time
                    say you're sorry
                    say it one more time
                `
            },
            {
                type: "lyrics",
                text: `
                    was it not my say?
                    victims of sorrow die alone
                    thousands every day
                    are we all wrong?
                    I took this life with my own hands
                    hurt no one else
                    so why?
                `
            },
            {
                type: "feature",
                text: `
                    cry all you want, you know my reason
                    I brought you into life you threw away
                    nevermore - you did this to yourself
                    your name is gone - you tore it out
                `
            },
            {
                type: "lyrics",
                text: `
                    anywhere I go I can't ask forgiveness
                    one and a million will follow below
                `
            },
            {
                type: "feature",
                text: `
                    your ungrateful soul will suffer
                    burning in hell forever
                    I tried so hard to make it right
                    you threw away - I cut our ties
                `
            },
            {
                type: "lyrics",
                text: `
                    was that my fate?
                    too much outside my control
                    except to leave on my own terms
                    
                    what better life could I have known?
                    if I was free from you
                    I'll never know
                `
            },
        ],
    },
}

export default recompence