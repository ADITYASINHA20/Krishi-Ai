import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-12">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
        
        {/* Left Section */}
        <div>
          <h2 className="text-xl font-bold text-orange-400 mb-3">
            Krishi AI Portal
          </h2>
          <p className="text-sm mb-4">
            Government of India's official platform for AI-powered crop disease
            management and agricultural support.
          </p>
          <div className="flex gap-4 text-xl">
            <a href="#" className="hover:text-green-400"><FaFacebookF /></a>
            <a href="#" className="hover:text-green-400"><FaTwitter /></a>
            <a href="#" className="hover:text-green-400"><FaInstagram /></a>
            <a href="#" className="hover:text-green-400"><FaYoutube /></a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-orange-400 mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-green-400">Home</a></li>
            <li><a href="#" className="hover:text-green-400">Disease Detection</a></li>
            <li><a href="#" className="hover:text-green-400">Dashboard</a></li>
            <li><a href="#" className="hover:text-green-400">Mobile App</a></li>
            <li><a href="#" className="hover:text-green-400">Help & Support</a></li>
            <li><a href="#" className="hover:text-green-400">API Documentation</a></li>
          </ul>
        </div>

        {/* Government Schemes */}
        <div>
          <h3 className="text-lg font-semibold text-orange-400 mb-3">Government Schemes</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-green-400">PM-KISAN</a></li>
            <li><a href="#" className="hover:text-green-400">Digital India Agriculture</a></li>
            <li><a href="#" className="hover:text-green-400">e-NAM Integration</a></li>
            <li><a href="#" className="hover:text-green-400">Subsidy Programs</a></li>
            <li><a href="#" className="hover:text-green-400">Organic Farming</a></li>
            <li><a href="#" className="hover:text-green-400">Farmer Training</a></li>
          </ul>
        </div>

        {/* Contact Us */}
        <div>
          <h3 className="text-lg font-semibold text-orange-400 mb-3">Contact Us</h3>
          <p className="text-sm">
            Ministry of Agriculture <br />
            Krishi Bhawan, New Delhi <br />
            Pin: 110001
          </p>
          <p className="mt-2 text-sm">📞 1800-180-1551 (Toll Free)</p>
          <p className="mt-1 text-sm">✉ support@krishiai.gov.in</p>
          <p className="mt-1 text-sm">🌐 krishiai.gov.in</p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 mt-10 py-4 text-center text-sm text-gray-400">
        <p>
          © 2024 Government of India, Ministry of Agriculture and Farmers Welfare. All rights reserved.
        </p>
        <div className="flex justify-center gap-6 mt-2">
          <a href="#" className="hover:text-green-400">Privacy Policy</a>
          <a href="#" className="hover:text-green-400">Terms of Service</a>
          <a href="#" className="hover:text-green-400">Accessibility</a>
          <a href="#" className="hover:text-green-400">Security</a>
        </div>
        <p className="mt-2">Last updated: March 2025 | Version 2.1.0</p>
      </div>
    </footer>
  );
}