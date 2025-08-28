import React from 'react';

const NavLink = ({ icon, text, onClick }) => (
  <button
    onClick={onClick}
    className="flex items-center space-x-2 text-gray-300 hover:text-purple-400 transition-colors duration-300 text-sm md:text-base font-medium group focus:outline-none"
  >
    {icon}
    <span className="relative">
      {text}
      <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-purple-400 group-hover:w-full transition-all duration-300"></span>
    </span>
  </button>
);

export default NavLink;
