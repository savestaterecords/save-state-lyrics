import {parseTrackList} from "../../../utils/parseTrackList.ts";
import type {Release} from "../../../types/Release.ts";

const titlesSource = `
恋愛歌 \\rennaika
雨時計 \\ame-tokei
真夏夜想曲 \\mahiru-yasoukyoku
あの夏憂鬱 \\ano-natsu-yuuutsu
`

const ameTokei: Release = {
    slug: "ame-tokei",
    title: "雨時計",
    artist: "reset memory",
    artistSlug: "reset-memory",
    type: "single",
    releaseDate: 210831,
    tracklist: parseTrackList(titlesSource),
    credits: `
    reset memory is:
    vocals: dan
    guitars: rain @rsm_rain
    guitars: june @forte174
    
    videography by:
    Bobby Kurtz @tangenttemporal
    Jose Martinez
    
    photography by:
    Vivien @idyll.vial
    Kris @cactuskillerr
    
    hairstyle: Bobby Cantu @yuugen____
    makeup: Priscilla @cifix_n_cilla
    `,
    theme: {
        Hue: 185,
        strength: "50%",
        falloffHue: 105,
        falloffStrength: "45%",
        toWhite: "0%",
        titlesHue: 0,
    }
}

export default ameTokei