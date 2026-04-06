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
    artist: "reset memory",
    artistSlug: "reset-memory",
    type: "album",
    releaseDate: 230707,
    tracklist: parseTrackList(titlesSource),
    credits: `
    reset memory is:
    vocals: rain @rsm_rain
    guitars: june @forte174
    
    additional guitars by Daun @daun.music
    spoken word by Eunbi Hina @eunbi.hina
    erhu by Jazreel Luar @jazluar
    keys by Ria @the.rianess
    blast beats by Kane @thebutcherkane
    
    videography by:
    Tiffany Nguyễn
    John Alvarez
    Jose Martinez
    
    photography by:
    Ashley Vũ @x_xsh
    Vivien @idyll.vial
    
    hairstyle: Bobby Cantu @yuugen____
    makeup: Dove @goddessdove.creation
    
    as herself: Maivy @kimi.kosakurai
    
    album art: Jasmine @little.lemon.house
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