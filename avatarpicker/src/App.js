import { setAvatar } from './utils.js';
import { AVATARS } from './constants.js';
import { useState, useEffect, useRef } from 'react';
import './App.css'
export default function App() {
  const [avatar, setavatar] = useState(AVATARS[0]);
  const [avatardata, setavatardata] = useState(AVATARS);
  const [opendialog, setopendialog] = useState(false);
  const dialogRef = useRef(null); // Reference to the dialog

  // Handle click outside the dialog to close it
  useEffect(() => {
    function handleClickOutside(event) {
      if (dialogRef.current && !dialogRef.current.contains(event.target)) {
        setopendialog(false); // Close the dialog
      }
    }

    if (opendialog) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [opendialog]);

  function openselector() {
    setopendialog(!opendialog);
  }

  function changeavatar(id) {
    async function settingavatar(id) {
      let wrapperEle = document.getElementById('mainavatar');
      wrapperEle.classList.add('loading'); // Add the rotating border class

      try {
        let res = await setAvatar();
        console.log(res);
        setavatar(AVATARS[id - 1]); // Update avatar after the API call
      } catch (error) {
        console.error('Error changing avatar:', error);
      } finally {
        wrapperEle.classList.remove('loading'); // Remove the rotating border class
      }
    }

    settingavatar(id);
  }

  return (
    <div className="body">
      <div className="container">
        <div className="avatar-wrapper" id="mainavatar" onClick={openselector}>
          <div className="avatar">
            <img
              className="imgavatar"
              src={avatar.source}
              alt="Current Avatar"
            />
          </div>
        </div>
        {opendialog && (
          <div className="avatarpicker" ref={dialogRef}>
          <div className="tooltip"></div>
            {avatardata.map((ava) => (
              <div
                key={ava.id}
                className="avatar"
                onClick={() => changeavatar(ava.id)}
              >
                <img
                  className="imgavatar"
                  src={ava.source}
                  alt={`Avatar ${ava.id}`}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
