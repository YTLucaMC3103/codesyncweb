import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { signInWithPopup, GoogleAuthProvider, GithubAuthProvider, sendSignInLinkToEmail } from "firebase/auth"
import { auth } from "../firebase"
import { Icon } from "@iconify/react"
import { Mail } from "lucide-react"
import backgroundImage from "../assets/code.jpg"

export default function AuthPage() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) navigate("/", { replace: true })
    })
    return () => unsubscribe()
  }, [navigate])

  useEffect(() => {
    document.title = `Login - CodeSync`
  }, [])

  const loginWithProvider = async (providerName) => {
    setLoading(true)
    try {
      let provider = null
      if (providerName === "google") provider = new GoogleAuthProvider()
      if (providerName === "github") provider = new GithubAuthProvider()
      await signInWithPopup(auth, provider)
    } catch (err) {
      alert("Fehler: " + err.message)
    } finally {
      setLoading(false)
    }
  }

  const loginWithEmail = async () => {
    const email = prompt("E-Mail eingeben:")
    if (!email) return
    setLoading(true)

    try {
      const actionCodeSettings = {
        url: window.location.origin,
        handleCodeInApp: true,
      }
      await sendSignInLinkToEmail(auth, email, actionCodeSettings)
      window.localStorage.setItem("emailForSignIn", email)
      alert("Check deine E-Mail für den Login-Link.")
    } catch (err) {
      alert("Fehler beim E-Mail Login: " + err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>
          Willkommen bei <span style={{ color: "#38bdf8" }}>CodeSync</span>
        </h1>
        <p style={styles.subtitle}>Synchronisiere deinen Code – überall.</p>

        <div style={styles.buttons}>
          <AuthButton
            icon={<Icon icon="logos:google-icon" width={20} />}
            label="Mit Google"
            disabled={loading}
            onClick={() => loginWithProvider("google")}
          />
          <AuthButton
            icon={<Icon icon="logos:github-icon" width={20} />}
            label="Mit GitHub"
            disabled={loading}
            onClick={() => loginWithProvider("github")}
          />
          <AuthButton
            icon={<Mail size={20} />}
            label="Per E-Mail (Kommt bald...)"
            disabled
            onClick={loginWithEmail}
          />
        </div>
      </div>
    </div>
  )
}

function AuthButton({ icon, label, disabled, onClick }) {
  return (
    <button
      style={{ ...styles.button, opacity: disabled ? 0.6 : 1 }}
      onClick={onClick}
      disabled={disabled}
    >
      <span style={styles.buttonContent}>
        {icon}
        {label}
      </span>
    </button>
  )
}

const styles = {
  page: {
    height: "100vh",
    width: "100vw",
    overflow: "hidden",
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
    color: "#e2e8f0",
    backdropFilter: "blur(6px)",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  card: {
    backgroundColor: "rgba(15,23,42,0.85)",
    backdropFilter: "blur(8px)",
    borderRadius: "16px",
    padding: "40px",
    color: "#e2e8f0",
    width: "100%",
    maxWidth: "380px",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  title: {
    fontSize: "2.5rem",
    fontWeight: 700,
    textAlign: "center",
  },
  subtitle: {
    fontSize: "1.2rem",
    color: "#94a3b8",
    textAlign: "center",
    marginBottom: "20px",
  },
  buttons: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  button: {
    background: "#1e293b",
    color: "#e2e8f0",
    border: "none",
    borderRadius: "8px",
    padding: "12px",
    cursor: "pointer",
    transition: "transform 0.2s, background 0.2s",
  },
  buttonContent: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
  },
}
