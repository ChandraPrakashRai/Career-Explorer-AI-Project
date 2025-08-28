import React from 'react';
import { motion } from 'framer-motion';
import { Compass, Zap, CheckCircle, Award } from 'lucide-react';

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const milestoneVariants = {
  hidden: { opacity: 0, x: -100 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const milestones = [
  {
    title: "Explore",
    icon: <Compass size={50} className="text-blue-400" />,
    description: "Discover your interests, skills, and potential career paths with AI guidance.",
  },
  {
    title: "Skill Up",
    icon: <Zap size={50} className="text-green-400" />,
    description: "Acquire necessary knowledge and practical skills through recommended courses.",
  },
  {
    title: "Apply",
    icon: <CheckCircle size={50} className="text-purple-400" />,
    description: "Prepare for interviews, build a strong portfolio, and apply for your dream jobs.",
  },
  {
    title: "Grow",
    icon: <Award size={50} className="text-pink-400" />,
    description: "Continuously learn, adapt, and advance in your chosen professional journey.",
  },
];

const RoadmapSection = () => {
  return (
    <motion.section
      className="w-full max-w-5xl mx-auto py-16 px-4 text-center"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={sectionVariants}
    >
      <h2 className="text-4xl font-bold mb-12 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
        Your Career Roadmap with AI
      </h2>

      <div className="relative flex flex-col items-center">
        {/* Vertical Line */}
        <div className="absolute left-1/2 -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-500 via-green-500 to-purple-500 rounded-full"></div>

        {milestones.map((milestone, index) => (
          <motion.div
            key={index}
            variants={milestoneVariants}
            transition={{ delay: index * 0.15 }}
            className={`flex items-center w-full mb-16 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
            viewport={{ once: true, amount: 0.5 }}
          >
            <div className={`w-1/2 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
              <h3 className="text-2xl font-semibold text-white mb-2">{milestone.title}</h3>
              <p className="text-gray-300">{milestone.description}</p>
            </div>
            <div className="w-20 h-20 bg-gray-700 rounded-full flex items-center justify-center flex-shrink-0 z-10 border-4 border-gray-600 shadow-lg">
              {milestone.icon}
            </div>
            <div className={`w-1/2 ${index % 2 === 0 ? 'pl-8' : 'pr-8'}`}></div>
          </motion.div>
        ))}
      </div>

      <motion.button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} // Scroll to top
        className="mt-12 py-3 px-8 rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-semibold text-lg hover:from-teal-600 hover:to-cyan-600 transition-all duration-300 shadow-lg"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.5 }}
      >
        Back to Top
      </motion.button>
    </motion.section>
  );
};

export default RoadmapSection;
