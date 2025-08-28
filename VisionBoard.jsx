import React, { useState } from 'react';
import VisionItemCard from './VisionItemCard';

// Helper function to determine the icon based on the goal title
const getIconForGoal = (title) => {
  const lowerTitle = title.toLowerCase();
  if (lowerTitle.includes('software engineer') || lowerTitle.includes('developer') || lowerTitle.includes('programmer')) {
    return '💻'; // Laptop
  } else if (lowerTitle.includes('startup') || lowerTitle.includes('entrepreneur')) {
    return '🚀'; // Rocket
  } else if (lowerTitle.includes('financial') || lowerTitle.includes('money') || lowerTitle.includes('invest')) {
    return '💰'; // Money Bag
  } else if (lowerTitle.includes('research') || lowerTitle.includes('scientist')) {
    return '🔬'; // Microscope
  } else if (lowerTitle.includes('hacker') || lowerTitle.includes('cybersecurity')) {
    return '🔒'; // Lock (or 🖥️ for computer)
  } else if (lowerTitle.includes('upsc') || lowerTitle.includes('ias') || lowerTitle.includes('civil service')) {
    return '🏛️'; // Classical Building (for government/administration)
  } else if (lowerTitle.includes('astronaut') || lowerTitle.includes('space')) {
    return '👨‍🚀'; // Astronaut
  } else if (lowerTitle.includes('freelancer') || lowerTitle.includes('independent')) {
    return '✍️'; // Writing hand
  } else if (lowerTitle.includes('doctor') || lowerTitle.includes('medical')) {
    return '⚕️'; // Medical symbol
  } else if (lowerTitle.includes('teacher') || lowerTitle.includes('educator')) {
    return '📚'; // Books
  } else if (lowerTitle.includes('artist') || lowerTitle.includes('designer')) {
    return '🎨'; // Palette
  } else if (lowerTitle.includes('chef') || lowerTitle.includes('cook')) {
    return '🍳'; // Frying Pan
  }
  return '✨'; // Default star emoji
};

const VisionBoard = () => {
  const [visionItems, setVisionItems] = useState([
    { id: 1, title: 'Become a Senior Software Engineer', icon: '💻', color: 'blue' },
    { id: 2, title: 'Launch My Own Startup', icon: '🚀', color: 'green' },
    { id: 3, title: 'Achieve Financial Independence', icon: '💰', color: 'yellow' },
    { id: 4, title: 'Lead a Research Team', icon: '🔬', color: 'purple' },
  ]);
  const [newItemTitle, setNewItemTitle] = useState('');

  const addVisionItem = () => {
    if (newItemTitle.trim() !== '') {
      const newId = visionItems.length > 0 ? Math.max(...visionItems.map(item => item.id)) + 1 : 1;
      const newColor = ['red', 'blue', 'green', 'yellow', 'purple', 'pink'][Math.floor(Math.random() * 6)];
      const newIcon = getIconForGoal(newItemTitle); // Get icon based on the new title
      setVisionItems([...visionItems, { id: newId, title: newItemTitle, icon: newIcon, color: newColor }]);
      setNewItemTitle('');
    }
  };

  const removeVisionItem = (id) => {
    setVisionItems(visionItems.filter(item => item.id !== id));
  };

  return (
    <section className="w-full max-w-5xl bg-gray-800 p-6 md:p-8 rounded-xl shadow-lg border border-gray-700 backdrop-filter backdrop-blur-sm bg-opacity-60 animate-fade-in">
      <h2 className="text-3xl font-bold text-center mb-10 text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400">
        Your Career Vision Board
      </h2>
      <p className="text-center text-gray-300 mb-8">
        Visualize your career aspirations! Add your goals and dreams to keep them in sight.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 mb-10 justify-center">
        <input
          type="text"
          placeholder="Add a new career goal..."
          value={newItemTitle}
          onChange={(e) => setNewItemTitle(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addVisionItem()}
          className="flex-grow p-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <button
          onClick={addVisionItem}
          className="py-3 px-6 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-md"
        >
          Add Goal
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {visionItems.map(item => (
          <VisionItemCard key={item.id} item={item} onRemove={removeVisionItem} />
        ))}
      </div>
      {visionItems.length === 0 && (
        <p className="text-center text-gray-400 text-lg mt-8">
          Your vision board is empty. Start adding your career goals!
        </p>
      )}
    </section>
  );
};

export default VisionBoard;
