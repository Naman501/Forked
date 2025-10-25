import React, { useEffect } from "react";
import "../../styles/variables.css";
import "../../styles/shared.css";
import axios from "axios";
// import { useNavigate } from "react-router-dom";
const reels = [
  {
    id: 1,
    src: "https://ik.imagekit.io/xf6f3qmnf/95da2b61-75da-4c9e-b10c-00f496fbe2b4_tIzuja5RJ",
    desc: "Fresh biryani from the best local kitchens — aromatic, spicy, and made to order.",
    label: "Biryani Corner",
    storeUrl: '/create-food',
  },
  {
    id: 2,
    src: "https://ik.imagekit.io/xf6f3qmnf/9d628cbf-995f-4cd5-a639-2d403a106aba_0VT7ebReo",
    desc: "Handmade sandwiches with fresh veggies and house sauces. Quick bites, big taste.",
    label: "Sandwich Hub",
    storeUrl: '/create-food',
  },
  {
    id: 3,
    src: "https://ik.imagekit.io/xf6f3qmnf/9ab1725c-8a15-422c-9f45-50d8322c9a43_YnrI0heHR",
    desc: "Creamy desserts and cold shakes — perfect after a long day. Try our seasonal specials.",
    label: "Sweet Tooth",
    storeUrl: '/create-food',
  },
    {
    id: 3,
    src: "https://ik.imagekit.io/xf6f3qmnf/3d8edb1e-d238-418e-8fed-5bed7d154d7e_7f8K6j-6L",
    desc: "Creamy desserts and cold shakes — perfect after a long day. Try our seasonal specials.",
    label: "Half fry",
    storeUrl: '/create-food',
  },
];

function Home() {
  // Try to autoplay videos silently (some browsers block without interaction)
  useEffect(() => {
    const videos = document.querySelectorAll("video");
    videos.forEach((video) => {
      video.play().catch(() => {
        console.warn("Autoplay prevented — user interaction needed.");
      });
    });
  }, []);

  useEffect(() => {
    // Example API call to check authentication status
    axios.get('http://localhost:3000/api/food', { withCredentials: true })
      .then((response) => {
        console.log("Food data:", response.food);
      })
      .catch((error) => {
        console.error("Error fetching food data:", error);
      });
  }, []);

  return (
    <main className="reels" aria-label="Food Reels Feed">
      <h1>REELS</h1>
      {reels.map((r) => (
        <section className="reel" key={r._id}>
          {/* Background video */}
          <video
            src={r.src}
            muted
            // autoPlay
            loop
            playsInline
            preload="metadata"
            aria-label={`${r.label} video`}
          />

          {/* Store label at top-left */}
          <div className="meta">{r.label}</div>

          {/* Overlay (desc + button) */}
          <div className="overlay">
            <p className="desc">{r.desc}</p>
            <button className="visit-store" type="button">
              Visit store
            </button>
          </div>
        </section>
      ))}
    </main>
  );
}

export default Home;
