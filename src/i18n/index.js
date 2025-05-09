import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import translationEN from './locales/en/translation.json'
import translationDE from './locales/de/translation.json'

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'de',
    interpolation: { escapeValue: false },
    resources: {
      en: { translation: translationEN },
      de: { translation: translationDE },
    },
  })

export default i18n
