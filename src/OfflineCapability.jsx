import React, { useState, useEffect } from "react";

export default function OfflineCapability() {
  const [offlineData, setOfflineData] = useState([]);

  useEffect(() => {
    // Mock: Load cached results (simulate offline)
    const mockData = [
      { type: "Disease Analysis", result: "Leaf Blight", date: "2025-08-20" },
      { type: "Weather Alert", result: "Heavy Rain Expected", date: "2025-08-19" },
      { type: "Analytics Report", result: "Wheat Yield 25 tons", date: "2025-08-18" },
    ];
    setOfflineData(mockData);
  }, []);

  const downloadPDF = (item) => {
    // Mock PDF download
    alert(`Downloading PDF for ${item.type}: ${item.result}`);
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Offline Capability</h1>
      <p className="mb-6 text-gray-700">
        Access your important data even without internet.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {offlineData.map((item, idx) => (
          <div key={idx} className="bg-white p-4 rounded shadow">
            <h2 className="font-semibold text-xl mb-2">{item.type}</h2>
            <p className="text-gray-600 mb-2">{item.result}</p>
            <p className="text-sm text-gray-400 mb-4">{item.date}</p>
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
              onClick={() => downloadPDF(item)}
            >
              Download PDF
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
