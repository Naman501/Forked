import React, { useState, useEffect } from "react";
import "./Profile.css";
import axios from "axios";
import { useParams } from "react-router-dom";

const Profile = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);

  const videos = Array.from({ length: 9 }, (_, i) => ({ id: i + 1 }));

  // useEffect(() => {
  //   if (!id) return; // prevent request if id is undefined

  //   const fetchProfile =async () => {
  //     try {
  //       const response = await axios.get(
  //         `http://localhost:3000/api/food-partner/${id}`,
  //         { withCredentials: true }
  //       );
  //       setProfile(response.data.foodPartner);
  //     } catch (error) {
  //       console.error("Error fetching profile:", error);
  //     }
  //   };
  //   fetchProfile();
  // }, [id]);

 useEffect(() => {
      const fetchProfile = async () => {
          await axios.get(`http://localhost:3000/api/food-partner/${id}`, { withCredentials: true })
              .then(response => {
                  setProfile(response.data.foodPartner)
              })
      };
      fetchProfile();
  }, [id]);


  return (
    <div className="profile-page">
      <div className="profile-card">
        <div className="card-top">
          <div className="avatar">
            {profile?.name ? profile.name[0].toUpperCase() : "?"}
          </div>

          <div className="business">
            <h3 className="business-name">{profile?.name}</h3>
            <p className="business-address">{profile?.address }</p>
          </div>

          <div className="meta-buttons">
            <button className="pill">Business Page</button>
            <button className="pill secondary">Address</button>
          </div>
        </div>

        <div className="stats">
          <div className="stat">
            <div className="label">Total Meals</div>
            <div className="value">{profile?.totalMeals}</div>
          </div>

          <div className="stat">
            <div className="label">Customers Served</div>
            <div className="value">{profile?.customerServed}</div>
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
  );
};

export default Profile;

