import type {Release} from "../../../types/Release.ts";
import {parseTrackList} from "../../../utils/parseTrackList.ts";

const titlesSource = `
    Judgement
    Reason
    An Abstraction
    The Descent
`

const judgement: Release = {
    private: true,
    slug: "judgement",
    title: "Judgement",
    artist: "XROSZ",
    artistSlug: "xrosz",
    type: "single",
    releaseDate: 261031,
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
    ___
    
    Yesterday directed by: ___
    
    Logo Design: @jrocknroll_
    `
}

export default judgement