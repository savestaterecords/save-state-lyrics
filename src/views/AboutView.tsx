import { Link } from "react-router-dom"
import "../style/AboutView.css"

export default function AboutView() {
    return (
        <div className="site-column about-view">
            <h1 className="about-title">About</h1>

            <p className="about-text">
                lyr.savestate.fm is the official lyrics archive for the
                Save State Records catalog. The archive contains lyrics,
                release information, songwriting credits, and translations
                where available, covering XROSZ, [_lllll_], reset memory,
                and Posadas. This archive covers lyrical works only;
                releases published under rsm.vgm are not included.
            </p>

            <p className="about-text">
                Each release page serves as the canonical reference for
                its lyrics, credits, translations, and release metadata.
            </p>

            <p className="about-text">
                Titles shown in one language have not yet been translated.
                Press T, or select 文/A, to toggle English where available.
            </p>

            <div className="about-artists">
                <section className="about-artist">
                    <h2 className="about-artist-name">
                        <Link to="/xrosz/">XROSZ</Link>
                    </h2>
                    <p className="about-text">
                        XROSZ is a band: Zen (vocals), Gio and Rain
                        (guitars), Grex (bass), and Isai (drums). Earlier
                        releases feature different members, credited on
                        each release page. XROSZ has released two demos,
                        Deliverance (2021) and Elegy (2025), and one
                        single, Yesterday (2026). Lyrics are primarily in
                        English, turning between grief and confrontational
                        political content — Elegy addresses anti-war and
                        anti-imperialist themes directly.
                    </p>
                </section>

                <section className="about-artist">
                    <h2 className="about-artist-name">
                        <Link to="/reset-memory/">reset memory</Link>
                    </h2>
                    <p className="about-text">
                        reset memory is the label's largest catalog: the
                        album Still Life (2023) and four singles — Ame
                        Tokei (2021), Aurora Borealis (2022), If All Else
                        Fails (2022), and Yurameku (2024). Song titles are
                        often in Japanese, with others in Arabic and
                        Sanskrit; lyrics are written in English. Recurring
                        themes include dreams, memory, and existential
                        drift. "Shinjuuka" is written as two alternating
                        voices rather than a single narrator.
                    </p>
                </section>

                <section className="about-artist">
                    <h2 className="about-artist-name">
                        <Link to="/lllll/">[_lllll_]</Link>
                    </h2>
                    <p className="about-text">
                        [_lllll_] is the label's newest project, led by
                        Rain with a songwriting contribution from Alyssa.
                        The catalog currently consists of two standalone
                        singles, "Kill Me" and "Summertime," each
                        accompanied by a music video. Lyrics are in
                        English.
                    </p>
                </section>

                <section className="about-artist">
                    <h2 className="about-artist-name">
                        <Link to="/posadas/">Posadas</Link>
                    </h2>
                    <p className="about-text">
                        The archive preserves the Posadas catalog: the
                        eighteen-track album Kyrie Eleison (2023). Song
                        titles move through Spanish, English, Gaelic, and
                        liturgical language, and some lyrics are written
                        in Spanish; the album title is Greek for "Lord,
                        have mercy." The album explores religious and
                        pilgrimage imagery, and most tracks carry an
                        accompanying music video.
                    </p>
                </section>
            </div>
        </div>
    )
}
