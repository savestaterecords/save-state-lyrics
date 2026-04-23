export function renderCreditsWithHandles(text: string) {
    const parts = text.split(/(@[a-zA-Z0-9._]+)/g)

    return parts.map((part, index) => {
        if (part.startsWith("@")) {
            const handle = part.slice(1)

            return (
                <span
                    key={index}
            className="credit-handle"
            onClick={() =>
            window.open(`https://instagram.com/${handle}`, "_blank", "noopener,noreferrer")
        }
        >
            {part}
            </span>
        )
        }

        return <span key={index}>{part}</span>
    })
}