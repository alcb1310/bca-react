import i18n from "i18next"
import Backend from 'i18next-http-backend'
import LanguageDetector from "i18next-browser-languagedetector"
import { initReactI18next } from "react-i18next"


i18n.use(Backend).use(LanguageDetector).use(initReactI18next).init({
    backend: {
        // translation file path
        loadPath: "/locales/{{lng}}/translation.json"
    },
    fallbackLng: "es",
    // disable in production
    debug: true,
    interpolation: {
        escpaceValue: false,
        formatSeparator: ","
    },
    supportedLngs: ['es', 'en'],
    lowerCaseLng: true,
    nonExplicitSupportedLngs: true,
    react: {
        wait: true
    }
})

export default i18n
