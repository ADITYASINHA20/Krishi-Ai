import React from 'react'

const About = () => {
  return (
    <section
      id="about"
      className="py-20 bg-gradient-to-r from-green-100 to-green-50 text-center"
    >
      <h2 className="text-5xl font-extrabold mb-10 text-green-700 drop-shadow-sm">
        ℹ About Us
      </h2>
      <div className="max-w-5xl mx-auto text-lg text-gray-700 leading-relaxed space-y-6">
        <p>
          🌱 We are building an{" "}
          <span className="font-semibold text-green-700">
            AI-Driven Crop Disease Prediction and Management System
          </span>{" "}
          to empower farmers with early disease detection, real-time weather
          insights, and actionable solutions.
        </p>
        <p>
          🚜 With cutting-edge AI, weather APIs, and soil analysis, our platform
          helps farmers make{" "}
          <span className="font-semibold text-green-700">
            data-driven decisions
          </span>{" "}
          that improve yield, reduce crop losses, and promote sustainable
          farming practices.
        </p>
        <p>
          🌍 Our mission:{" "}
          <span className="italic text-green-800">
            “Technology for Farmers, Growth for Future.”
          </span>
        </p>
      </div>
    </section>
  )
}

export default About
