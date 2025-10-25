import React from 'react'
import './Profile.css'

const Profile = () => {
  const videos = new Array(9).fill(0).map((_, i) => ({ id: i + 1 }))

  return (
    <div className="profile-page">
      <div className="profile-card">
        <div className="card-top">
          <div className="avatar">BP</div>

          <div className="business">
            <h3 className="business-name">Business Name</h3>
            <p className="business-address">Location / Address</p>
          </div>

          <div className="meta-buttons">
            <button className="pill">Business page</button>
            <button className="pill secondary">Address</button>
          </div>
        </div>

        <div className="stats">
          <div className="stat">
            <div className="label">total meals</div>
            <div className="value">43</div>
          </div>

          <div className="stat">
            <div className="label">customer serve</div>
            <div className="value">15K</div>
          </div>
        </div>

        <div className="divider" />

        <div className="video-grid">
          {videos.map((v) => (
            <div className="video-item" key={v.id}>
              video
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Profile