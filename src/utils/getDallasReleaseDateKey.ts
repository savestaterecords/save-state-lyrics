export function getDallasReleaseDateKey(): number {
    const iso = new Intl.DateTimeFormat("en-CA", {
        timeZone: "America/Chicago",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    }).format(new Date())

    const [year, month, day] = iso.split("-")
    return Number(`${year.slice(2)}${month}${day}`)
}
