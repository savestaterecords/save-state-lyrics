import '../style/Footer.css'

export default function Footer() {
    const startYear = 2020
    const currentYear = new Date().getFullYear()

    return (
        <footer className="site-footer">
            <div className="site-column">
                <p>
                    © {startYear}
                    {currentYear !== startYear ? `–${currentYear}` : ""} save state records.
                </p>
            </div>
        </footer>
    )
}