import React from 'react';
import { motion } from 'framer-motion';
import { Users, Lightbulb, TrendingUp } from 'lucide-react';

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const statVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: "easeOut" } },
};

const timelineItemVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const WhyGuidanceMatters = () => {
  return (
    <motion.section
      className="w-full max-w-5xl mx-auto py-16 px-4 text-center"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={sectionVariants}
    >
      <h2 className="text-4xl font-bold mb-12 text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400">
        Why Career Guidance Matters
      </h2>

      {/* Animated Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <motion.div variants={statVariants} className="bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-700 backdrop-filter backdrop-blur-sm bg-opacity-60 flex flex-col items-center">
          <Users size={60} className="text-blue-400 mb-4" />
          <h3 className="text-5xl font-extrabold text-white">80%</h3>
          <p className="text-gray-300 text-lg mt-2">Students confused after 12th</p>
        </motion.div>
        <motion.div variants={statVariants} className="bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-700 backdrop-filter backdrop-blur-sm bg-opacity-60 flex flex-col items-center" transition={{ delay: 0.2 }}>
          <Lightbulb size={60} className="text-green-400 mb-4" />
          <h3 className="text-5xl font-extrabold text-white">90%</h3>
          <p className="text-gray-300 text-lg mt-2">Benefit from early guidance</p>
        </motion.div>
        <motion.div variants={statVariants} className="bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-700 backdrop-filter backdrop-blur-sm bg-opacity-60 flex flex-col items-center" transition={{ delay: 0.4 }}>
          <TrendingUp size={60} className="text-purple-400 mb-4" />
          <h3 className="text-5xl font-extrabold text-white">75%</h3>
          <p className="text-gray-300 text-lg mt-2">Achieve career satisfaction</p>
        </motion.div>
      </div>

      {/* Scrolling Timeline of Confusion to Clarity */}
      <h3 className="text-3xl font-bold mb-10 text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-400">
        From Confusion to Clarity: Your Journey
      </h3>
      <div className="relative flex flex-col items-center">
        {/* Vertical Line */}
        <div className="absolute left-1/2 -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>

        <motion.div variants={timelineItemVariants} className="flex items-center w-full mb-12" viewport={{ once: true, amount: 0.5 }}>
          <div className="w-1/2 text-right pr-8">
            <h4 className="text-2xl font-semibold text-white mb-2">Initial Confusion</h4>
            <p className="text-gray-300">Feeling lost after 12th or during college, unsure about next steps.</p>
          </div>
          <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 z-10">
            <span className="text-xl">❓</span>
          </div>
          <div className="w-1/2 pl-8"></div>
        </motion.div>

        <motion.div variants={timelineItemVariants} className="flex items-center w-full mb-12 flex-row-reverse" viewport={{ once: true, amount: 0.5 }} transition={{ delay: 0.2 }}>
          <div className="w-1/2 text-left pl-8">
            <h4 className="text-2xl font-semibold text-white mb-2">Seeking Guidance</h4>
            <p className="text-gray-300">Actively looking for resources, mentors, or platforms to help.</p>
          </div>
          <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 z-10">
            <span className="text-xl">🔍</span>
          </div>
          <div className="w-1/2 pr-8"></div>
        </motion.div>

        <motion.div variants={timelineItemVariants} className="flex items-center w-full mb-12" viewport={{ once: true, amount: 0.5 }} transition={{ delay: 0.4 }}>
          <div className="w-1/2 text-right pr-8">
            <h4 className="text-2xl font-semibold text-white mb-2">AI-Powered Insights</h4>
            <p className="text-gray-300">Using Career Explorer AI to analyze interests, skills, and market trends.</p>
          </div>
          <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0 z-10">
            <span className="text-xl">🤖</span>
          </div>
          <div className="w-1/2 pl-8"></div>
        </motion.div>

        <motion.div variants={timelineItemVariants} className="flex items-center w-full mb-12 flex-row-reverse" viewport={{ once: true, amount: 0.5 }} transition={{ delay: 0.6 }}>
          <div className="w-1/2 text-left pl-8">
            <h4 className="text-2xl font-semibold text-white mb-2">Clear Roadmap</h4>
            <p className="text-gray-300">Identifying suitable career paths, required skills, and educational steps.</p>
          </div>
          <div className="w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center flex-shrink-0 z-10">
            <span className="text-xl">🗺️</span>
          </div>
          <div className="w-1/2 pr-8"></div>
        </motion.div>

        <motion.div variants={timelineItemVariants} className="flex items-center w-full" viewport={{ once: true, amount: 0.5 }} transition={{ delay: 0.8 }}>
          <div className="w-1/2 text-right pr-8">
            <h4 className="text-2xl font-semibold text-white mb-2">Achieving Goals</h4>
            <p className="text-gray-300">Confidently pursuing chosen careers and building a successful future.</p>
          </div>
          <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 z-10">
            <span className="text-xl">✅</span>
          </div>
          <div className="w-1/2 pl-8"></div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default WhyGuidanceMatters;
