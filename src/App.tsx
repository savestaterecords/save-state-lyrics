import Navbar from "./components/Navbar.tsx";
import Footer from "./components/Footer.tsx";
import HomeView from "./views/HomeView.tsx";

export default function App() {
  return (
      <div className="site-frame">
        <Navbar />
        <main className="site-main">
            <HomeView />
        </main>
        <Footer />
      </div>
  )
}