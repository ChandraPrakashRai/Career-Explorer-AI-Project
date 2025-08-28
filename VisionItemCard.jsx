import React from 'react';
import { X } from 'lucide-react';

const VisionItemCard = ({ item, onRemove }) => {
  const colorClasses = {
    blue: 'border-blue-500 text-blue-400',
    green: 'border-green-500 text-green-400',
    yellow: 'border-yellow-500 text-yellow-400',
    purple: 'border-purple-500 text-purple-400',
    pink: 'border-pink-500 text-pink-400',
    red: 'border-red-500 text-red-400',
  };
  const bgColorClasses = { // Not directly used for background, but kept for reference if needed
    blue: 'bg-blue-900',
    green: 'bg-green-900',
    yellow: 'bg-yellow-900',
    purple: 'bg-purple-900',
    pink: 'bg-pink-900',
    red: 'bg-red-900',
  };

  return (
    <div className={`relative bg-gray-700 p-6 rounded-xl shadow-lg border-2 ${colorClasses[item.color]} transform hover:scale-105 transition-transform duration-300 backdrop-filter backdrop-blur-sm bg-opacity-70 flex flex-col items-center text-center`}>
      <span className={`text-5xl mb-4 ${colorClasses[item.color]}`}>{item.icon}</span>
      <h3 className="text-xl font-bold mb-3 text-white">{item.title}</h3>
      <button
        onClick={() => onRemove(item.id)}
        className="absolute top-2 right-2 p-1 rounded-full bg-gray-600 hover:bg-red-500 text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500"
        aria-label="Remove goal"
      >
        <X size={16} />
      </button>
    </div>
  );
};

export default VisionItemCard;
