import { useState } from 'react';
import './Stylesheets/SettingModal.css';

function SettingsModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const [darkMode, setDarkMode] = useState(false);
  const [fontSize, setFontSize] = useState(14);
  const [language, setLanguage] = useState('en');

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Einstellungen</h2>

        <div className="setting">
          <label>Dark Mode</label>
          <input
            type="checkbox"
            checked={darkMode}
            onChange={(e) => setDarkMode(e.target.checked)}
          />
        </div>

        <div className="setting">
          <label>Editor Schriftgröße: {fontSize}px</label>
          <input
            type="range"
            min="10"
            max="24"
            value={fontSize}
            onChange={(e) => setFontSize(parseInt(e.target.value))}
          />
        </div>

        <div className="setting">
          <label>Sprache</label>
          <select value={language} onChange={(e) => setLanguage(e.target.value)}>
            <option value="en">🇬🇧 Englisch</option>
            <option value="de">🇩🇪 Deutsch</option>
          </select>
        </div>

        <button onClick={onClose}>Schließen</button>
      </div>
    </div>
  );
}

export default SettingsModal;
