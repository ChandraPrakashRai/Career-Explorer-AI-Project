import React from 'react';
import NavLink from './NavLink';
import { Home as HomeIcon, BookOpen, Mail, LogIn, LogOut, Sun, Moon, Lightbulb, TrendingUp } from 'lucide-react';

const Header = ({ setCurrentPage, isDarkMode, toggleDarkMode, isLoggedIn, handleLogout }) => {
  return (
    <header className={`py-4 px-6 shadow-lg ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} backdrop-filter backdrop-blur-lg bg-opacity-70 sticky top-0 z-50`}>
      <div className="container mx-auto flex justify-between items-center">
        {/* Website Name */}
        <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          Career Explorer AI
        </div>

        {/* Navigation Links */}
        <nav className="flex items-center space-x-4 md:space-x-8">
          <NavLink icon={<HomeIcon size={20} />} text="Home" onClick={() => setCurrentPage('home')} />
          <NavLink icon={<BookOpen size={20} />} text="Courses" onClick={() => setCurrentPage('courses')} />
          <NavLink icon={<Lightbulb size={20} />} text="How It Works" onClick={() => setCurrentPage('how-it-works')} />
          <NavLink icon={<TrendingUp size={20} />} text="Vision Board" onClick={() => setCurrentPage('vision-board')} />
          <NavLink icon={<Mail size={20} />} text="Contact Us" onClick={() => setCurrentPage('contact')} />

          {isLoggedIn ? (
            <NavLink icon={<LogOut size={20} />} text="Logout" onClick={handleLogout} />
          ) : (
            <NavLink icon={<LogIn size={20} />} text="Login" onClick={() => setCurrentPage('login')} />
          )}

          {/* Dark/Light Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full hover:bg-gray-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-blue-600" />}
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
