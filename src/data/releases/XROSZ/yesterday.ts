import type { Release } from "../../../types/Release.ts"
import { parseTrackList } from "../../../utils/parseTrackList.ts"

const titlesSource = `
Yesterday
Recompence
Enough
Perfect
`

const yesterday: Release = {
    private: true,
    slug: "yesterday",
    title: "Yesterday",
    artist: "XROSZ",
    artistSlug: "xrosz",
    type: "single",
    releaseDate: 260529,
    tracklist: parseTrackList(titlesSource),
    credits: `
    XROSZ is:
    Vocals: Zen @_z_e_n
    Guitars: Gio @xrz_gio
    Guitars: Rain @rsm_rain
    Bass: Grex @ezraazrael
    Drums: Isai @rambeltran
    
    mix: Miles Tag @dirunewssss
    master: Kyle Cramer @kairuofficial
    
    Videography by:
    Joshua Sweet @sweetnuglyproductions
    Mike Feez @mikefeeztv
    
    Yesterday directed by: Bryan @otheringothering
    
    Logo Design: @jrocknroll_
    `,
    theme: {
        Hue: 38,              // sodium/amber, not red-orange
        strength: "92%",      // strong but not clipping everything
        falloffHue: 28,       // dirtier, more brown in shadows
        falloffStrength: "65%",
        toWhite: "0%",       // critical: emulate blown filament center
        titlesHue: 30         // keep in-family but slightly distinct
    }
}

export default yesterday