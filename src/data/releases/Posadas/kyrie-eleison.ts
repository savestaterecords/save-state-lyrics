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
    title: {
        original: "KYRIE ELEISON",
        english: "LORD HAVE MERCY"
    },
    artist: "Posadas",
    artistSlug: "posadas",
    type: "album",
    releaseDate: 231031,
    tracklist: parseTrackList(titlesSource),
    credits: `
    Posadas has been Dan Quijote and Rain.
    
    featured artists:
    Day$tar @lorddaystarshandala
    Coraline @RIPCoraline
    Quakemaker @im.quakemaker
    Gabriela @g3mstone
    IMAX @imaxbeats
    Annabel McGill
    Lividéa
    
    photography & videography by:
    Maivy Huynh @kimi.kosakurai
    Vivien @idyll.vial
    Lorena Euler @mortuaeintus
    9thcircle @9nthcrcle
    Alejandro Navarro @navalabs_official
    Mario Lopez @antariiiio
    Gio @xrz_gio
    Digi @digimechanoid
    Tinygxd @tinygxd
    Taylor Bagley
    Alex Howley
    Corrine
    Isabella
    Katy
    
    character portrayal by:
    Tea @mai.melancholia
    Maya Hernandez @mayita.x
    
    makeup by:
    Rrin @ur.obsessive.wifey
    
    mastering of KYRIE ELEISON by Rain
    
    LORD, have mercy.
    `,

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