import { Routes, Route } from "react-router-dom"
import HomeView from "./views/HomeView"
import Navbar from "./components/Navbar.tsx";
import Footer from "./components/Footer.tsx";
import ArtistRoute from "./routes/ArtistRoute.tsx";
import ReleaseRoute from "./routes/ReleaseRoute.tsx";
import SongRoute from "./routes/SongRoute.tsx";


export default function App() {
    return (
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

            <Footer />
        </div>
    )
}