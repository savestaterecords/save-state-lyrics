import type { Release } from "../../../types/Release.ts"
import { parseTrackList } from "../../../utils/parseTrackList.ts"

const titlesSource = `
dream eater
mare australe
揺らめいていても⋯ \\yurameiteitemo
into the ground
life everlasting
心中歌 \\shinjuuka
نسمة  \\nasamah
अभिनिवेश \\abhinivesha
samara
春夏秋冬 \\shunkashuuto
窓ノ外、雨。\\mado-no-soto-ame
chiaroscuro
`

const yume: Release = {
    private: true,
    slug: "yume",
    title: "夢",
    artist: "reset memory",
    artistSlug: "reset-memory",
    type: "album",
    releaseDate: 279999,
    tracklist: parseTrackList(titlesSource),
    credits: `
    this album does not exist yet.
    `,

    theme: {
        Hue: 258,
        strength: "82%",
        falloffHue: 92,
        falloffStrength: "64%",
        toWhite: "3%",
        titlesHue: 270,
    }
}

export default yume