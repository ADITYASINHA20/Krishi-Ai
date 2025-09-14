
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import farmer1 from "./img/Krishi.jpg";
import farmer2 from "./img/farmer2.jpg";
import farmer3 from "./img/farmer.jpg";
 import farmerVideo from "./videos/farmer-video.mp4";
import { useTranslation } from "react-i18next";
export default function HeroSection() {
  const [showVideo, setShowVideo] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const { t } = useTranslation();
  const images = [farmer1, farmer2, farmer3];

  // Image auto-slide every 3 sec
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section
      className="bg-cover bg-fixed min-h-screen flex flex-col justify-center items-center text-center text-white px-6 transition-all duration-1000"
      style={{ backgroundImage: `url(${images[currentImage]})` }} // ✅ FIXED
    >
      {/* Hero Section */}
      <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">
        AI-Driven Crop Disease Detection
      </h1>
      <p className="text-lg md:text-xl mb-6">
        Early detection. Timely action. Healthier yields.
      </p>

      <div className="space-x-4 mb-6">
        <Link to="/dashboard">
          <button className="bg-green-600 px-6 py-3 rounded-md text-white hover:bg-purple-700 transition">
            Try Free
          </button>
        </Link>

        <button
          onClick={() => setShowVideo(true)}
          className="bg-green-600 px-6 py-3 rounded-md text-white hover:bg-purple-700 transition"
        >
          Watch Demo
        </button>
      </div>

      {/* Fullscreen Video */}
      {showVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-95 flex justify-center items-center z-50">
          <video controls autoPlay className="w-full h-full object-contain">
            <source src={farmerVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          <button
            onClick={() => setShowVideo(false)}
            className="absolute top-5 right-5 bg-red-600 px-4 py-2 rounded-md text-white hover:bg-red-800 transition"
          >
            ✕ Close
          </button>
        </div>
      )}
    </section>
  );
}
