import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { VscChromeClose, VscMenu } from 'react-icons/vsc'
import Editor from '@monaco-editor/react'
import { auth, provider, signInWithPopup, signOut } from '../firebase'
import Logo from '../assets/icon.png'
import SettingsModal from '../components/SettingsModal'
import { useTranslation } from 'react-i18next'

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
  const [currentFile, setCurrentFile] = useState(null)
  const [code, setCode] = useState(project.files["main.js"])
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [sliderValue, setSliderValue] = useState(50)
  const [dropdownValue, setDropdownValue] = useState('light')
  const [toggleValue, setToggleValue] = useState(false)
  const [darkMode, setDarkMode] = useState(true)
  const [transitioning, setTransitioning] = useState(false)
  const navigate = useNavigate()
  const editorRef = useRef(null)
  const profilePic = user?.photoURL || localStorage.getItem('profilePic')
  const { i18n, t } = useTranslation()

  useEffect(() => {
    const savedCode = localStorage.getItem('codesync_code')
    const savedDarkMode = localStorage.getItem('darkMode')

    if (savedCode) setCode(savedCode)
    if (savedDarkMode !== null) setDarkMode(savedDarkMode === 'true')
  }, [])

  useEffect(() => {
    document.title = `Editor - CodeSync`;
  }, [])

  const openFile = (filename) => {
    setCurrentFile(filename)
    setCode(project.files[filename])
  }
  
  const toggleDarkMode = () => {
    setDarkMode(prev => {
      localStorage.setItem('darkMode', !prev);
      return !prev;
    });
  }

  const handleDarkModeToggle = () => {
    setTransitioning(true)
    setTimeout(() => {
      setDarkMode(prev => !prev)
      setTransitioning(false)
    }, 300)
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

  const createEmptyFile = () => {
    const newFileName = 'newFile.js';
    setProject({
      name: "Neues Projekt",
      files: { [newFileName]: '' }
    });
    setCurrentFile(newFileName);
    setCode('');
  };
  
  const openMockProject = () => {
    setProject(mockProject);
    setCurrentFile("main.js");
    setCode(mockProject.files["main.js"]);
  };

  const openFolder = async () => {
    try {
      const dirHandle = await window.showDirectoryPicker();
      const newFiles = {};
  
      for await (const [name, handle] of dirHandle.entries()) {
        if (handle.kind === 'file') {
          const file = await handle.getFile();
          const text = await file.text();
          newFiles[name] = text;
        }
      }
  
      setProject({ name: dirHandle.name, files: newFiles });
      const firstFile = Object.keys(newFiles)[0];
      setCurrentFile(firstFile);
      setCode(newFiles[firstFile]);
    } catch (err) {
      console.error("Ordner konnte nicht geöffnet werden:", err);
    }
  };

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
    <div style={{ height: '100vh', fontFamily: 'Segoe UI, sans-serif', width: '100vw', margin: 0, backgroundColor: darkMode ? '#1e1e1e' : '#f5f5f5', display: 'flex', flexDirection: 'column', overflow: 'hidden', transition: 'background-color 0.4s ease, color 0.4s ease' }}>
      <div style={{
        height: '50px',
        color: darkMode ? '#fff' : '#000',
        display: 'flex',
        alignItems: 'center',
        padding: '0 20px',
        fontWeight: 'bold',
        borderBottom: '1px solid #444',
        backgroundColor: darkMode ? '#181818' : '#e7e7e7',
      }}>
        CodeSync - {currentFile}
        <button
          style={{
            background: 'none',
            border: 'none',
            color: darkMode ? '#fff' : '#000',
            fontSize: '18px',
            cursor: 'pointer',
            marginLeft: 'auto',
            padding: '5px 10px'
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
                  <div style={dropdownItem} onClick={() => handleDropdownClick('profile')}>{t('profile')}</div>
                  <div style={dropdownItem} onClick={() => setSettingsOpen(true)}>{t('settings')}</div>
                  <div style={dropdownItem} onClick={() => handleDropdownClick('logout')}>{t('logout')}</div>
                </div>
              )}
           <SettingsModal
            isOpen={settingsOpen}
            onClose={() => setSettingsOpen(false)} 
            darkMode={darkMode}
            setDarkMode={setDarkMode}
          />
            </>
          ) : (
            <button onClick={() => navigate('/login')} style={buttonStyle}>{t('login')}</button>
          )}
        </div>
      </div>

      <div style={{ display: 'flex', flexGrow: 1 }}>
        {isSidebarOpen && (
          <div style={{
            width: '200px',
            backgroundColor: darkMode ? '#181818' : '#e7e7e7',
            padding: '10px',
            borderRight: '1px solid #444',
            transition: 'all 0.3s ease-in-out',
            color: '#777',
            fontSize: '14px',
          }}>
            
          </div>
        )}

<div
  style={{
    flexGrow: 1,
    position: 'relative',
    transition: 'opacity 0.3s ease',
    opacity: transitioning ? 0.3 : 1,
  }}
>
  {currentFile ? (
    <Editor
      height="100%"
      width="100%"
      language={getLanguageFromFilename(currentFile)}
      theme={darkMode ? 'vs-dark' : 'light'}
      value={code || ''}
      onChange={handleChange}
      onMount={(editor) => {
        editorRef.current = editor
      }}
      options={{
        fontSize: 16,
        minimap: { enabled: true },
        automaticLayout: true,
      }}
    />
  ) : (
    <div style={{
      height: '100%',
      width: '100%',
      color: darkMode ? '#bbb' : '#444',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      fontFamily: 'sans-serif',
      textAlign: 'center',
      padding: '20px',
    }}>
      <img src={Logo} alt="CodeSync Logo" style={{ width: '200px', marginBottom: '20px', opacity: 0.7 }} />
      <h2>{t('welcome')} <span style={{ color: '#4fc3f7' }}>CodeSync</span></h2>
      <p style={{ maxWidth: '400px' }}>{t('upperEditorInstruction')}<br />{t('lowerEditorInstruction')}</p>
      <div style={{ display: 'flex', gap: '10px' }}>
        <button style={buttonStyle} onClick={createEmptyFile}>{t('createFile')}</button>
        <button style={buttonStyle} onClick={openFolder}>{t('openFolder')}</button>
      </div>
    </div>
  )}
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