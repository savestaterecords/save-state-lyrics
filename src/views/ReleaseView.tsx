import { Link } from "react-router-dom"
import { artists } from "../data/registry.ts"
import type { Release } from "../types/Release.ts"
import "../style/ReleaseView.css"
import {getLyricBySlug} from "../utils/resolveLyricsBySlug.ts";
import type {CSSProperties} from "react";

const releaseImages = import.meta.glob("../img/release/*/*.{jpg,jpeg,webp}", {
    eager: true,
    import: "default",
}) as Record<string, string>

type ReleaseViewProps = {
    release: Release
}

function getReleaseImage(artistSlug: string, releaseSlug: string): string | undefined {
    const candidates = [
        `../img/release/${artistSlug}/${releaseSlug}.jpg`,
        `../img/release/${artistSlug}/${releaseSlug}.jpeg`,
        `../img/release/${artistSlug}/${releaseSlug}.webp`,
    ]

    for (const candidate of candidates) {
        if (candidate in releaseImages) return releaseImages[candidate]
    }

    return undefined
}

function formatReleaseDate(date: number): string {
    const raw = date.toString().padStart(6, "0")

    const yy = raw.slice(0, 2)
    const mm = raw.slice(2, 4)
    const dd = raw.slice(4, 6)

    const year = Number(`20${yy}`)
    const monthIndex = Number(mm) - 1
    const day = Number(dd)

    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ]

    return `${months[monthIndex]} ${day}, ${year}`
}

export default function ReleaseView({ release }: ReleaseViewProps) {
    const artist = artists.find((entry) => entry.slug === release.artistSlug)
    const artistName = artist?.name ?? release.artistSlug
    const releaseImage = getReleaseImage(release.artistSlug, release.slug)

    const theme = release.theme ?? null

    const releaseThemeStyle = {
        "--theme-h": String(theme?.Hue ?? 0),
        "--theme-s": theme?.strength ?? "0%",
        "--theme-h2": String(theme?.falloffHue ?? theme?.Hue ?? 0),
        "--theme-s-delta": theme?.falloffStrength ?? "0%",
        "--theme-l-delta": theme?.toWhite ?? "0%",
        "--theme-titles-h": String(theme?.titlesHue ?? theme?.falloffHue ?? theme?.Hue ?? 0),
    } as CSSProperties

    return (
        <div className="release-page" style={releaseThemeStyle}>
            <div className="site-column release-head">
                {releaseImage && (
                    <div className="release-art-frame">
                        <img
                            className="release-art"
                            src={releaseImage}
                            alt={`${release.title} album art`}
                            draggable={false}
                        />
                    </div>
                )}

                <h1 className="release-title">{release.title}</h1>

                <p className="release-meta">
                    <Link
                        to={`/${release.artistSlug}/`}
                        className="release-artist-link"
                    >
                        {artistName}
                    </Link>
                    <span className="release-meta-separator"> ・ </span>
                    <span>{formatReleaseDate(release.releaseDate)}</span>
                </p>
            </div>

            <div className="site-column release-body">
                {release.tracklist.map((track) => {
                    const lyric = getLyricBySlug(track.slug)

                    if (!lyric) {
                        return (
                            <section key={track.slug} className="release-lyric-block missing">
                                <h2>{track.title}</h2>
                                <p>Missing lyric</p>
                            </section>
                        )
                    }

                    return (
                        <section
                            key={lyric.slug}
                            className="release-lyric-block"
                            id={lyric.slug}
                        >
                            <h2 className="release-lyric-title">
                                <Link
                                    to={`/${release.artistSlug}/${release.slug}/${track.slug}/`}
                                    className="release-lyric-title-link"
                                >
                                    {lyric.head.title}
                                </Link>
                            </h2>

                            {"blocks" in lyric.body ? (
                                lyric.body.blocks.map((block, index) => {
                                    if (block.type === "scripture") {
                                        return (
                                            <p key={index} className="release-lyric-text scripture">
                                                {block.text}
                                            </p>
                                        )
                                    }

                                    if (block.type === "feature") {
                                        return (
                                            <p key={index} className="release-lyric-text feature">
                                                {block.text}
                                            </p>
                                        )
                                    }

                                    return (
                                        <p key={index} className="release-lyric-text">
                                            {block.text}
                                        </p>
                                    )
                                })
                            ) : (
                                <p className="release-lyric-text">
                                    {lyric.body.lyrics}
                                </p>
                            )}
                        </section>
                    )
                })}
            </div>

            {release.credits && (
                <div className="site-column release-foot">
                    <p className="release-credits">
                        {release.credits}
                    </p>
                </div>
            )}

        </div>
    )
}