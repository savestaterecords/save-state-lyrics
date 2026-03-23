import { Link } from "react-router-dom"
import { artists } from "../data/registry.ts"
import type { Release } from "../types/Release.ts"
import "../style/ReleaseView.css"
// import { useState } from "react"
import {getLyricBySlug} from "../utils/resolveLyricsBySlug.ts";

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

// function formatNameList(names: string[]): string {
//     if (names.length === 0) return ""
//     if (names.length === 1) return names[0]
//     if (names.length === 2) return `${names[0]} and ${names[1]}`
//     return `${names.slice(0, -1).join(", ")}, and ${names[names.length - 1]}`
// }

export default function ReleaseView({ release }: ReleaseViewProps) {
    const artist = artists.find((entry) => entry.slug === release.artistSlug)
    const artistName = artist?.name ?? release.artistSlug
    const releaseImage = getReleaseImage(release.artistSlug, release.slug)
    // const [tracklistOpen, setTracklistOpen] = useState(false)

    return (
        <div className="release-page">
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

            {/*<div className="site-column release-neck">*/}
            {/*    <div className={`release-tracklist-disclosure${tracklistOpen ? " is-open" : ""}`}>*/}
            {/*        <button*/}
            {/*            type="button"*/}
            {/*            className="release-tracklist-summary"*/}
            {/*            onClick={() => setTracklistOpen((open) => !open)}*/}
            {/*            aria-expanded={tracklistOpen}*/}
            {/*        >*/}
            {/*            Tracklist*/}
            {/*        </button>*/}

            {/*        <div className={`release-tracklist-shell${tracklistOpen ? " is-open" : ""}`}>*/}
            {/*            <ol className="release-tracklist">*/}
            {/*                {release.tracklist.map((track) => (*/}
            {/*                    <li key={track.slug} className="release-track-item">*/}
            {/*                        <span className="release-track-title">{track.title}</span>*/}
            {/*                    </li>*/}
            {/*                ))}*/}
            {/*            </ol>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}

            <div className="site-column release-body">
                {release.tracklist.map((track) => {
                    const lyric = getLyricBySlug(track.slug)

                    if (!lyric) {
                        return (
                            <></>
                            // <section key={track.slug} className="release-lyric-block missing">
                            //     <h2>{track.title}</h2>
                            //     <p>Missing lyric</p>
                            // </section>
                        )
                    }

                    return (
                        <section
                            key={lyric.slug}
                            className="release-lyric-block"
                            id={lyric.slug}
                        >
                            <h2 className="release-lyric-title">
                                {lyric.head.title}
                            </h2>

                            {/*{(lyric.head.lyricist.length > 0 || lyric.head.composer.length > 0) && (*/}
                            {/*    <div className="release-lyric-credits">*/}
                            {/*        <span className="release-lyric-credit release-lyric-credit-left">*/}
                            {/*            {lyric.head.lyricist.length > 0 */}
                            {/*                ? `lyrics by ${formatNameList(lyric.head.lyricist)}` */}
                            {/*                : ""}*/}
                            {/*        </span>*/}

                            {/*        <span className="release-lyric-credit release-lyric-credit-right">*/}
                            {/*            {lyric.head.composer.length > 0 */}
                            {/*                ? `music by ${formatNameList(lyric.head.composer)}` */}
                            {/*                : ""}*/}
                            {/*        </span>*/}
                            {/*    </div>*/}
                            {/*)}*/}

                            {/*{lyric.head.PV && (*/}
                            {/*    <p className="release-lyric-pv">*/}
                            {/*        <a href={lyric.head.PV} target="_blank" rel="noreferrer">*/}
                            {/*            PV*/}
                            {/*        </a>*/}
                            {/*    </p>*/}
                            {/*)}*/}

                            <p className="release-lyric-text">
                                {lyric.body.lyrics}
                            </p>
                        </section>
                    )
                })}
            </div>
        </div>
    )
}