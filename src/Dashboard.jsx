import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import {
  FaLeaf,
  FaCloudRain,
  FaExclamationTriangle,
  FaSignal,
  FaChartLine,
  FaBell,
} from "react-icons/fa";

export default function DashboardSection() {
  const navigate = useNavigate();

  const features = [
    {
      icon: <FaLeaf className="text-4xl text-green-600 mb-4 mx-auto" />,
      title: "AI Crop Disease Detection",
      description: "Detect crop diseases early and prevent outbreaks using AI.",
      action: () => navigate("/ai-disease"),
      status: "Live",
    },
    {
      icon: <FaCloudRain className="text-4xl text-blue-500 mb-4 mx-auto" />,
      title: "AI Weather +Soil Prediction",
      description:
        "Get real-time Data to check which crop is Suitable",
      action: () => navigate("/ai-weather"),
      status: "Live",
    },
    {
      icon: <FaExclamationTriangle className="text-4xl text-red-500 mb-4 mx-auto" />,
      title: "NPk Recommondation",
      description: "Check Npk Value and protect your crops.",
      action: () => navigate("/smart-alerts"),
      
    },
    {
      icon: <FaSignal className="text-4xl text-yellow-500 mb-4 mx-auto" />,
      title: "Market Value",
      description: "Check current mandi prices for crops.",
      action: () => navigate("/market-value"),
      status: "Live",
    },
    {
      icon: <FaChartLine className="text-4xl text-purple-500 mb-4 mx-auto" />,
      title: "Analytics Dashboard",
      description: "Visualize crop health, yield, and climate data.",
      action: () => navigate("/analytics"),
      status: "Live",
    },
    {
      icon: <FaBell className="text-4xl text-pink-500 mb-4 mx-auto" />,
      title: "Government Scheme",
      description: "Access essential schemes and benefits.",
      action: () => navigate("/government-scheme"),
      status: "Live",
    },
  ];

  return (
    <section className="py-20 px-4 md:px-8 bg-gray-100" id="dashboard">
      {/* Header */}
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Dashboard Features</h2>
        <p className="text-lg text-gray-700">
          All-in-one farmer dashboard with AI, Analytics, and Npk Recommondation.
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {features.map((feature, index) => (
          <div
            key={index}
            onClick={feature.action}
            className="relative bg-gradient-to-br from-white to-gray-50 p-6 rounded-2xl shadow-lg hover:shadow-2xl cursor-pointer transition transform hover:-translate-y-2 hover:scale-105"
          >
            {/* Status Badge */}
            <span
              className={`absolute top-4 right-4 px-2 py-1 text-xs rounded-full font-semibold ${
                feature.status === "Live"
                  ? "bg-green-500 text-white"
                  : "bg-gray-400 text-white"
              }`}
            >
              {feature.status}
            </span>

            {feature.icon}
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
