import React, { useState, useRef } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import HeroSection from "./HeroSection";
import DashboardSection from "./Dashboard";
import LoginPage from "./LoginPage";
import AIDiseasePage from "./AiDisease";
import AIWeather from "./aiWhether";
import SmartAlert from "./SmartAlert";
import Analytics from "./Analytics";
import OfflineCapability from "./OfflineCapability";
import MandiBhav from "./MandiBhav";
import GovernmentSchemes from "./GovernmentSchemes";
import Resources from "./Resource";
import Support from "./Support";
import About from "./about";
import Contact from "./Contact";
import Footer from "./Footer";
import "./i18n";
function Layout({ children, onLoginClick, isLoggedIn, onLogout, onDashboardClick }) {
  const location = useLocation();

  // ✅ Navbar hide only on specific routes
  const hideNavbarRoutes = ["/ai-weather", "/smart-alerts"];

  return (
    <>
      {!hideNavbarRoutes.includes(location.pathname) && (
        <Navbar
          onLoginClick={onLoginClick}
          isLoggedIn={isLoggedIn}
          onLogout={onLogout}
          onDashboardClick={onDashboardClick}
        />
      )}
      {children}
    </>
  );
}

export default function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const dashboardRef = useRef(null);

  const handleLogout = () => setIsLoggedIn(false);
  const scrollToDashboard = () => {
    dashboardRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Router>
      <Layout
        onLoginClick={() => setShowLogin(true)}
        isLoggedIn={isLoggedIn}
        onLogout={handleLogout}
        onDashboardClick={scrollToDashboard}
      >
        {showLogin && (
          <LoginPage
            onClose={() => setShowLogin(false)}
            onLoginSuccess={() => {
              setIsLoggedIn(true);
              setShowLogin(false);
            }}
          />
        )}

        <Routes>
          {/* Landing Page */}
          <Route
            path="/"
            element={
              <>
                <HeroSection />
                <AIDiseasePage/>
                <div ref={dashboardRef}>
                  <DashboardSection />
                </div>
                
                <About />
                <Contact />
                <Footer />
              </>
            }
          />

          {/* Other Pages */}
          <Route path="/ai-disease" element={<AIDiseasePage />} />
          <Route path="/ai-weather" element={<AIWeather />} />
          <Route path="/smart-alerts" element={<SmartAlert />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/offline-capability" element={<OfflineCapability />} />
          <Route path="/market-value" element={<MandiBhav />} />
          <Route path="/government-scheme" element={<GovernmentSchemes />} />
          <Route path="/support/*" element={<Support />} />
          <Route path="/resources/*" element={<Resources />} />
        </Routes>
      </Layout>
    </Router>
  );
}
