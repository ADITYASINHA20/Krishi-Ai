import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const cities = [
  { name: "Mumbai", lat: 19.076, lon: 72.8777 },
  { name: "Bengaluru", lat: 12.9716, lon: 77.5946 },
  { name: "Kolkata", lat: 22.5726, lon: 88.3639 },
  { name: "Delhi", lat: 28.6139, lon: 77.209 },
  { name: "Chennai", lat: 13.0827, lon: 80.2707 },
  { name: "Hyderabad", lat: 17.385, lon: 78.4867 },
  { name: "Patna", lat: 25.5941, lon: 85.1376 },
];

const soilTypes = ["Alluvial", "Black", "Red", "Laterite", "Sandy", "Rocky"];

// Function to decide crop based on soil & weather
const getSuitableCrop = (soil, avgTemp, avgPrecip) => {
  if (soil === "Alluvial") {
    if (avgTemp >= 20 && avgTemp <= 35 && avgPrecip >= 10) return "Rice 🌾";
    return "Wheat 🌿";
  }
  if (soil === "Black") {
    if (avgTemp > 25 && avgPrecip > 5) return "Cotton 👕";
    return "Soybean 🌱";
  }
  if (soil === "Red") {
    return avgTemp > 20 ? "Groundnut 🥜" : "Millets 🌾";
  }
  if (soil === "Laterite") {
    return avgPrecip > 15 ? "Tea 🍵" : "Cashew 🌰";
  }
  if (soil === "Sandy") {
    return avgTemp > 30 ? "Watermelon 🍉" : "Pulses 🌿";
  }
  if (soil === "Rocky") {
    return "Millets 🌾";
  }
  return "Mixed Crops 🌱";
};

const getWeatherIcon = (precipitation) => {
  if (precipitation > 20) return "🌧️";
  if (precipitation > 5) return "⛅";
  return "☀️";
};

export default function AIWeather() {
  const [city, setCity] = useState(cities[0].name);
  const [soil, setSoil] = useState(soilTypes[0]);
  const [date, setDate] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState(null);

  const fetchWeather = async (selectedCity) => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${selectedCity.lat}&longitude=${selectedCity.lon}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=auto`
      );
      const data = await res.json();
      setWeatherData(data);

      if (date) {
        const idx = data.daily.time.findIndex((d) => d === date);
        if (idx !== -1) {
          const avgTemp =
            (data.daily.temperature_2m_max[idx] +
              data.daily.temperature_2m_min[idx]) / 2;
          const avgPrecip = data.daily.precipitation_sum[idx];

          let recommendation = "✅ Weather conditions suitable for crops.";
          if (avgTemp > 35 && avgPrecip < 2) {
            recommendation =
              "⚠️ High temperature & low rainfall. Irrigation needed.";
          } else if (avgPrecip > 20) {
            recommendation = "⚠️ Heavy rainfall expected. Ensure drainage.";
          }

          // Get suitable crop
          const crop = getSuitableCrop(soil, avgTemp, avgPrecip);

          setSummary({
            city: selectedCity.name,
            soil,
            date,
            avgTemp: avgTemp.toFixed(1),
            avgPrecip: avgPrecip.toFixed(1),
            recommendation,
            crop,
          });
        }
      }
    } catch (error) {
      console.error("Error fetching weather:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const selectedCity = cities.find((c) => c.name === city);
    if (selectedCity) fetchWeather(selectedCity);
  }, [city, soil, date]);

  // Professional PDF Report
  const downloadPDF = () => {
    if (!summary) return;
    const doc = new jsPDF();

    // Title
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.text("Crop Advisory Report", 105, 20, { align: "center" });

    // Border
    doc.setDrawColor(0);
    doc.setLineWidth(0.5);
    doc.rect(10, 10, 190, 277);

    // General Info
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text("📍 General Information", 20, 40);
    doc.line(20, 42, 190, 42);
    doc.text(`City: ${summary.city}`, 25, 55);
    doc.text(`Soil Type: ${summary.soil}`, 25, 65);
    doc.text(`Date: ${summary.date}`, 25, 75);

    // Weather Table
    doc.text("🌦️ Weather Overview", 20, 95);
    doc.line(20, 97, 190, 97);

    autoTable(doc, {
      startY: 105,
      head: [["Parameter", "Value"]],
      body: [
        ["Average Temperature", `${summary.avgTemp} °C`],
        ["Rainfall", `${summary.avgPrecip} mm`],
        ["Suitable Crop", summary.crop],
      ],
      theme: "grid",
      headStyles: { fillColor: [56, 142, 60] },
      styles: { halign: "center" },
    });

    // Recommendation
    let finalY = doc.lastAutoTable.finalY + 20;
    doc.text("🌱 Crop Recommendation", 20, finalY);
    doc.line(20, finalY + 2, 190, finalY + 2);
    doc.setFont("helvetica", "bold");
    doc.text(`${summary.recommendation}`, 25, finalY + 15);

    // Signature Placeholder
    doc.setFont("helvetica", "italic");
    doc.text("__________________________", 140, 260);
    doc.text("Authorized Officer", 155, 270);

    // Footer
    doc.setFontSize(10);
    doc.text("Generated by Soil + Weather Crop Advisory System", 105, 285, {
      align: "center",
    });

    doc.save(`${summary.city}_Crop_Report.pdf`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-300 via-green-200 to-white p-8 flex flex-col items-center pt-20">
      {/* Title */}
      <motion.h1
        className="text-4xl font-extrabold mb-6 text-white drop-shadow-lg text-center"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        🌦️ Soil + Weather Crop Advisory
      </motion.h1>

      {/* Selectors */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <select
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="border px-4 py-2 rounded shadow text-center"
        >
          {cities.map((c) => (
            <option key={c.name} value={c.name}>
              {c.name}
            </option>
          ))}
        </select>

        <select
          value={soil}
          onChange={(e) => setSoil(e.target.value)}
          className="border px-4 py-2 rounded shadow text-center"
        >
          {soilTypes.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border px-4 py-2 rounded shadow text-center"
        />
      </div>

      {/* Loader */}
      {loading && <p className="text-green-800 font-semibold">Fetching data...</p>}

      {/* Forecast Cards */}
      {weatherData && weatherData.daily && (
        <div className="flex space-x-4 overflow-x-auto py-4 px-2">
          {weatherData.daily.time.map((d, idx) => (
            <motion.div
              key={d}
              className="bg-white/80 backdrop-blur-md rounded-xl p-4 min-w-[180px] shadow-lg 
                         flex flex-col items-center text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <p className="font-bold mb-2">{d}</p>
              <p className="text-4xl mb-2">
                {getWeatherIcon(weatherData.daily.precipitation_sum[idx])}
              </p>
              <p>
                {weatherData.daily.temperature_2m_min[idx]}°C -{" "}
                {weatherData.daily.temperature_2m_max[idx]}°C
              </p>
              <p>Precip: {weatherData.daily.precipitation_sum[idx]} mm</p>
            </motion.div>
          ))}
        </div>
      )}

      {/* Summary Report */}
      {summary && (
        <motion.div
          className="mt-6 bg-white shadow-xl rounded-xl p-6 w-full md:w-2/3 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-xl font-bold mb-4">📑 Report Summary</h2>
          <p><b>City:</b> {summary.city}</p>
          <p><b>Soil Type:</b> {summary.soil}</p>
          <p><b>Date:</b> {summary.date}</p>
          <p><b>Avg Temp:</b> {summary.avgTemp} °C</p>
          <p><b>Rainfall:</b> {summary.avgPrecip} mm</p>
          <p><b>Suitable Crop:</b> {summary.crop}</p>
          <p className="mt-3 font-semibold">{summary.recommendation}</p>

          <button
            onClick={downloadPDF}
            className="mt-4 px-6 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition"
          >
            📥 Download Report
          </button>
        </motion.div>
      )}
    </div>
  );
}
