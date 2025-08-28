import React, { useState } from 'react';
import { LogIn, UserPlus } from 'lucide-react';
import { signInWithEmailAndPassword } from 'firebase/auth';

const Login = ({ setAuthPageType, isDarkMode, auth }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setModalMessage(''); // Clear previous messages

    try {
      if (!auth) {
        setModalMessage('Firebase Auth not initialized. Please check console for errors.');
        setIsModalOpen(true);
        setIsLoading(false);
        return;
      }
      await signInWithEmailAndPassword(auth, email, password);
      setModalMessage('Login successful! Welcome back.');
      // The onAuthStateChanged listener in App.jsx will handle the navigation
    } catch (error) {
      console.error("Login error:", error.code, error.message);
      let errorMessage = 'Login failed. Please check your credentials.';
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
        errorMessage = 'Invalid email or password.';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Invalid email format.';
      } else if (error.code === 'auth/too-many-requests') {
        errorMessage = 'Too many failed login attempts. Please try again later.';
      } else {
        errorMessage = `Login failed: ${error.message}`;
      }
      setModalMessage(errorMessage);
    } finally {
      setIsLoading(false);
      setIsModalOpen(true);
    }
  };

  return (
    <section className={`w-full min-h-screen flex items-center justify-center p-4 md:p-8 ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'}`}>
      <div className="max-w-md w-full bg-gray-800 p-6 md:p-8 rounded-xl shadow-lg border border-gray-700 backdrop-filter backdrop-blur-sm bg-opacity-60 animate-fade-in">
        <h2 className="text-3xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
          Welcome Back!
        </h2>
        <p className="text-center text-gray-300 mb-6">
          Sign in to continue your career exploration journey.
        </p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-gray-300 text-lg font-medium mb-2">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-300 text-lg font-medium mb-2">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 px-6 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold text-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-800"
            disabled={isLoading}
          >
            {isLoading ? 'Logging In...' : 'Login'}
          </button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-gray-300">Don't have an account?</p>
          <button
            onClick={() => setAuthPageType('signup')}
            className="mt-2 text-purple-400 hover:underline font-medium flex items-center justify-center mx-auto"
          >
            <UserPlus size={18} className="mr-2" /> Sign Up
          </button>
        </div>
      </div>

      {/* Custom Modal for login messages */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-700 text-center max-w-sm w-full">
            <p className="text-white text-lg mb-6">{modalMessage}</p>
            <button
              onClick={() => setIsModalOpen(false)}
              className="py-2 px-6 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Login;
