import { useNavigate, Link } from 'react-router-dom'
import '../App.css'

function App() {
    const navigate = useNavigate()

    return (
      <div style={{ fontFamily: 'Segoe UI, sans-serif', color: '#1e1e1e', width: '100vw' }}>
        {/* Hero */}
        <section style={{
          backgroundColor: '#007acc',
          color: 'white',
          padding: '60px 30px',
          textAlign: 'center'
        }}>
          <h1 style={{ fontSize: '48px', margin: '0 0 20px', marginTop: '10vh' }}>CodeSync</h1>
          <p style={{ fontSize: '20px', maxWidth: '700px', margin: '0 auto 30px' }}>
            Synchronisiere deinen Code - überall
          </p>
          <div style={{ marginTop: '20px' }}>
            <a>
              <button disabled style={{
                backgroundColor: '#999',
                color: '#007acc',
                fontSize: '16px',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '4px',
                cursor: 'pointer',
                fontWeight: 'bold',
              }}>
                Für Windows herunterladen (Bald verfügbar)
              </button>
                  <button onClick={() => navigate('/editor')} style={{
                      backgroundColor: '#ffffff',
                      color: '#007acc',
                      fontSize: '16px',
                      border: 'none',
                      padding: '12px 24px',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontWeight: 'bold',
                      marginLeft: '2vw'
                  }}>
                      Im Web ausprobieren
                  </button>
            </a>
          </div>
        </section>

        {/* Features */}
        <section style={{ padding: '60px 30px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '32px', marginBottom: '30px', color: '#ffffff' }}>Features</h2>
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

        {/* Download */}
        <section style={{
          backgroundColor: '#333',
          padding: '60px 30px',
          textAlign: 'center'
        }}>
          <h2 style={{ fontSize: '28px', marginBottom: '20px', color: '#ffffff' }}>Downloads</h2>
          <p style={{ marginBottom: '10px', color: '#ffffff' }}>Desktop & Mobile App Version erscheinen bald.</p>
          <button disabled style={{
            backgroundColor: '#999',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '4px',
            fontSize: '16px'
          }}>
            Noch nicht verfügbar
          </button>
        </section>

        {/* Footer */}
        <footer style={{
          backgroundColor: '#1e1e1e',
          color: '#ccc',
          padding: '20px',
          textAlign: 'center',
          fontSize: '14px'
        }}>
          ©{new Date().getFullYear()} CodeSync. Open Source auf <a href="https://github.com/YTLucaMC3103/codesyncweb" target='_blank'>Github</a>.
        </footer>
      </div>
    )
}

export default App;
