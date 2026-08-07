import { Link } from "react-router-dom"
import '../style/Footer.css'
const socialLinks = [
    {
        label: "YouTube",
        href: "https://youtube.com/@savestaterecords",
        icon: (
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31 31 0 0 0 0
                12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24
                12a31 31 0 0 0-.5-5.8ZM9.6 15.6V8.4L15.8 12l-6.2 3.6Z" />
            </svg>
        ),
    },
    {
        label: "Instagram",
        href: "https://instagram.com/savestaterecords",
        icon: (
            <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.6}
                aria-hidden="true"
            >
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4.2" />
                <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" stroke="none" />
            </svg>
        ),
    },
]

export default function Footer() {
    const startYear = 2020
    const currentYear = new Date().getFullYear()

    return (
        <footer className="site-footer">
            <div className="site-column footer-inner">
                <div className="footer-socials">
                    {socialLinks.map((social) => (
                        <a
                            key={social.label}
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="footer-social-link"
                            aria-label={social.label}
                        >
                            {social.icon}
                        </a>
                    ))}
                </div>

                <p>
                    © {startYear}
                    {currentYear !== startYear ? `–${currentYear}` : ""} save state records.
                    {" "}
                    <Link to="/about/" className="footer-about-link">
                        about
                    </Link>
                </p>
            </div>
        </footer>
    )
}