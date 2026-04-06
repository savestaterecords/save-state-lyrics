import type {Release} from "../../../types/Release.ts";
import {parseTrackList} from "../../../utils/parseTrackList.ts";

const titlesSource = `
aurora borealis
interim lover
`

const auroraBorealis: Release = {
    slug: "aurora-borealis",
    title: "aurora borealis",
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
    `
}

export default auroraBorealis