import { useTranslation } from 'react-i18next'

function LanguageSwitcher() {
  const { i18n } = useTranslation()

  return (
    <div style={{ position: 'absolute', top: 10, right: 10 }}>
      <button onClick={() => i18n.changeLanguage('de')}>🇩🇪 Deutsch</button>
      <button onClick={() => i18n.changeLanguage('en')}>🇬🇧 English</button>
    </div>
  )
}

export default LanguageSwitcher
