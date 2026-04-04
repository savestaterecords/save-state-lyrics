import { useTranslation } from "../context/TranslationContext.tsx"
import "../style/TranslateToggle.css"

export default function TranslateToggle() {
    const { toggleTranslation } = useTranslation()

    function handleClick() {
        toggleTranslation()
    }

    return (
        <button
            type="button"
            className="translate-toggle"
            onClick={handleClick}
            title="Toggle translation (T)"
            aria-label="Toggle translation"
        >
        <span className="translate-toggle-mark" aria-hidden="true">
            文<span className="translate-toggle-slash">/A</span>
        </span>
        </button>
    )
}