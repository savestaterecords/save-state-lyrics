import { Routes, Route } from "react-router-dom"
import HomeView from "./views/HomeView"
import Navbar from "./components/Navbar.tsx";
import Footer from "./components/Footer.tsx";
import ArtistRoute from "./routes/ArtistRoute.tsx";


export default function App() {
    return (
        <div className="site-frame">
            <Navbar />

            <main className="site-main">
                <Routes>
                    <Route path="/" element={<HomeView />} />
                    <Route path="/:artistSlug/" element={<ArtistRoute />} />
                </Routes>
            </main>

            <Footer />
        </div>
    )
}