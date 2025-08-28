import React from 'react';
import { Search, HelpCircle } from 'lucide-react';

const CareerSuggestionCard = ({ career }) => { // Removed fetchCareerDetails, fetchInterviewQuestions props
  const handleExploreMore = () => {
    const searchQuery = `${career.name} career details`;
    // Encodes the search query for a URL
    const googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`;
    window.open(googleSearchUrl, '_blank'); // Opens in a new tab
  };

  const handleInterviewPrep = () => {
    const searchQuery = `${career.name} interview questions`;
    // Encodes the search query for a URL
    const googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`;
    window.open(googleSearchUrl, '_blank'); // Opens in a new tab
  };

  return (
    <div className="bg-gray-700 p-6 rounded-xl shadow-lg border border-gray-600 transform hover:scale-105 transition-transform duration-300 flex flex-col justify-between backdrop-filter backdrop-blur-sm bg-opacity-70
      relative overflow-hidden group
      before:absolute before:inset-0 before:bg-gradient-to-r before:from-blue-500 before:to-purple-500 before:scale-x-0 before:origin-left before:transition-transform before:duration-500 before:ease-out group-hover:before:scale-x-100
      before:opacity-20 hover:border-transparent /* Make border transparent on hover to show gradient */
    ">
      <div className="relative z-10"> {/* Ensure content is above the pseudo-element */}
        <h4 className="text-xl font-bold mb-2 text-purple-300 group-hover:text-white transition-colors duration-300">{career.name}</h4>
        <p className="text-gray-300 mb-1 group-hover:text-gray-100 transition-colors duration-300"><span className="font-semibold text-purple-200 group-hover:text-purple-100 transition-colors duration-300">Salary:</span> {career.salary}</p>
        <p className="text-gray-300 mb-1 group-hover:text-gray-100 transition-colors duration-300"><span className="font-semibold text-purple-200 group-hover:text-purple-100 transition-colors duration-300">Future Scope:</span> {career.scope}</p>
        <p className="text-gray-300 group-hover:text-gray-100 transition-colors duration-300"><span className="font-semibold text-purple-200 group-hover:text-purple-100 transition-colors duration-300">Roadmap:</span> {career.roadmap}</p>
      </div>
      <div className="mt-4 flex flex-col space-y-2 relative z-10"> {/* Ensure buttons are above pseudo-element */}
        <button
          onClick={handleExploreMore} // Changed to call local handler
          className="py-2 px-4 rounded-lg bg-gradient-to-r from-blue-500 to-green-500 text-white font-semibold text-sm hover:from-blue-600 hover:to-green-600 transition-all duration-300 shadow-md flex items-center justify-center"
        >
          <Search size={16} className="mr-2" /> ✨ Explore More
        </button>
        <button
          onClick={handleInterviewPrep} // Changed to call local handler
          className="py-2 px-4 rounded-lg bg-gradient-to-r from-pink-500 to-red-500 text-white font-semibold text-sm hover:from-pink-600 hover:to-red-600 transition-all duration-300 shadow-md flex items-center justify-center"
        >
          <HelpCircle size={16} className="mr-2" /> ✨ Interview Prep
        </button>
      </div>
    </div>
  );
};

export default CareerSuggestionCard;
