import React from 'react';

const FeatureCard = ({ title, description, icon }) => (
  <div className="group bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700 transform hover:scale-105 transition-transform duration-300 w-full flex flex-col items-center text-center backdrop-filter backdrop-blur-sm bg-opacity-60 relative overflow-hidden
    before:absolute before:inset-0 before:bg-gradient-to-r before:from-purple-500 before:to-pink-500 before:scale-x-0 before:origin-left before:transition-transform before:duration-500 before:ease-out group-hover:before:scale-x-100
  ">
    <div className="relative z-10">
      <div className="mb-4 transition-colors duration-300 group-hover:text-white">{icon}</div>
      <h3 className="text-xl font-semibold mb-2 text-white transition-colors duration-300 group-hover:text-white">{title}</h3>
      <p className="text-gray-300 text-sm transition-colors duration-300 group-hover:text-gray-100">{description}</p>
    </div>
  </div>
);

export default FeatureCard;
