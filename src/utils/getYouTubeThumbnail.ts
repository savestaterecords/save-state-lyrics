import { getYouTubeVideoId } from "./getYouTubeVideoId.ts"

export function getYouTubeThumbnail(pv: string): string | undefined {
    const id = getYouTubeVideoId(pv)
    if (!id) return undefined

    return `https://img.youtube.com/vi/${id}/hqdefault.jpg`
}
