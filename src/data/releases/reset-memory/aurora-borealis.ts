import type {Release} from "../../../types/Release.ts";
import {parseTrackList} from "../../../utils/parseTrackList.ts";

const titlesSource = `
aurora borealis
interim lover
`

const auroraBorealis: Release = {
    slug: "aurora-borealis",
    title: {
        original: "aurora borealis",
        english: "northern lights"
    },
    artist: "reset memory",
    artistSlug: "reset-memory",
    type: "single",
    releaseDate: 220214,
    tracklist: parseTrackList(titlesSource),
    credits: `
    reset memory is:
    vocals: rain @rsm_rain
    guitars: june @forte174
    keys by Ria @the.rianess
    
    pbotos and video by Jose Martinez    
    `,
    theme: {
        Hue: 210,
        strength: "48%",
        falloffHue: 300,
        falloffStrength: "52%",
        toWhite: "18%",
        titlesHue: 35,
    }
}

export default auroraBorealis