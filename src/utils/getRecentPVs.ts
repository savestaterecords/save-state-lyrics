import { artists, getArtistBySlug } from "../data/registry.ts"
import { getLyricByRelease, getLyricBySlug } from "./resolveLyricsBySlug.ts"
import { getMiscTracksByArtist } from "./resolveMiscTracksByArtist.ts"
import type { TranslatableText } from "../types/Lyric.ts"

export type RecentPV = {
    title: TranslatableText
    artistName: TranslatableText
    pv: string
    artistSlug: string
    releaseSlug: string
    trackSlug: string
}

type Rank = "A" | "B" | "D" | "E" | "F"
type DatedPV = RecentPV & { releaseDate: number; rank?: Rank }

function getDatedPVsByArtist(artistSlug: string): DatedPV[] {
    const artist = getArtistBySlug(artistSlug)
    if (!artist) return []

    const entries: DatedPV[] = []

    for (const release of artist.releases) {
        if (release.private === true) continue

        for (const track of release.tracklist) {
            const lyric = getLyricByRelease(artist.slug, release.slug, track.slug)
            if (!lyric || !lyric.head.PV || lyric.head.rank === "F") continue

            entries.push({
                title: lyric.head.title,
                artistName: artist.name,
                pv: lyric.head.PV,
                artistSlug: artist.slug,
                releaseSlug: release.slug,
                trackSlug: track.slug,
                releaseDate: lyric.head.releaseDate ?? release.releaseDate,
                rank: lyric.head.rank,
            })
        }
    }

    for (const miscTrack of getMiscTracksByArtist(artist.slug)) {
        const lyric = getLyricBySlug(miscTrack.slug)
        if (!lyric || !lyric.head.PV || !lyric.head.releaseDate) continue
        if (lyric.head.rank === "F") continue

        entries.push({
            title: lyric.head.title,
            artistName: artist.name,
            pv: lyric.head.PV,
            artistSlug: artist.slug,
            releaseSlug: "misc",
            trackSlug: miscTrack.slug,
            releaseDate: lyric.head.releaseDate,
            rank: lyric.head.rank,
        })
    }

    return entries
}

function hashToUnitInterval(input: string): number {
    let hash = 0
    for (let i = 0; i < input.length; i++) {
        hash = (hash << 5) - hash + input.charCodeAt(i)
        hash |= 0
    }
    return (hash >>> 0) / 0xffffffff
}

const RANK_WEIGHT_FLOOR = 0.05
const BLEND_AT_TWO = 10 / 19
const FULL_CURVE_AT_COUNT = 10

function easedRecency(rank: number, maxRank: number): number {
    if (maxRank === 0) return 1
    return 0.5 * (1 + Math.cos((Math.PI * rank) / maxRank)) // 1 -> 0
}

function normalTierWeight(rank: number, maxRank: number, catalogSize: number): number {
    const eased = easedRecency(rank, maxRank)
    const curveWeight = RANK_WEIGHT_FLOOR + (1 - RANK_WEIGHT_FLOOR) * eased

    const blend =
        catalogSize <= 2
            ? BLEND_AT_TWO
            : Math.min(
                1,
                BLEND_AT_TWO +
                    (1 - BLEND_AT_TWO) *
                        ((catalogSize - 2) / (FULL_CURVE_AT_COUNT - 2))
            )
    return (1 - blend) * 1 + blend * curveWeight
}

const TIER_BAND_SPAN = 0.6
const TIER_BAND_BASE = 0.2
const B_FLOOR = 0.7

function sortByRecency<T extends { releaseDate: number }>(items: T[]): T[] {
    return [...items].sort((a, b) => b.releaseDate - a.releaseDate)
}

function tieredBandWeight(rank: number, maxRank: number, ceiling: number): number {
    const eased = easedRecency(rank, maxRank)
    return ceiling * (TIER_BAND_BASE + TIER_BAND_SPAN * eased)
}

function weighArtistCandidates(candidates: DatedPV[]): Map<DatedPV, number> {
    const weights = new Map<DatedPV, number>()

    const normal = sortByRecency(candidates.filter((c) => !c.rank))
    const tierA = candidates.filter((c) => c.rank === "A")
    const tierB = candidates.filter((c) => c.rank === "B")
    const tierD = sortByRecency(candidates.filter((c) => c.rank === "D"))
    const tierE = sortByRecency(candidates.filter((c) => c.rank === "E"))
    const normalMaxRank = normal.length - 1
    normal.forEach((candidate, rank) => {
        weights.set(candidate, normalTierWeight(rank, normalMaxRank, normal.length))
    })
    const normalMin = normal.length > 0 ? Math.min(...normal.map((c) => weights.get(c)!)) : 1

    for (const candidate of tierA) weights.set(candidate, 1)

    if (tierB.length > 0) {
        const combined = sortByRecency([...normal, ...tierB])
        const combinedMaxRank = combined.length - 1
        combined.forEach((candidate, rank) => {
            if (!tierB.includes(candidate)) return
            const asIfNormal = normalTierWeight(rank, combinedMaxRank, combined.length)
            weights.set(candidate, Math.max(asIfNormal, B_FLOOR))
        })
    }

    const dMaxRank = tierD.length - 1
    tierD.forEach((candidate, rank) => {
        weights.set(candidate, tieredBandWeight(rank, dMaxRank, normalMin))
    })
    const dMin = tierD.length > 0 ? Math.min(...tierD.map((c) => weights.get(c)!)) : normalMin
    const eMaxRank = tierE.length - 1
    tierE.forEach((candidate, rank) => {
        weights.set(candidate, tieredBandWeight(rank, eMaxRank, dMin))
    })

    return weights
}

function pickWeightedDaily(candidates: DatedPV[], seedKey: string): DatedPV {
    if (candidates.length <= 1) return candidates[0]

    const weights = weighArtistCandidates(candidates)
    const ordered = [...candidates]
    const totalWeight = ordered.reduce((sum, c) => sum + (weights.get(c) ?? 0), 0)

    const daysSinceEpoch = Math.floor(Date.now() / 86_400_000)
    const draw = hashToUnitInterval(`${seedKey}-${daysSinceEpoch}`) * totalWeight

    let remaining = draw
    for (const candidate of ordered) {
        remaining -= weights.get(candidate) ?? 0
        if (remaining <= 0) return candidate
    }

    return ordered[ordered.length - 1]
}

export function getRecentPVs(): RecentPV[] {
    const picks: RecentPV[] = []

    for (const entry of artists) {
        const artist = getArtistBySlug(entry.slug)
        if (!artist) continue

        const candidates = getDatedPVsByArtist(entry.slug)
        if (candidates.length === 0) continue

        const chosen = pickWeightedDaily(candidates, entry.slug)

        picks.push({
            title: chosen.title,
            artistName: chosen.artistName,
            pv: chosen.pv,
            artistSlug: chosen.artistSlug,
            releaseSlug: chosen.releaseSlug,
            trackSlug: chosen.trackSlug,
        })
    }

    return picks
}
