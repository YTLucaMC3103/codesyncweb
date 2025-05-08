import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { VscChromeClose, VscMenu } from 'react-icons/vsc'
import Editor from '@monaco-editor/react';
import { auth, provider, signInWithPopup, signOut } from '../firebase';

const mockProject = {
  name: "CodeSync-Projekt",
  files: {
    "main.js": "console.log('Hallo Welt!');",
    "src/utils.js": "export const hello = () => console.log('Hi')",
    "docs/README.md": "# Willkommen bei CodeSync"
  }
}

const getLanguageFromFilename = (filename) => {
  if (filename.endsWith('.js')) return 'javascript'
  if (filename.endsWith('.ts')) return 'typescript'
  if (filename.endsWith('.json')) return 'json'
  if (filename.endsWith('.css')) return 'css'
  if (filename.endsWith('.html')) return 'html'
  if (filename.endsWith('.md')) return 'markdown'
  if (filename.endsWith('.py')) return 'python'
  if (filename.endsWith('.java')) return 'java'
  if (filename.endsWith('.c')) return 'c'
  if (filename.endsWith('.cpp')) return 'cpp'
  return 'plaintext'
}

function EditorPage({ user }) {
  const [project, setProject] = useState(mockProject)
  const [currentFile, setCurrentFile] = useState("main.js")
  const [code, setCode] = useState(project.files["main.js"])
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const navigate = useNavigate()
  const profilePic = user?.photoURL || localStorage.getItem('profilePic')

  useEffect(() => {
    const savedCode = localStorage.getItem('codesync_code')
    if (savedCode) setCode(savedCode)
  }, [])

  useEffect(() => {
    document.title = `Editor - CodeSync`;
  }, [])

  const openFile = (filename) => {
    setCurrentFile(filename)
    setCode(project.files[filename])
  }

  const handleChange = (value) => {
    if (value !== undefined) {
      setCode(value)
      setProject(prev => ({
        ...prev,
        files: {
          ...prev.files,
          [currentFile]: value
        }
      }))
    }
  }

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, provider)
    } catch (err) {
      console.error('Fehler bei Login:', err)
    }
  }

  const handleLogout = async () => {
    await signOut(auth)
  }

  const handleDropdownClick = (action) => {
    setDropdownOpen(false)
    if (action === 'profile') navigate('/profile')
    if (action === 'logout') handleLogout()
  }

  const buttonStyle = {
    background: '#444',
    border: 'none',
    padding: '6px 10px',
    color: '#fff',
    cursor: 'pointer',
    borderRadius: '4px',
  }

  const dropdownStyle = {
    position: 'absolute',
    top: 40,
    right: 0,
    background: '#444',
    border: '1px solid #666',
    borderRadius: '4px',
    padding: '4px 0',
    zIndex: 10,
    minWidth: '150px',
  }

  const dropdownItem = {
    padding: '8px 12px',
    color: '#fff',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    fontSize: '14px',
    borderBottom: '1px solid #555',
  }

  return (
    <div style={{ height: '100vh', width: '100vw', margin: 0, backgroundColor: '#1e1e1e', display: 'flex', flexDirection: 'column' }}>
      <div style={{
        height: '50px',
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        padding: '0 20px',
        fontWeight: 'bold',
        borderBottom: '1px solid #444',
        backgroundColor: '#333',
      }}>
        CodeSync - {currentFile}
        <button
          style={{
            background: 'none',
            border: 'none',
            color: 'white',
            fontSize: '18px',
            cursor: 'pointer',
            marginLeft: 'auto',
            padding: '5px 10px',
          }}
          onClick={toggleSidebar}
        >
          {isSidebarOpen ? <VscChromeClose size={24} /> : <VscMenu size={24}/>}
        </button>

        <div style={{ marginLeft: '10px', position: 'relative' }}>
          {user ? (
            <>
              <img
                src={profilePic}
                alt="User"
                style={{ width: 32, borderRadius: '50%', cursor: 'pointer', marginTop: '3px' }}
                onClick={() => setDropdownOpen(prev => !prev)}
              />
              {dropdownOpen && (
                <div style={dropdownStyle}>
                  <div style={dropdownItem} onClick={() => handleDropdownClick('profile')}>Profil</div>
                  <div style={dropdownItem} onClick={() => alert('Einstellungen (bald verfügbar)')}>Einstellungen</div>
                  <div style={dropdownItem} onClick={() => handleDropdownClick('logout')}>Logout</div>
                </div>
              )}
            </>
          ) : (
            <button onClick={() => navigate('/login')} style={buttonStyle}>Anmelden</button>
          )}
        </div>
      </div>

      <div style={{ display: 'flex', flexGrow: 1 }}>
        {isSidebarOpen && (
          <div style={{
            width: '200px',
            backgroundColor: '#2e2e2e',
            padding: '10px',
            borderRight: '1px solid #444',
            transition: 'all 0.3s ease-in-out'
          }}>
            <p><strong>{project.name}</strong></p>
            {Object.keys(project.files).map(filename => (
              <div
                key={filename}
                onClick={() => openFile(filename)}
                style={{
                  cursor: 'pointer',
                  padding: '5px 0',
                  fontWeight: filename === currentFile ? 'bold' : 'normal',
                  color: filename === currentFile ? '#fff' : '#ccc'
                }}
              >
                {filename}
              </div>
            ))}
          </div>
        )}

        <div style={{ flexGrow: 1 }}>
          <Editor
            height="100%"
            width="100%"
            language={getLanguageFromFilename(currentFile)}
            theme="vs-dark"
            value={code || ''}
            onChange={handleChange}
            options={{
              fontSize: 16,
              minimap: { enabled: false },
              automaticLayout: true,
            }}
          ></Editor>
        </div>
      </div>
    </div>
  )
}

function App() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((u) => {
      setUser(u)
    })

    return () => unsubscribe()
  }, [])
}

export default EditorPage