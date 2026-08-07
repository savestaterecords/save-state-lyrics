import { useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import { getLatestRelease } from "../../utils/resolveRelease.ts"
import { useTranslation } from "../../context/TranslationContext.tsx"
import { pickText } from "../../utils/pickText.tsx"
import { formatReleaseDate } from "../../utils/formatReleaseDate.ts"
import { getReleaseImages } from "../../utils/resolveReleaseImages.ts"

type LatestReleaseProps = {
    onWidthChange: (width: number) => void
}

export default function LatestRelease({ onWidthChange }: LatestReleaseProps) {
    const { showTranslation } = useTranslation()
    const recentRelease = getLatestRelease()
    const recentReleaseArt = recentRelease
        ? getReleaseImages(recentRelease.artistSlug, recentRelease.slug)
        : undefined

    const sectionRef = useRef<HTMLElement | null>(null)

    useEffect(() => {
        const el = sectionRef.current
        if (!el) return

        const observer = new ResizeObserver((entries) => {
            const entry = entries[0]
            if (entry) onWidthChange(entry.contentRect.width)
        })
        observer.observe(el)
        return () => observer.disconnect()
    }, [recentRelease, onWidthChange])

    if (!recentRelease) return null

    return (
        <section className="home-demo-release" ref={sectionRef}>
            <Link
                to={`/${recentRelease.artistSlug}/${recentRelease.slug}/`}
                className="home-demo-square home-demo-release-art"
                aria-label={pickText(recentRelease.title, showTranslation)}
            >
                {recentReleaseArt?.thumb && (
                    <img
                        src={recentReleaseArt.thumb}
                        alt=""
                        className="home-demo-release-art-img"
                        draggable={false}
                    />
                )}
            </Link>
            <div className="home-demo-release-info">
                <p className="home-demo-eyebrow">latest release</p>
                <h2 className="home-demo-release-title">
                    <Link
                        to={`/${recentRelease.artistSlug}/${recentRelease.slug}/`}
                        className="home-demo-release-title-link"
                    >
                        {pickText(recentRelease.title, showTranslation)}
                    </Link>
                </h2>
                <p className="home-demo-release-meta">
                    {pickText(recentRelease.artist, showTranslation)}
                    {" ・ "}
                    {formatReleaseDate(recentRelease.releaseDate)}
                </p>
            </div>
        </section>
    )
}
