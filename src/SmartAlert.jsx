import React, { useState } from "react";
import { FaLeaf, FaFlask, FaSeedling, FaMapMarkerAlt, FaCloudSun } from "react-icons/fa";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { useTranslation } from "react-i18next";
export default function NpkRecommendation() {
  const [location, setLocation] = useState("");
  const [soilType, setSoilType] = useState("");
  const [weather, setWeather] = useState("");
  const [recommendation, setRecommendation] = useState(null);

  // Mock AI/ML logic for recommendation
  const generateRecommendation = () => {
    let nitrogen, phosphorus, potassium;

    if (soilType === "Loamy" && weather === "Rainy") {
      nitrogen = "120 kg/ha";
      phosphorus = "60 kg/ha";
      potassium = "40 kg/ha";
    } else if (soilType === "Clay" && weather === "Dry") {
      nitrogen = "100 kg/ha";
      phosphorus = "50 kg/ha";
      potassium = "70 kg/ha";
    } else {
      nitrogen = "110 kg/ha";
      phosphorus = "55 kg/ha";
      potassium = "50 kg/ha";
    }

    setRecommendation({
      location,
      soilType,
      weather,
      nitrogen,
      phosphorus,
      potassium,
    });
  };

  // Download PDF
  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("🌱 AI-based NPK Recommendation Report", 20, 20);

    autoTable(doc, {
      startY: 40,
      head: [["Parameter", "Value"]],
      body: [
        ["Location", recommendation.location],
        ["Soil Type", recommendation.soilType],
        ["Weather", recommendation.weather],
        ["Nitrogen (N)", recommendation.nitrogen],
        ["Phosphorus (P)", recommendation.phosphorus],
        ["Potassium (K)", recommendation.potassium],
      ],
      theme: "grid",
      headStyles: { fillColor: [56, 142, 60] },
    });

    doc.save("NPK_Report.pdf");
  };

  return (
    <section className="max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow mt-10 border border-green-200">
      <h2 className="text-2xl font-bold mb-6 text-green-700 flex items-center gap-2">
        <FaFlask className="text-green-600" /> AI-based NPK Recommendation
      </h2>

      {/* Input Form */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block text-sm font-semibold mb-2">Farm Location</label>
          <div className="flex items-center border rounded-lg px-3">
            <FaMapMarkerAlt className="text-red-500 mr-2" />
            <input
              type="text"
              className="w-full p-2 outline-none"
              placeholder="Enter location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2">Soil Type</label>
          <select
            className="w-full p-2 border rounded-lg"
            value={soilType}
            onChange={(e) => setSoilType(e.target.value)}
          >
            <option value="">Select Soil</option>
            <option value="Loamy">Loamy</option>
            <option value="Clay">Clay</option>
            <option value="Sandy">Sandy</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold mb-2">Weather</label>
          <div className="flex items-center border rounded-lg px-3">
            <FaCloudSun className="text-yellow-500 mr-2" />
            <select
              className="w-full p-2 outline-none"
              value={weather}
              onChange={(e) => setWeather(e.target.value)}
            >
              <option value="">Select Weather</option>
              <option value="Rainy">Rainy</option>
              <option value="Dry">Dry</option>
              <option value="Moderate">Moderate</option>
            </select>
          </div>
        </div>
      </div>

      <button
        onClick={generateRecommendation}
        className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
      >
        Generate Recommendation
      </button>

      {/* Show Recommendation */}
      {recommendation && (
        <div className="mt-6 p-4 border rounded-lg bg-green-50">
          <h3 className="text-lg font-semibold text-green-700 mb-2">Recommendation:</h3>
          <p><b>Location:</b> {recommendation.location}</p>
          <p><b>Soil Type:</b> {recommendation.soilType}</p>
          <p><b>Weather:</b> {recommendation.weather}</p>
          <p><b>Nitrogen (N):</b> {recommendation.nitrogen}</p>
          <p><b>Phosphorus (P):</b> {recommendation.phosphorus}</p>
          <p><b>Potassium (K):</b> {recommendation.potassium}</p>

          <button
            onClick={downloadPDF}
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Download Report (PDF)
          </button>
        </div>
      )}
    </section>
  );
} 