import React from 'react';
import { motion } from 'framer-motion';
import WhyGuidanceMatters from './WhyGuidanceMatters';
import StreamGuidance from './StreamGuidance';
import SuccessStories from './SuccessStories';
import AIChatPreview from './AIChatPreview';
import ExploreByGoals from './ExploreByGoals';
import RoadmapSection from './RoadmapSection';
import ScrollToTopButton from './ScrollToTopButton';

// Animation variants for sections
const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const Home = ({ setCurrentPage }) => {
  return (
    <div className="w-full flex flex-col items-center">
      {/* Hero Section */}
      <motion.section
        className="text-center py-16 px-4 max-w-4xl mx-auto"
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
      >
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400">
          Unlock Your Future with Career Explorer AI
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed">
          Discover personalized career paths, explore diverse courses, and get AI-powered insights to shape your professional journey.
        </p>
        <button
          onClick={() => setCurrentPage('how-it-works')}
          className="mt-12 py-3 px-8 rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-semibold text-lg hover:from-teal-600 hover:to-cyan-600 transition-all duration-300 shadow-lg animate-bounce-slow"
        >
          Learn How It Works
        </button>
      </motion.section>

      {/* Dynamic Scrollable Sections */}
      <WhyGuidanceMatters />
      <StreamGuidance />
      <SuccessStories />
      <AIChatPreview />
      <ExploreByGoals />
      <RoadmapSection />

      {/* Get Started / Call to Action at the bottom */}
      <motion.section
        className="text-center py-16 px-4 w-full max-w-4xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
      >
        <h2 className="text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          Ready to Chart Your Course?
        </h2>
        <p className="text-lg text-gray-300 mb-8">
          Join thousands of students who are building their dream careers with Career Explorer AI.
        </p>
        <button
          onClick={() => setCurrentPage('signup')} // Or 'login' if already registered
          className="py-3 px-8 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold text-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg"
        >
          Get Started Now
        </button>
      </motion.section>

      <ScrollToTopButton />
    </div>
  );
};

export default Home;
