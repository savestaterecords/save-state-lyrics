import { useRef, useState } from "react"
import { useTranslation } from "../../context/TranslationContext.tsx"
import { pickText } from "../../utils/pickText.tsx"
import { getRecentPVs } from "../../utils/getRecentPVs.ts"
import { getYouTubeThumbnail } from "../../utils/getYouTubeThumbnail.ts"
import { getYouTubeVideoId } from "../../utils/getYouTubeVideoId.ts"

export default function FeaturedVideos() {
    const { showTranslation } = useTranslation()
    const recentPVs = getRecentPVs()
    const [previewKey, setPreviewKey] = useState<string | null>(null)
    const previewTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

    function schedulePreview(key: string) {
        if (previewTimeoutRef.current) clearTimeout(previewTimeoutRef.current)
        previewTimeoutRef.current = setTimeout(() => setPreviewKey(key), 175)
    }

    function cancelPreview() {
        if (previewTimeoutRef.current) clearTimeout(previewTimeoutRef.current)
        setPreviewKey(null)
    }

    if (recentPVs.length === 0) return null

    return (
        <section className="home-demo-pvs">
            <p className="home-demo-eyebrow">featured videos</p>

            <div className="home-demo-pv-grid">
                {recentPVs.map((pv) => {
                    const thumb = getYouTubeThumbnail(pv.pv)
                    const videoId = getYouTubeVideoId(pv.pv)
                    const href = pv.pv.startsWith("http")
                        ? pv.pv
                        : `https://${pv.pv}`
                    const key = `${pv.artistSlug}-${pv.releaseSlug}-${pv.trackSlug}`
                    const isPreviewing = previewKey === key && videoId

                    return (
                        <a
                            key={key}
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="home-demo-pv-tile"
                            onMouseEnter={() => videoId && schedulePreview(key)}
                            onMouseLeave={cancelPreview}
                        >
                            <div className="home-demo-square home-demo-pv-thumb">
                                {thumb && (
                                    <img
                                        src={thumb}
                                        alt=""
                                        className="home-demo-pv-thumb-img"
                                        draggable={false}
                                    />
                                )}
                                <span className="home-demo-play" />

                                {isPreviewing && (
                                    <iframe
                                        className="home-demo-pv-preview"
                                        src={`https://www.youtube.com/embed/
                                        ${videoId}?autoplay=1&mute=1&controls=0&loop=1&playlist=
                                        ${videoId}&modestbranding=1&rel=0&playsinline=1`}
                                        title=""
                                        tabIndex={-1}
                                        aria-hidden="true"
                                        allow="autoplay; encrypted-media"
                                    />
                                )}
                            </div>
                            <p className="home-demo-pv-caption">
                                {pickText(pv.artistName, showTranslation)}
                                {" · "}
                                {pickText(pv.title, showTranslation)}
                            </p>
                        </a>
                    )
                })}
            </div>
        </section>
    )
}
