import React, { useState } from 'react';
import { LogIn } from 'lucide-react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

const SignUp = ({ setAuthPageType, isDarkMode, auth, db }) => {
  const [username, setUsername] = useState('');
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
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Save user profile data to Firestore
      // Using a private collection path: /artifacts/{appId}/users/{userId}/userProfiles
      const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
      const userProfileRef = doc(db, `artifacts/${appId}/users/${user.uid}/userProfiles`, user.uid);
      await setDoc(userProfileRef, {
        uid: user.uid,
        email: user.email,
        username: username, // Save the provided username
        createdAt: new Date().toISOString(),
      });

      setModalMessage('Registration successful! You can now log in.');
      // The onAuthStateChanged listener in App.jsx will handle the navigation
      // after successful registration and automatic login by Firebase.
    } catch (error) {
      console.error("Sign up error:", error.code, error.message);
      let errorMessage = 'Registration failed. Please try again.';
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'This email is already registered. Please login or use a different email.';
      } else if (error.code === 'auth/weak-password') {
        errorMessage = 'Password is too weak. Please choose a stronger password (at least 6 characters).';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Invalid email format.';
      } else {
        errorMessage = `Registration failed: ${error.message}`;
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
        <h2 className="text-3xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400">
          Sign Up
        </h2>
        <p className="text-center text-gray-300 mb-6">
          Create your account to start exploring career paths!
        </p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="signup-username" className="block text-gray-300 text-lg font-medium mb-2">Username</label>
            <input
              type="text"
              id="signup-username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label htmlFor="signup-email" className="block text-gray-300 text-lg font-medium mb-2">Email</label>
            <input
              type="email"
              id="signup-email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label htmlFor="signup-password" className="block text-gray-300 text-lg font-medium mb-2">Password</label>
            <input
              type="password"
              id="signup-password"
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
            {isLoading ? 'Registering...' : 'Register'}
          </button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-gray-300">Already have an account?</p>
          <button
            onClick={() => setAuthPageType('login')}
            className="mt-2 text-purple-400 hover:underline font-medium flex items-center justify-center mx-auto"
          >
            <LogIn size={18} className="mr-2" /> Login
          </button>
        </div>
      </div>

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

export default SignUp;
