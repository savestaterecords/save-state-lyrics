import type { TranslatableText } from "../types/Lyric.ts"

export function pickText(
    text: TranslatableText,
    showTranslation: boolean,
): string {
    if (typeof text === "string") {
        return text
    }

    if (showTranslation && text.english) {
        return text.english
    }

    return text.original
}