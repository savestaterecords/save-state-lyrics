import { Routes, Route } from "react-router-dom"
import { useEffect, useState } from "react"

import HomeView from "./views/HomeView"
import Navbar from "./components/Navbar.tsx"
import Footer from "./components/Footer.tsx"
import TranslateToggle from "./components/TranslateToggle.tsx"

import ArtistRoute from "./routes/ArtistRoute.tsx"
import ReleaseRoute from "./routes/ReleaseRoute.tsx"
import SongRoute from "./routes/SongRoute.tsx"

import TranslationContext from "./context/TranslationContext.tsx"

export default function App() {
    const [showTranslation, setShowTranslation] = useState(false)

    function toggleTranslation() {
        setShowTranslation((value) => !value)
    }

    useEffect(() => {
        function handleKeyDown(event: KeyboardEvent) {
            const target = event.target as HTMLElement | null

            const isTyping =
                target?.tagName === "INPUT" ||
                target?.tagName === "TEXTAREA" ||
                target?.isContentEditable

            if (isTyping) return

            if (event.key.toLowerCase() === "t") {
                event.preventDefault()
                toggleTranslation()
            }
        }

        window.addEventListener("keydown", handleKeyDown)
        return () => window.removeEventListener("keydown", handleKeyDown)
    }, [])

    return (
        <TranslationContext.Provider
            value={{ showTranslation, toggleTranslation }}
        >
            <div className="site-frame">
                <Navbar />

                <main className="site-main">
                    <Routes>
                        <Route path="/" element={<HomeView />} />
                        <Route path="/:artistSlug/" element={<ArtistRoute />} />
                        <Route path="/:artistSlug/:releaseSlug/" element={<ReleaseRoute />} />
                        <Route path="/:artistSlug/:releaseSlug/:trackSlug/" element={<SongRoute />} />
                    </Routes>
                </main>

                <TranslateToggle />

                <Footer />
            </div>
        </TranslationContext.Provider>
    )
}