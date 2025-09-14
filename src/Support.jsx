import React, { useState } from "react";
import { FaStar, FaChevronDown, FaChevronUp, FaPaperPlane } from "react-icons/fa";

const FAQ_DATA = [
  { id: 1, question: "How do I register my farm?", answer: "You can register via the 'Login' page and complete your profile details." },
  { id: 2, question: "How do I report a crop disease?", answer: "Go to 'AI Disease Detection' and upload a clear image of the affected crop." },
  { id: 3, question: "How do I check mandi prices?", answer: "Navigate to 'Mandi Bhav' in the dashboard to see market rates of commodities." },
  { id: 4, question: "How do I apply for government schemes?", answer: "Go to 'Government Schemes', filter your state and category, and click 'Apply'." },
  { id: 5, question: "Can I use the app offline?", answer: "Yes, some core features are accessible offline under 'Offline Capability'." },
  { id: 6, question: "How do I receive smart alerts?", answer: "Enable notifications in the 'Smart Alerts' section to get updates on your crops." },
  { id: 7, question: "Can I track crop health history?", answer: "Yes, you can see historical data in the Analytics Dashboard." },
];

export default function Support() {
  const [openFAQ, setOpenFAQ] = useState(null);
  const [showContact, setShowContact] = useState(false);
  const [feedbackStars, setFeedbackStars] = useState(0);
  const [feedbackText, setFeedbackText] = useState("");

  const toggleFAQ = id => setOpenFAQ(openFAQ === id ? null : id);

  const submitContact = e => {
    e.preventDefault();
    alert("Contact form submitted!");
    setShowContact(false);
  };

  const submitFeedback = e => {
    e.preventDefault();
    alert(`Feedback submitted! Stars: ${feedbackStars}, Comment: ${feedbackText}`);
    setFeedbackStars(0);
    setFeedbackText("");
  };

  return (
    <section className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">Support Center</h1>
          <p className="text-gray-600 text-lg md:text-xl">
            Find answers, reach out to us, or give your feedback. We're here to help!
          </p>
        </div>

        {/* FAQ Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-semibold mb-6 text-gray-800">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {FAQ_DATA.map(faq => (
              <div
                key={faq.id}
                className="bg-white rounded-2xl shadow-md hover:shadow-lg transition p-5 cursor-pointer"
                onClick={() => toggleFAQ(faq.id)}
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-lg md:text-xl font-medium text-gray-700">{faq.question}</h3>
                  <span className="text-gray-500">{openFAQ === faq.id ? <FaChevronUp /> : <FaChevronDown />}</span>
                </div>
                {openFAQ === faq.id && (
                  <p className="mt-3 text-gray-600 text-sm md:text-base transition-all">{faq.answer}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Contact Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-semibold mb-6 text-gray-800">Contact Us</h2>
          {!showContact ? (
            <button
              onClick={() => setShowContact(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition transform hover:-translate-y-1"
            >
              Open Contact Form
            </button>
          ) : (
            <form onSubmit={submitContact} className="bg-white p-6 rounded-2xl shadow-md space-y-4">
              <input type="text" placeholder="Name" required className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-400" />
              <input type="email" placeholder="Email" required className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-400" />
              <textarea placeholder="Message" required className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-400" rows={4}></textarea>
              <div className="flex gap-4">
                <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full shadow-md hover:shadow-lg transition">
                  Send <FaPaperPlane className="inline ml-2" />
                </button>
                <button type="button" onClick={() => setShowContact(false)} className="bg-gray-300 hover:bg-gray-400 px-6 py-2 rounded-full">
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Feedback Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-semibold mb-6 text-gray-800">Feedback</h2>
          <form onSubmit={submitFeedback} className="bg-white p-6 rounded-2xl shadow-md space-y-4">
            <div className="flex items-center gap-2 justify-center">
              {[1, 2, 3, 4, 5].map(star => (
                <FaStar
                  key={star}
                  className={`cursor-pointer transition-transform transform hover:scale-125 ${feedbackStars >= star ? "text-yellow-400" : "text-gray-300"}`}
                  onClick={() => setFeedbackStars(star)}
                  size={32}
                />
              ))}
            </div>
            <textarea
              placeholder="Write your feedback..."
              value={feedbackText}
              onChange={e => setFeedbackText(e.target.value)}
              className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-green-400"
              rows={4}
            />
            <div className="text-center">
              <button type="submit" className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition transform hover:-translate-y-1">
                Submit Feedback
              </button>
            </div>
          </form>
        </div>

        <div className="text-center text-gray-500 text-sm mt-12">
          * All data is for demo purposes.
        </div>
      </div>
    </section>
  );
}
