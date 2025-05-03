import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAUG_Wz9NenTMfknkw0JQgTthzneDbEhy4",
  authDomain: "codesync-f1bdc.firebaseapp.com",
  projectId: "codesync-f1bdc",
  storageBucket: "codesync-f1bdc.firebasestorage.app",
  messagingSenderId: "730673737983",
  appId: "1:730673737983:web:07d75e42a24283a04d9cca",
  measurementId: "G-C6EQ8FKZBX"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const analytics = getAnalytics(app);

export { auth, provider, signInWithPopup, signOut }