import { useNavigate, Link } from 'react-router-dom'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { VscMenu, VscChromeClose } from 'react-icons/vsc'
import '../App.css'

function App() {
  const navigate = useNavigate()
  const { i18n, t } = useTranslation()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)

  return (
    <div style={{ fontFamily: 'Segoe UI, sans-serif', color: '#1e1e1e', width: '100vw', marginTop: '170px' }}>
      
      {/* HEADER */}
      <header style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 20px',
        backgroundColor: '#1e1e1e',
        color: 'white',
        position: 'fixed',
        top: 0,
        width: '94%',
        zIndex: 1000,
        height: '40px'
      }}>
        <div style={{ fontSize: '24px', fontWeight: 'bold' }}>
          <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
            {t('title')}
          </Link>
        </div>

        <nav style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button onClick={() => navigate('/editor')} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}>
            {t('tryOnline') || 'Im Web ausprobieren'}
          </button>

          {/* Dropdown Sprachwahl */}
          <select
            onChange={(e) => i18n.changeLanguage(e.target.value)}
            value={i18n.language}
            style={{
              background: 'none',
              border: '1px solid white',
              color: 'white',
              padding: '6px 10px',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            <option value="de">🇩🇪 Deutsch</option>
            <option value="en">🇬🇧 English</option>
          </select>

          <button onClick={toggleSidebar} style={menuButton}>☰</button>
        </nav>
      </header>

      {/* SIDEBAR */}
      {sidebarOpen && (
        <aside style={{
          position: 'fixed',
          top: '60px', // Unterhalb der Navbar
          right: 0,
          height: '100%',
          width: '250px',
          backgroundColor: '#2c2c2c',
          color: 'white',
          padding: '20px',
          boxShadow: '-2px 0 8px rgba(0,0,0,0.2)',
          zIndex: 999
        }}>
          <button onClick={toggleSidebar} style={closeButton}>×</button>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li><Link to="/" onClick={toggleSidebar} style={linkStyle}>Home</Link></li>
            <li><Link to="/editor" onClick={toggleSidebar} style={linkStyle}>Editor</Link></li>
          </ul>
        </aside>
      )}

      {/* HERO */}
      <section style={{
        backgroundColor: '#007acc',
        color: 'white',
        padding: '60px 30px',
        textAlign: 'center'
      }}>
        <h1 style={{ fontSize: '48px', margin: '0 0 20px', marginTop: '10vh' }}>{t('title')}</h1>
        <p style={{ fontSize: '20px', maxWidth: '700px', margin: '0 auto 30px' }}>{t('subtitle')}</p>
        <div style={{ marginTop: '20px' }}>
          <button disabled style={downloadButtonDisabled}>{t('downloadSoon')}</button>
          <button onClick={() => navigate('/editor')} style={webButton}>{t('tryOnline')}</button>
        </div>
      </section>

      {/* FEATURES */}
      <section style={{ padding: '60px 30px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '32px', marginBottom: '30px', color: '#ffffff' }}>{t('features')}</h2>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '40px',
          flexWrap: 'wrap'
        }}>
          {[
            { title: "Live-Code-Sharing", desc: "Synchronisiere deinen Code geräteübergreifend, oder teile ihn mit deinen Freunden." },
            { title: "Multi-Datei-Support", desc: "Organisiere deinen Code in Projekten mit mehreren Dateien." },
            { title: "Monaco Editor", desc: "Einfach zu verstehende Oberfläche für jeden Nutzer." },
            { title: "Dark Mode", desc: "Ein Design, das deinen Augen schmeichelt." },
          ].map((f, i) => (
            <div key={i} className="features">
              <h3 style={{ fontSize: '20px', marginBottom: '10px', color: '#007acc' }}>{f.title}</h3>
              <p style={{ fontSize: '15px', lineHeight: '1.5', color: '#ffffff' }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* DOWNLOAD */}
      <section style={{
        backgroundColor: '#333',
        padding: '60px 30px',
        textAlign: 'center'
      }}>
        <h2 style={{ fontSize: '28px', marginBottom: '20px', color: '#ffffff' }}>{t('downloads')}</h2>
        <p style={{ marginBottom: '10px', color: '#ffffff' }}>{t('comingSoon')}</p>
        <button disabled style={{
          backgroundColor: '#999',
          color: 'white',
          padding: '10px 20px',
          border: 'none',
          borderRadius: '4px',
          fontSize: '16px'
        }}>
          {t('notAvailable')}
        </button>
      </section>

      {/* FOOTER */}
      <footer style={{
        backgroundColor: '#1e1e1e',
        color: '#ccc',
        padding: '20px',
        textAlign: 'center',
        fontSize: '14px'
      }}>
        ©{new Date().getFullYear()} CodeSync. {t('openSource')} <a href="https://github.com/YTLucaMC3103/codesyncweb" target='_blank'>Github</a>.
        <br />
        {t('footer')}
      </footer>
    </div>
  )
}

const langButton = {
  background: 'none',
  border: 'none',
  color: 'white',
  fontSize: '18px',
  margin: '0 4px',
  cursor: 'pointer'
}

const menuButton = {
  background: 'none',
  border: '1px solid white',
  color: 'white',
  padding: '6px 10px',
  borderRadius: '4px',
  cursor: 'pointer'
}

const closeButton = {
  background: 'none',
  color: 'white',
  border: 'none',
  fontSize: '20px',
  position: 'absolute',
  top: '10px',
  right: '10px',
  cursor: 'pointer'
}

const linkStyle = {
  display: 'block',
  padding: '10px 0',
  color: 'white',
  textDecoration: 'none',
  fontSize: '16px'
}

const downloadButtonDisabled = {
  backgroundColor: '#999',
  color: '#007acc',
  fontSize: '16px',
  border: 'none',
  padding: '12px 24px',
  borderRadius: '4px',
  cursor: 'pointer',
  fontWeight: 'bold',
}

const webButton = {
  backgroundColor: '#ffffff',
  color: '#007acc',
  fontSize: '16px',
  border: 'none',
  padding: '12px 24px',
  borderRadius: '4px',
  cursor: 'pointer',
  fontWeight: 'bold',
  marginLeft: '2vw'
}

export default App
