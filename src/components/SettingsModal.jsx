import { useState } from 'react'
import { useTranslation } from 'react-i18next'

function SettingsModal({ isOpen, onClose, darkMode, setDarkMode }) {
  if (!isOpen) return null;

  const [fontSize, setFontSize] = useState(14)
  const [language, setLanguage] = useState('en')
  const { i18n, t } = useTranslation()

  const modalOverlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    background: 'rgba(30, 30, 30, 0.7)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 999,
  };

  const modalStyle = {
    background: '#111',
    borderRadius: '12px',
    padding: '24px',
    width: '360px',
    color: 'white',
    boxShadow: '0 10px 25px rgba(0,0,0,0.4)',
    fontFamily: 'sans-serif',
  };

  const settingStyle = {
    marginBottom: '20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };

  const toggleWrapper = {
    position: 'relative',
    width: '40px',
    height: '22px',
  };

  const toggleSlider = {
    position: 'absolute',
    cursor: 'pointer',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: darkMode ? '#4fc3f7' : '#ccc',
    borderRadius: '34px',
    transition: '.3s',
  };

  const toggleCircle = {
    position: 'absolute',
    height: '18px',
    width: '18px',
    left: darkMode ? '20px' : '2px',
    bottom: '2px',
    backgroundColor: '#fff',
    borderRadius: '50%',
    transition: '.3s',
  };

  return (
    <div style={modalOverlayStyle} onClick={onClose}>
      <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
        <h2 style={{ marginBottom: '20px', fontSize: '20px' }}>Einstellungen</h2>

        <div style={settingStyle}>
          <label>Dark Mode</label>
          <div style={toggleWrapper} onClick={() => setDarkMode(prev => !prev)}>
            <div style={toggleSlider}></div>
            <div style={toggleCircle}></div>
          </div>
        </div>

        <div style={settingStyle}>
          <label>Editor Schriftgröße</label>
          <input
            type="range"
            min="10"
            max="24"
            value={fontSize}
            onChange={(e) => setFontSize(parseInt(e.target.value))}
            style={{ width: '100px' }}
          />
        </div>

        <div style={settingStyle}>
          <label>Sprache</label>
          <select
            onChange={(e) => i18n.changeLanguage(e.target.value)}
            value={i18n.language}
            style={{
              padding: '6px 10px',
              background: '#222',
              color: 'white',
              border: '1px solid #555',
              borderRadius: '4px',
            }}
          >
            <option value="en">🇬🇧 Englisch</option>
            <option value="de">🇩🇪 Deutsch</option>
          </select>
        </div>

        <button
          onClick={onClose}
          style={{
            marginTop: '20px',
            background: '#4fc3f7',
            border: 'none',
            padding: '8px 14px',
            borderRadius: '6px',
            color: '#000',
            cursor: 'pointer',
            fontWeight: 'bold',
          }}
        >
          Schließen
        </button>
      </div>
    </div>
  );
}

export default SettingsModal;
