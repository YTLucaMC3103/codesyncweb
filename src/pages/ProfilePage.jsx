import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';

function ProfilePage({ user }) {
  const [name, setName] = useState(user?.displayName || '');
  const [editingName, setEditingName] = useState(false);
  const [profilePic, setProfilePic] = useState(user?.photoURL || '');
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  useEffect(() => {
    document.title = `Profil - CodeSync`
  }, [])

  const saveName = () => {
    setEditingName(false);
    // Optional: Firebase update für displayName hier einfügen
  };

  const triggerFileSelect = () => {
    fileInputRef.current.click();
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfilePic(reader.result);
        // Optional: hier den Upload ins Firebase Storage und Update des Users hinzufügen
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="profile-page">
      <div className="navbar"> {/* Hier kommt deine Navbar */} </div>
      <div className="sidebar"> {/* Hier kommt deine Sidebar */} </div>

      <div className="profile-container">
        <div className="profile-header">
          <div
            className="profile-image"
            onClick={triggerFileSelect}
            title="Profilbild ändern"
          >
            <img
              src={profilePic}
              alt="Profil"
              className="profile-img"
            />
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={handleImageUpload}
            />
          </div>

          <div className="profile-name">
            {editingName ? (
              <input
                value={name}
                onChange={handleNameChange}
                onBlur={saveName}
                onKeyDown={(e) => e.key === 'Enter' && saveName()}
                autoFocus
                className="name-input"
              />
            ) : (
              <>
                <h1 className="user-name">{name}</h1>
                <button
                  onClick={() => setEditingName(true)}
                  className="edit-name-button"
                >
                  ✏️
                </button>
              </>
            )}
          </div>
        </div>

        <div className="profile-details">
          {/* Hier kannst du zusätzliche Details über den Benutzer hinzufügen */}
          <p>Email: {user?.email}</p>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
