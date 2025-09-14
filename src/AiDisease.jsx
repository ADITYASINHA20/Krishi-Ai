import React, { useState, useEffect, useRef } from "react";
import * as tf from "@tensorflow/tfjs";
import { jsPDF } from "jspdf";

export default function AiDisease() {
  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [model, setModel] = useState(null);
  const [loadingModel, setLoadingModel] = useState(true);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);

  const [cameraOpen, setCameraOpen] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  // Load TF.js model
  useEffect(() => {
    const loadModel = async () => {
      try {
        const loadedModel = await tf.loadLayersModel("/model/model.json");
        setModel(loadedModel);
        console.log("Model loaded ✅");
      } catch (err) {
        console.error("Failed to load model:", err);
      } finally {
        setLoadingModel(false);
      }
    };
    loadModel();
  }, []);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = (ev) => setImagePreview(ev.target.result);
      reader.readAsDataURL(selectedFile);
    }
    setResult(null);
  };

  // Camera Access
  const openCamera = async () => {
    setCameraOpen(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Camera access denied:", err);
      alert("Camera access is required for live capture.");
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      canvasRef.current.width = videoRef.current.videoWidth;
      canvasRef.current.height = videoRef.current.videoHeight;
      ctx.drawImage(videoRef.current, 0, 0);
      const dataUrl = canvasRef.current.toDataURL("image/png");
      setImagePreview(dataUrl);

      // Convert dataURL to File object
      fetch(dataUrl)
        .then((res) => res.blob())
        .then((blob) => {
          const file = new File([blob], "captured.png", { type: "image/png" });
          setFile(file);
        });

      setCameraOpen(false);
    }
  };

  const preprocessImage = async (file) => {
    const img = new Image();
    img.src = URL.createObjectURL(file);
    await new Promise((resolve) => {
      img.onload = resolve;
    });

    const tensor = tf.browser
      .fromPixels(img)
      .resizeNearestNeighbor([224, 224])
      .toFloat()
      .div(tf.scalar(255.0))
      .expandDims();

    return tensor;
  };

  const handleAnalyze = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please upload or capture an image!");
    if (!model) return alert("Model is loading. Please wait...");

    setAnalyzing(true);

    try {
      const tensor = await preprocessImage(file);
      const prediction = model.predict(tensor);
      const data = await prediction.array();
      const predictions = data[0];

      const classes = [
        "Late Blight",
        "Early Blight",
        "Powdery Mildew",
        "Downy Mildew",
        "Leaf Rust",
        "Stem Rust",
        "Healthy Crop",
      ];

      const maxIndex = predictions.indexOf(Math.max(...predictions));

      setResult({
        disease: classes[maxIndex],
        confidence: (predictions[maxIndex] * 100).toFixed(2),
        severity: classes[maxIndex].includes("Healthy") ? "low" : "high",
        recommendations: classes[maxIndex].includes("Healthy")
          ? ["Maintain current good practices"]
          : ["Follow recommended crop management steps"],
      });
    } catch (err) {
      console.error(err);
      alert("Failed to analyze image.");
    } finally {
      setAnalyzing(false);
    }
  };

  const downloadPDF = () => {
    if (!result) return;
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("🌾 Crop Disease Analysis Report", 20, 20);
    doc.setFontSize(14);
    doc.text(`Disease: ${result.disease}`, 20, 40);
    doc.text(`Confidence: ${result.confidence}%`, 20, 50);
    doc.text(`Severity: ${result.severity}`, 20, 60);

    doc.text("Recommendations:", 20, 75);
    result.recommendations.forEach((rec, idx) => {
      doc.text(`${idx + 1}. ${rec}`, 25, 85 + idx * 10);
    });

    doc.save("analysis_report.pdf");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-green-100 to-green-50 p-6">
      <h2 className="text-3xl font-bold text-green-700 mb-6">
        🌾 AI Disease Detection
      </h2>

      {/* Upload / Capture Form */}
      <form
        onSubmit={handleAnalyze}
        className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 space-y-6"
      >
        {/* File Upload */}
        <label
          htmlFor="file-upload"
          className="flex flex-col items-center justify-center border-2 border-dashed border-green-400 rounded-xl p-10 cursor-pointer hover:bg-green-50 transition"
        >
          <p className="text-green-700 font-medium">
            {file ? file.name : "Click to upload or drag & drop"}
          </p>
          <p className="text-sm text-gray-500">PNG, JPG up to 5MB</p>
          <input
            id="file-upload"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>

        {/* Camera Capture Button */}
        <button
          type="button"
          onClick={openCamera}
          className="w-full bg-purple-600 text-white py-3 rounded-xl shadow hover:bg-purple-700 transition"
        >
          📷 Capture from Camera
        </button>

        {/* Show Camera if open */}
        {cameraOpen && (
          <div className="flex flex-col items-center space-y-4">
            <video
              ref={videoRef}
              autoPlay
              className="rounded-xl shadow border w-full"
            />
            <button
              type="button"
              onClick={capturePhoto}
              className="bg-red-600 text-white py-2 px-4 rounded-xl hover:bg-red-700"
            >
              📸 Take Photo
            </button>
            <canvas ref={canvasRef} className="hidden" />
          </div>
        )}

        <button
          type="submit"
          disabled={analyzing || loadingModel}
          className="w-full bg-green-600 text-white py-3 rounded-xl shadow hover:bg-green-700 transition"
        >
          {loadingModel
            ? "⏳ Loading Model..."
            : analyzing
            ? "🔄 Analyzing..."
            : "🚀 Analyze Disease"}
        </button>
      </form>

      {/* Preview */}
      {imagePreview && (
        <div className="mt-4">
          <img
            src={imagePreview}
            alt="Preview"
            className="max-w-xs rounded-xl shadow-lg"
          />
        </div>
      )}

      {/* Result */}
      {result && (
        <div className="mt-6 w-full max-w-md bg-white p-4 rounded-xl shadow space-y-2">
          <h3 className="font-bold text-lg">Detection Result:</h3>
          <p>
            <strong>Disease:</strong> {result.disease}
          </p>
          <p>
            <strong>Confidence:</strong> {result.confidence}%
          </p>
          <p>
            <strong>Severity:</strong> {result.severity}
          </p>
          <div>
            <strong>Recommendations:</strong>
            <ul className="list-disc list-inside">
              {result.recommendations.map((rec, idx) => (
                <li key={idx}>{rec}</li>
              ))}
            </ul>
          </div>
          <button
            onClick={downloadPDF}
            className="mt-4 w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition"
          >
            📄 Download Report
          </button>
        </div>
      )}
    </div>
  );
}
