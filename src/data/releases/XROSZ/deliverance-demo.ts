import type { Release } from "../../../types/Release.ts"
import { parseTrackList } from "../../../utils/parseTrackList.ts"

const titlesSource = `
Deliverance
Enough
Perfect
Old Habits
An Abstraction
Downfall
Resonance
Always
The Descent
Death Comes
Sonder
`

const deliveranceDemo: Release = {
    slug: "deliverance-demo",
    title: "Deliverance",
    artist: "XROSZ",
    artistSlug: "xrosz",
    type: "demo",
    releaseDate: 210420,
    tracklist: parseTrackList(titlesSource),
    credits: `
    XROSZ is:
    Vocals: Matt Johnson
    Guitars: Gio @xrz_gio
    Guitars: Rain @rsm_rain
    
    Track 4 addl. vocals by Victoria Elizabeth
    
    Photography & Videography by:
    Tiffany Nguyễn
    Luzan Tuladhar
    Kamy Ingram
    
    Album Art: Tiago Martins
    `,
    theme: {
        Hue: 190,
        strength: "68%",
        falloffHue: 295,
        falloffStrength: "55%",
        toWhite: "0%",
        titlesHue: 280,
    }
}

export default deliveranceDemo