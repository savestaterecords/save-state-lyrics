import type {Release} from "../../../types/Release.ts";
import {parseTrackList} from "../../../utils/parseTrackList.ts";

const titlesSource = `
if all else fails
マリナ \\marina
空蝉 \\utsusemi
`

const ifAllElseFails: Release = {
    slug: "if-all-else-fails",
    title: "if all else fails",
    artist: "reset memory",
    artistSlug: "reset-memory",
    type: "single",
    releaseDate: 220712,
    tracklist: parseTrackList(titlesSource),
    credits: `
    reset memory is:
    vocals: rain @rsm_rain
    guitars: june @forte174
    
    photos and video by Jose Martinez    
    `,
    theme: {
        Hue: 215,
        strength: "22%",
        falloffHue: 235,
        falloffStrength: "18%",
        toWhite: "6%",
        titlesHue: 210,
    }
}

export default ifAllElseFails