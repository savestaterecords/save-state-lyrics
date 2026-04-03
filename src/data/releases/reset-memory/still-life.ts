import type { Release } from "../../../types/Release.ts"
import { parseTrackList } from "../../../utils/parseTrackList.ts"

const titlesSource = `
rsm.ini \\rsm-ini
casi cielo
aurora borealis
in the rain
endgame
missing
tea lights
if all else fails
white rose
人間失格 \\ningen shikkaku
存在証明 \\sonzai shoumei
amaretto
a dream of waking
countless funerals for spring
`

const stillLife: Release = {
    slug: "still-life",
    title: "still life",
    artistSlug: "resetmemory",
    type: "album",
    releaseDate: 230707,
    tracklist: parseTrackList(titlesSource),
    credits: `
    ~
    `,

    theme: {
        Hue: 246,
        strength: "62%",
        falloffHue: 260,
        falloffStrength: "38%",
        toWhite: "0%",
        titlesHue: 256,
    }
}

export default stillLife