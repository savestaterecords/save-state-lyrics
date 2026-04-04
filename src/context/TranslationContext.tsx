import { createContext, useContext } from "react"

export type TranslationContextValue = {
    showTranslation: boolean
    toggleTranslation: () => void
}

const TranslationContext = createContext<TranslationContextValue | null>(null)

export function useTranslation() {
    const value = useContext(TranslationContext)

    if (!value) {
        throw new Error("useTranslation must be used within TranslationContext.Provider")
    }

    return value
}

export default TranslationContext