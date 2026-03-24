import type { Release } from "../../../types/Release.ts"
import { parseTrackList } from "../../../utils/parseTrackList.ts"

const titlesSource = `
Sinai
La Entrega
Sowing Salt
Strange Lands
Homecoming
Lucid
Свете Тихий \\Svete Tikhiy
Hush
Altars
Ceobhrán
Endless Shimmering Glissandi
Agua Viva
Inheritance
Gracia
The Body and Blood
Κύριε Ελέησον \\Kyrie Eleison
Sangria
/•**==~^,(*✞*),^~==**•\\\\ \\Revelations
`

const kyrieEleison: Release = {
    slug: "kyrie-eleison",
    title: "KYRIE ELEISON",
    artistSlug: "posadas",
    type: "album",
    releaseDate: 231031,
    tracklist: parseTrackList(titlesSource),

    theme: {
        Hue: 0,
        strength: "50%",
        falloffHue: 48,
        falloffStrength: "50%",
        toWhite: "0%",
        titlesHue: 48,
    }
}

export default kyrieEleison