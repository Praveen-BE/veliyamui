import React from "react";

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-6 py-12">
      <div className="max-w-2xl text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">About Us</h1>
        <p className="text-lg text-gray-600 leading-relaxed">
          Welcome to our website! We are passionate about building scalable,
          modern web applications with a focus on performance and user
          experience. Our mission is to deliver high-quality solutions that
          empower businesses and individuals alike.
        </p>
      </div>
    </div>
  );
};

export default AboutPage;
