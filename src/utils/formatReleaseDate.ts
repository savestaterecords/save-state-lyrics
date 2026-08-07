const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
]

// Release dates are stored as a single YYMMDD number (e.g. 260529 -> 2026-05-29).
export function formatReleaseDate(date: number): string {
    const raw = date.toString().padStart(6, "0")

    const yy = raw.slice(0, 2)
    const mm = raw.slice(2, 4)
    const dd = raw.slice(4, 6)

    const year = Number(`20${yy}`)
    const monthIndex = Number(mm) - 1
    const day = Number(dd)

    return `${months[monthIndex]} ${day}, ${year}`
}
