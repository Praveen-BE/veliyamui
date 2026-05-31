"use client";

import { useState } from "react";

export default function PrivacyConsent() {
  const [accepted, setAccepted] = useState(false);

  const handleAccept = () => {
    setAccepted(true);
    // You could also store acceptance in localStorage or Subabase
    localStorage.setItem("privacyAccepted", "true");
  };

  if (accepted) {
    return null; // Hide once accepted
  }

  return (
    <div className="flex items-center justify-center z-50 flex-1">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-lg w-full">
        <h2 className="text-xl font-bold mb-4">Privacy Policy</h2>
        <div className="h-48 overflow-y-scroll border p-2 mb-4 text-sm">
          <p>
            We respect your privacy. This website collects limited information
            such as account data, analytics, and optional content you submit.
            Data is used only to provide and improve services. We do not sell
            your data. For full details, please read our Privacy Policy.
          </p>
        </div>
        {/* <button
          onClick={handleAccept}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          I Accept
        </button> */}
      </div>
    </div>
  );
}
