import React, { useState } from "react";
import { FaUserCircle, FaBars, FaTimes, FaBell, FaGlobe } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Navbar({ onLoginClick, isLoggedIn, onLogout, onDashboardClick }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  const { t, i18n } = useTranslation();

  const menuItems = [
    { name: t("Home"), to: "/" },
    { name: t("Disease Detection"), to: "/ai-disease" },
    { name: t("Dashboard"), action: onDashboardClick },
    { name: t("Resources"), to: "/resources" },
    { name: t("Support"), to: "/support" },
  ];

  const languages = [
    { code: "en", label: "English" },
    { code: "hi", label: "Hindi" },
    { code: "bn", label: "Bengali" },
    { code: "ta", label: "Tamil" },
    { code: "te", label: "Telugu" },
  ];

  const switchLanguage = (code) => {
    i18n.changeLanguage(code);
    setLangDropdownOpen(false);
  };

  return (
    <nav className="flex justify-between items-center px-8 py-4 bg-white text-black shadow-md fixed w-full z-50">
      {/* Logo */}
      <div className="text-2xl font-bold cursor-pointer">
        <Link to="/">Krishi AI</Link>
      </div>

      {/* Desktop Menu */}
      <ul className="hidden md:flex space-x-6 items-center">
        {menuItems.map((item, idx) =>
          item.to ? (
            <li key={idx} className="hover:text-green-400 cursor-pointer">
              <Link to={item.to}>{item.name}</Link>
            </li>
          ) : (
            <li
              key={idx}
              className="hover:text-green-400 cursor-pointer"
              onClick={item.action}
            >
              {item.name}
            </li>
          )
        )}

        {/* Notification Button */}
        <li className="relative cursor-pointer ml-4">
          <FaBell
            className="text-2xl hover:text-yellow-400 transition"
            title="Notifications"
            onClick={() => alert("No new notifications yet!")}
          />
        </li>

        {/* Language Selector */}
        <li className="relative cursor-pointer ml-4">
          <FaGlobe
            className="text-2xl hover:text-green-400 transition"
            title="Select Language"
            onClick={() => setLangDropdownOpen(!langDropdownOpen)}
          />
          {langDropdownOpen && (
            <div className="absolute right-0 mt-2 w-32 bg-white text-black rounded shadow-lg py-2 z-50">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  onClick={() => switchLanguage(lang.code)}
                >
                  {lang.label}
                </button>
              ))}
            </div>
          )}
        </li>
      </ul>

      {/* Right Side */}
      <div className="flex items-center space-x-4">
        {isLoggedIn ? (
          <div className="relative">
            <FaUserCircle
              className="text-3xl cursor-pointer"
              title="My Account"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            />
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded shadow-lg py-2 z-50">
                <button
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  onClick={() => alert("My Profile clicked")}
                >
                  My Profile
                </button>
                <button
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  onClick={onLogout}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={onLoginClick}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition duration-300"
          >
            {t("Login")}
          </button>
        )}

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-2xl ml-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-black text-white flex flex-col md:hidden">
          {menuItems.map((item, idx) =>
            item.to ? (
              <Link
                key={idx}
                to={item.to}
                className="px-6 py-3 hover:bg-green-600"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ) : (
              <button
                key={idx}
                className="px-6 py-3 text-left hover:bg-green-600"
                onClick={() => {
                  item.action();
                  setMobileMenuOpen(false);
                }}
              >
                {item.name}
              </button>
            )
          )}
        </div>
      )}
    </nav>
  );
}
 

