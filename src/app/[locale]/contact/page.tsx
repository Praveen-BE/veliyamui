import React from "react";

const ContactPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-6 py-12">
      <div className="max-w-2xl w-full bg-white shadow-md rounded-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Contact Us
        </h1>

        <div className="space-y-6 text-gray-700">
          {/* <div>
            <h2 className="text-lg font-semibold text-gray-800">Address</h2>
            <p>123 Veliyam Street, Ariyalur, Tamil Nadu, India</p>
          </div> */}

          {/* <div>
            <h2 className="text-lg font-semibold text-gray-800">Phone</h2>
            <a href="tel:+916379500360" className="hover:text-blue-600">
              +91 6379500360
            </a>
          </div> */}

          <div>
            <h2 className="text-lg font-semibold text-gray-800">Email</h2>
            <a
              href="mailto:praveenrajendiran3939@gmail.com"
              className="hover:text-blue-600"
            >
              praveenrajendiran3939@gmail.com
            </a>
          </div>
        </div>

        {/* <div className="mt-8 text-center">
          <p className="text-gray-600">Follow us on:</p>
          <div className="flex justify-center gap-6 mt-3">
            <a
              href="https://twitter.com/veliyam"
              className="text-blue-500 hover:text-blue-700"
            >
              Twitter
            </a>
            <a
              href="https://facebook.com/veliyam"
              className="text-blue-600 hover:text-blue-800"
            >
              Facebook
            </a>
            <a
              href="https://instagram.com/veliyam"
              className="text-pink-500 hover:text-pink-700"
            >
              Instagram
            </a>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default ContactPage;
