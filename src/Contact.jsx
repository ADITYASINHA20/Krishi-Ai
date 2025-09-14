import React from 'react'

const Contact = () => {
  return (
   <section id="contact" className="py-20 bg-white text-center">
        <h2 className="text-5xl font-extrabold mb-8 text-green-700 drop-shadow-sm">
          📞 Contact Us
        </h2>
        <p className="text-gray-600 mb-10">
          We’d love to hear from you! Fill the form below to get in touch.
        </p>
        <div className="max-w-lg mx-auto bg-gradient-to-r from-green-50 to-green-100 p-10 rounded-2xl shadow-xl border border-green-200">
          <form
            action="https://api.web3forms.com/submit"
            method="POST"
            className="flex flex-col gap-5"
          >
            {/* 🔑 Web3Forms Access Key */}
            <input type="hidden" name="access_key" value="60cb11c5-e01b-4c70-9754-98f3b9c96a4a" />

            <input
              type="text"
              name="name"
              placeholder="👤 Your Name"
              className="border p-4 rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="📧 Your Email"
              className="border p-4 rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
              required
            />
            <textarea
              name="message"
              placeholder="💬 Your Message"
              rows="4"
              className="border p-4 rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
              required
            ></textarea>

            <button
              type="submit"
              className="bg-gradient-to-r from-green-600 to-purple-600 text-white py-3 rounded-full font-semibold hover:scale-110 transition-transform shadow-md"
            >
              🚀 Send Message
            </button>
          </form>
        </div>
      </section>
  )
}

export default Contact
