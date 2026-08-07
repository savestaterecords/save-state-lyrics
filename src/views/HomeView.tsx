import type { CSSProperties } from "react"
import { useState } from "react"
import UpcomingModule from "../components/home/UpcomingModule.tsx"
import LatestRelease from "../components/home/LatestRelease.tsx"
import FeaturedVideos from "../components/home/FeaturedVideos.tsx"
import ArtistGrid from "../components/home/ArtistGrid.tsx"
import "../style/HomeView.css"

export default function HomeView() {
    const [latestReleaseWidth, setLatestReleaseWidth] = useState<number | null>(null)
    const sharedWidthCapStyle = latestReleaseWidth
        ? ({ "--upcoming-max-w": `${latestReleaseWidth * 1.25}px` } as CSSProperties)
        : undefined

    return (
        <div className="home-view home-demo site-column" style={sharedWidthCapStyle}>
            <div className="home-demo-bg" aria-hidden="true" />
            <div className="home-demo-amp-grille" aria-hidden="true" />

            <UpcomingModule />
            <LatestRelease onWidthChange={setLatestReleaseWidth} />
            <FeaturedVideos />
            <ArtistGrid />
        </div>
    )
}
