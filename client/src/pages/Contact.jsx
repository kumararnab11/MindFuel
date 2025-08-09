import React from 'react'

function Contact() {
  return (
    <div className="bg-richblack-900 min-h-screen flex items-center justify-center p-8">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Left Card */}
        <div className="bg-richblack-800 rounded-lg p-6 space-y-6">
          {/* Chat */}
          <div className="flex items-start space-x-4">
            <span className="text-2xl">💬</span>
            <div>
              <h3 className="font-semibold text-white">Chat on us</h3>
              <p className="text-richblack-300 text-sm">
                Our friendly team is here to help.
              </p>
              <p className="text-richblack-100 text-sm">
                info@studynotion.com
              </p>
            </div>
          </div>

          {/* Visit */}
          <div className="flex items-start space-x-4">
            <span className="text-2xl">🌐</span>
            <div>
              <h3 className="font-semibold text-white">Visit us</h3>
              <p className="text-richblack-300 text-sm">
                Come and say hello at our office HQ.
              </p>
              <p className="text-richblack-100 text-sm">
                Akshya Nagar 1st Block 1st Cross, Ramamurthy Nagar,<br />
                Bangalore-560016
              </p>
            </div>
          </div>

          {/* Call */}
          <div className="flex items-start space-x-4">
            <span className="text-2xl">📞</span>
            <div>
              <h3 className="font-semibold text-white">Call us</h3>
              <p className="text-richblack-300 text-sm">
                Mon - Fri From 8am to 5pm
              </p>
              <p className="text-richblack-100 text-sm">
                +123 456 7869
              </p>
            </div>
          </div>
        </div>

        {/* Right Form */}
        <div className="bg-richblack-800 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-white mb-2">
            Got a Idea? We've got the skills.<br />Let's team up
          </h2>
          <p className="text-richblack-300 text-sm mb-6">
            Tell us more about yourself and what you're got in mind.
          </p>

          <form className="space-y-4">
            {/* Name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Enter first name"
                className="bg-richblack-700 rounded-md px-4 py-2 text-white placeholder-richblack-400 w-full"
              />
              <input
                type="text"
                placeholder="Enter last name"
                className="bg-richblack-700 rounded-md px-4 py-2 text-white placeholder-richblack-400 w-full"
              />
            </div>

            {/* Email */}
            <input
              type="email"
              placeholder="Enter email address"
              className="bg-richblack-700 rounded-md px-4 py-2 text-white placeholder-richblack-400 w-full"
            />

            {/* Phone */}
            <div className="flex gap-4">
              <select className="bg-richblack-700 rounded-md px-4 py-2 text-white">
                <option>+91</option>
                <option>+1</option>
                <option>+44</option>
              </select>
              <input
                type="text"
                placeholder="12345 67890"
                className="bg-richblack-700 rounded-md px-4 py-2 text-white placeholder-richblack-400 flex-1"
              />
            </div>

            {/* Message */}
            <textarea
              rows="4"
              placeholder="Enter your message here"
              className="bg-richblack-700 rounded-md px-4 py-2 text-white placeholder-richblack-400 w-full"
            ></textarea>

            {/* Button */}
            <button
              type="submit"
              className="bg-yellow-500 text-black font-semibold px-6 py-3 rounded-md w-full"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}


export default Contact