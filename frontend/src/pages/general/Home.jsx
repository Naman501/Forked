// import React, { use, useEffect, useRef, useState } from 'react'
// import './Home.css'
// import { Link ,useNavigate} from 'react-router-dom'
// import axios from 'axios';


// const reels = [
//   {
//     id: 1,
//     src: "https://ik.imagekit.io/xf6f3qmnf/95da2b61-75da-4c9e-b10c-00f496fbe2b4_tIzuja5RJ",
//     desc: "Fresh biryani from the best local kitchens — aromatic, spicy, and made to order.",
//     label: "Biryani Corner",
//     storeUrl: '/create-food',
//   },
//   {
//     id: 2,
//     src: "https://ik.imagekit.io/xf6f3qmnf/9d628cbf-995f-4cd5-a639-2d403a106aba_0VT7ebReo",
//     desc: "Handmade sandwiches with fresh veggies and house sauces. Quick bites, big taste.",
//     label: "Sandwich Hub",
//     storeUrl: '/create-food',
//   },
//   {
//     id: 3,
//     src: "https://ik.imagekit.io/xf6f3qmnf/9ab1725c-8a15-422c-9f45-50d8322c9a43_YnrI0heHR",
//     desc: "Creamy desserts and cold shakes — perfect after a long day. Try our seasonal specials.",
//     label: "Sweet Tooth",
//     storeUrl: '/create-food',
//   },
//     {
//     id: 4,
//     src: "https://ik.imagekit.io/xf6f3qmnf/3d8edb1e-d238-418e-8fed-5bed7d154d7e_7f8K6j-6L",
//     desc: "Creamy desserts and cold shakes — perfect after a long day. Try our seasonal specials.",
//     label: "Half fry",
//     storeUrl: '/create-food',
//   },
// ];
// const Home = () => {

//   const [videos, setVideos] = useState(reels);
//   const videoRefs=useRef(new Map());
//   const containerRef=useRef(null);
  

// useEffect(() => {
//     axios.get('http://localhost:3000/api/some-endpoint', { withCredentials: true })
//       .then(response => {
//         console.log('Data fetched successfully:', response.data);
//         setVideos(response.data);
//       })
//       .catch(error => {
//         console.error('Error fetching data:', error);
//       });
//   }, []);

// const setVideoRef = (id) => (el) => {
// if (!el) {
// videoRefs.current.delete(id)
// return
// }
// videoRefs.current.set(id, el)
// }


//   return (
//     <>
//     {/* <h1>Food Reels</h1> */}
//     <div className="reels" role="list">
//       {reels.map((r) => (
//         <section key={r.id} className="reel" role="listitem">
//           <video
//             src={r.src}
//             muted
//             autoPlay
//             loop
//             playsInline
//             preload="metadata"
//           />

//           <div className="overlay">
//             <p className="desc">{r.desc}</p>
//             <Link className="visit-store" to="/create-food">Visit store</Link>
//           </div>
//         </section>
//       ))}
//     </div>
//     </>
//   )
// }

// export default Home



import React, { useEffect, useRef, useState } from 'react';
import './Home.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const fallbackReels = [
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
    id: 4,
    src: "https://ik.imagekit.io/xf6f3qmnf/3d8edb1e-d238-418e-8fed-5bed7d154d7e_7f8K6j-6L",
    desc: "Egg specials, crispy and hot — the perfect evening snack!",
    label: "Half Fry",
    storeUrl: '/create-food',
  },
];

const Home = () => {
  const [videos, setVideos] = useState(fallbackReels);
  const videoRefs = useRef(new Map());
  const containerRef = useRef(null);

  // ✅ Fetch videos from API
  useEffect(() => {
    axios
      .get('http://localhost:3000/api/food', { withCredentials: true })
      .then(response => {
        if (Array.isArray(response.data) && response.data.length > 0) {
          setVideos(response.data);
        } else {
          console.warn('Empty data, using fallback reels');
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  // ✅ Handle video auto-play & pause on scroll (like Reels)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          const video = entry.target;
          if (entry.isIntersecting && entry.intersectionRatio >= 0.75) {
            video.play().catch(err => console.warn('Autoplay blocked', err));
          } else {
            video.pause();
          }
        });
      },
      {
        threshold: [0.75], // Video must be 75% visible
      }
    );

    // Observe all videos
    videoRefs.current.forEach((video) => observer.observe(video));

    // Cleanup observer on unmount
    return () => {
      videoRefs.current.forEach((video) => observer.unobserve(video));
    };
  }, [videos]);

  // ✅ Ref setter
  const setVideoRef = (id) => (el) => {
    if (!el) {
      videoRefs.current.delete(id);
    } else {
      videoRefs.current.set(id, el);
    }
  };

  return (
    <div className="reels" ref={containerRef} role="list">
      {videos.map((r) => (
        <section key={r.id} className="reel" role="listitem">
          <video
            ref={setVideoRef(r.id)}
            src={r.src}
            muted
            playsInline
            preload="metadata"
            loop
          />
          <div className="overlay">
            <p className="desc">{r.desc}</p>
            <Link className="visit-store" to={r.storeUrl}>
              Visit Store
            </Link>
          </div>
        </section>
      ))}
    </div>
  );
};

export default Home;
