import type {Release} from "../../../types/Release.ts";
import {parseTrackList} from "../../../utils/parseTrackList.ts";

const titlesSource = `
yurameku,
drag,
流星 //ryuusei
`

const yurameku: Release = {
    slug: "yurameku",
    title: {
        original: "yurameku.",
        english: "wavering."
    },
    artist: "reset memory",
    artistSlug: "reset-memory",
    type: "single",
    releaseDate: 241218,
    tracklist: parseTrackList(titlesSource),
    credits: `
    reset memory is:
    vocals: rain @rsm_rain
    guitars: june @forte174
    bass: maivy @kimi.kosakurai
    drums: isai @rambeltran
    
    mix & master: miles tag @dirunewssss
    
    videography by:
    erick Chavez @director_chavez
    red @n3ptun3s_st4r
    taylor
    
    photography: ophelia @d.e.a.t.h.b.r.i.d.e
    
    cover painting: alex volk @lost.coloura
    `,
    theme: {
        Hue: 165,
        strength: "58%",
        falloffHue: 210,
        falloffStrength: "100%",
        toWhite: "4%",
        titlesHue: 190,
    }
}

export default yurameku