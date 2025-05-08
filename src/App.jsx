import { useEffect, useState } from 'react'
import { Routes, Route, Router } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import EditorPage from './pages/EditorPage'
import ProfilePage from './pages/ProfilePage'
import LoginPage from './pages/LoginPage'
import { auth } from './firebase'

function App() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      setUser(firebaseUser)
    })
    return () => unsubscribe()
  }, [])

  return (
    <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/editor" element={<EditorPage user={user} />} />
        <Route path="/profile" element={<ProfilePage user={user} />} />
        <Route path="/login" element={<LoginPage user={user} />} />
    </Routes>
  )
}

export default App
