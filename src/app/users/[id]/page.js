//still needs ability to save data to actual table.Dillon//

// TODO redo page to display other users profiles
// doesn't need to be a client
"use client";
import React, { useState } from "react";
import "../../../styles/Profile.css";

export default function Users({ params }) {
  const { id } = React.use(params);

  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    alert(`Saved profile for user ${id}: Username: ${username} Bio: ${bio}`);
  }

  return (
    <>
      <main>
        <div className="profile-top">
          <div className="profile-left">
            <div className="profile-pic-placeholder">pic placeholder</div>
            <h1>Profile Page for {id}</h1>
          </div>

          {/* <form onSubmit={handleSubmit}>
            <label>
              Username:
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </label>

            <label>
              Bio:
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                required
              />
            </label>

            <button type="submit">Save</button>
          </form> */}
        </div>
      </main>
    </>
  );
}
