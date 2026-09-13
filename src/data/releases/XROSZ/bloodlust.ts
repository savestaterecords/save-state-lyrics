import type {Release} from "../../../types/Release.ts";
import {parseTrackList} from "../../../utils/parseTrackList.ts";

const titlesSource = `
    Bloodlust
    Reason
    An Abstraction
    The Descent
`

const bloodlust: Release = {
    private: true,
    slug: "bloodlust",
    title: "Bloodlust",
    artist: "XROSZ",
    artistSlug: "xrosz",
    type: "single",
    releaseDate: 261031,
    tracklist: parseTrackList(titlesSource),
    theme: {
        Hue: 35,
        strength: "55%",
        falloffHue: 5,
        falloffStrength: "45%",
        toWhite: "0%",
        titlesHue: 8,
    },
    credits: `
    XROSZ is:
    Vocals: Zen @_z_e_n
    Guitars: Gio @xrz_gio
    Guitars: Rain @rsm_rain
    Bass: Grex @ezraazrael
    Drums: Isai @rambeltran
    
    mix: Miles Tag @dirunewssss
    master: Kyle Cramer @kairuofficial
    
    Direction, photos, & video: Nav @Navalabs
    Story and character feature: Elise
    Location: No Revival @No_reviva1
    Logo Design: @jrocknroll_
    `
}

export default bloodlust