import type { Release } from "../../../types/Release.ts"
import { parseTrackList } from "../../../utils/parseTrackList.ts"

const titlesSource = `
-睡眠- \\suimin
Elegy
Datura
Silent Screams
Damage
Rot Away
`

const elegy: Release = {
    slug: "elegy",
    title: "Elegy",
    artist: "XROSZ",
    artistSlug: "xrosz",
    type: "demo",
    releaseDate: 250414,
    tracklist: parseTrackList(titlesSource),
    credits: `
    XROSZ is:
    Vocals: Zen @_z_e_n
    Guitars: Gio @xrz_gio
    Guitars: Rain @rsm_rain
    Bass: Grex @ezraazrael
    Drums: Jett
    
    mix: Miles Tag @dirunewssss
    master: Kyle Cramer @kairuofficial
    
    Photography: Pandor
    Videography by:
    Maivy Huynh @kimi.kosakurai
    Ramona @yourstrulyramona
    Meraki @merakiphotos1
    Jaylan Torrence @jays._photography1
    Ian Richter @i_richter
    
    Logo Design: @jrocknroll_
    `,
    theme: {
        Hue: 0,
        strength: "100%",
        falloffHue: 0,
        falloffStrength: "0%",
        toWhite: "0%",
        titlesHue: 350
    }
}

export default elegy