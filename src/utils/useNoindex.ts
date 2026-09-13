import { useEffect } from "react"

export function useNoindex(noindex: boolean) {
    useEffect(() => {
        if (!noindex) return

        const meta = document.createElement("meta")
        meta.name = "robots"
        meta.content = "noindex"
        document.head.appendChild(meta)

        return () => {
            document.head.removeChild(meta)
        }
    }, [noindex])
}
