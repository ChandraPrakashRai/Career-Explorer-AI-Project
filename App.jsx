import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import Home from './components/Home'; // Home component will now contain all scrollable sections
import CareerSelector from './components/CareerSelector';
import ContactUs from './components/ContactUs';
import Login from './components/Login';
import SignUp from './components/SignUp';
import HowItWorks from './components/HowItWorks';
import VisionBoard from './components/VisionBoard';
import ChatAssistant from './components/ChatAssistant';
import Footer from './components/Footer';

// Firebase Imports
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, signInWithCustomToken, onAuthStateChanged } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Main App Component
const App = () => {
  // State for current page navigation
  const [currentPage, setCurrentPage] = useState('home');
  // State for dark mode toggle
  const [isDarkMode, setIsDarkMode] = useState(true);
  // State for user login status
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // New state to control showing the dedicated login/signup page initially
  const [showAuthPage, setShowAuthPage] = useState(true); // Start with auth page
  const [authPageType, setAuthPageType] = useState('login'); // 'login' or 'signup'

  // Firebase state
  const [db, setDb] = useState(null);
  const [auth, setAuth] = useState(null);
  const [userId, setUserId] = useState(null);
  const [isAuthReady, setIsAuthReady] = useState(false); // To ensure Firebase auth is initialized

  // Initialize Firebase and set up auth listener
  useEffect(() => {
    try {
      // For local Canvas environment, __app_id and __firebase_config are provided.
      // For local development (npm start) and Netlify deployment, we use REACT_APP_ variables.
      const firebaseConfig = {
        apiKey: process.env.REACT_APP_FIREBASE_API_KEY || (typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config).apiKey : ''),
        authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || (typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config).authDomain : ''),
        projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || (typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config).projectId : ''),
        storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || (typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config).storageBucket : ''),
        messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || (typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config).messagingSenderId : ''),
        appId: process.env.REACT_APP_FIREBASE_APP_ID || (typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config).appId : ''),
        measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID || (typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config).measurementId : '')
      };

      // Check if Firebase config is valid before initializing
      if (!firebaseConfig.apiKey || !firebaseConfig.projectId || !firebaseConfig.appId) {
        console.error("Firebase config is incomplete or missing. Please ensure REACT_APP_FIREBASE_API_KEY, REACT_APP_FIREBASE_PROJECT_ID, and REACT_APP_FIREBASE_APP_ID are set in your .env file for local development, or __firebase_config is provided in Canvas.");
        setIsAuthReady(true); // Mark as ready but Firebase won't function
        return;
      }

      const app = initializeApp(firebaseConfig);
      const firestoreDb = getFirestore(app);
      const firebaseAuth = getAuth(app);

      setDb(firestoreDb);
      setAuth(firebaseAuth);

      // Sign in with custom token if available (Canvas environment), otherwise anonymously
      const signInUser = async () => {
        try {
          if (typeof __initial_auth_token !== 'undefined' && __initial_auth_token) {
            await signInWithCustomToken(firebaseAuth, __initial_auth_token);
          } else {
            // For local dev/Netlify, if no custom token, sign in anonymously
            await signInAnonymously(firebaseAuth);
          }
        } catch (error) {
          console.error("Firebase sign-in failed:", error);
          // Handle specific sign-in errors, e.g., invalid token
        }
      };

      signInUser();

      const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
        if (user) {
          setIsLoggedIn(true);
          setShowAuthPage(false); // Hide auth page if user is logged in
          setUserId(user.uid);
        } else {
          setIsLoggedIn(false);
          setShowAuthPage(true); // Show auth page if user is logged out
          setUserId(null);
        }
        setIsAuthReady(true); // Auth state is now ready
      });

      return () => unsubscribe(); // Cleanup auth listener on component unmount
    } catch (error) {
      console.error("Failed to initialize Firebase:", error);
      setIsAuthReady(true); // Mark as ready even on error to avoid infinite loading
    }
  }, []); // Empty dependency array means this runs once on mount

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Apply dark mode class to body or main container
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // If Firebase auth is not ready, show a loading state
  if (!isAuthReady) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'}`}>
        <p className="text-xl font-semibold">Loading application...</p>
      </div>
    );
  }

  // If showAuthPage is true, render the Login or SignUp component
  if (showAuthPage) {
    return (
      <div className={`min-h-screen flex flex-col font-inter ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'}`}>
        {authPageType === 'login' ? (
          <Login
            setAuthPageType={setAuthPageType}
            isDarkMode={isDarkMode}
            auth={auth} // Pass auth instance
          />
        ) : (
          <SignUp
            setAuthPageType={setAuthPageType}
            isDarkMode={isDarkMode}
            auth={auth} // Pass auth instance
            db={db} // Pass db instance
          />
        )}
      </div>
    );
  }

  // Otherwise, render the full application
  return (
    <div className={`min-h-screen flex flex-col font-inter ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'}`}>
      {/* Header Component */}
      <Header
        setCurrentPage={setCurrentPage}
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
        isLoggedIn={isLoggedIn}
        handleLogout={() => auth.signOut()} // Use Firebase signOut
      />

      {/* Main Content Area */}
      <main className="flex-grow flex flex-col items-center justify-center"> {/* Removed container mx-auto p-4 md:p-8 here */}
        {currentPage === 'home' && <Home setCurrentPage={setCurrentPage} />}
        {currentPage === 'courses' && <CareerSelector />}
        {currentPage === 'contact' && <ContactUs />}
        {currentPage === 'how-it-works' && <HowItWorks />}
        {currentPage === 'vision-board' && <VisionBoard />}
      </main>

      {/* Chat Assistant Component */}
      <ChatAssistant isDarkMode={isDarkMode} />

      {/* Footer Component */}
      <Footer />
    </div>
  );
};

export default App;
