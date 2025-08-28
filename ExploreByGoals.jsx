import React from 'react';
import { motion } from 'framer-motion';
import { DollarSign, Paintbrush, Globe, Briefcase } from 'lucide-react';

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const goalCardVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
};

const goals = [
  {
    title: "High Paying Job",
    icon: <DollarSign size={50} className="text-green-400 mb-4" />,
    description: "Discover lucrative careers in tech, finance, and specialized fields.",
    cta: "Find High-Paying Roles",
  },
  {
    title: "Creative Field",
    icon: <Paintbrush size={50} className="text-purple-400 mb-4" />,
    description: "Explore careers where your artistic and innovative talents shine.",
    cta: "Unleash Your Creativity",
  },
  {
    title: "Work Abroad",
    icon: <Globe size={50} className="text-blue-400 mb-4" />,
    description: "Identify global opportunities and pathways to international careers.",
    cta: "Explore Global Careers",
  },
  {
    title: "Freelancing",
    icon: <Briefcase size={50} className="text-pink-400 mb-4" />,
    description: "Learn how to build a successful independent career on your terms.",
    cta: "Start Freelancing Journey",
  },
];

const ExploreByGoals = () => {
  return (
    <motion.section
      className="w-full max-w-5xl mx-auto py-16 px-4 text-center"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={sectionVariants}
    >
      <h2 className="text-4xl font-bold mb-12 text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400">
        Explore Careers by Your Goals
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {goals.map((goal, index) => (
          <motion.div
            key={index}
            variants={goalCardVariants}
            transition={{ delay: index * 0.1 }}
            className="bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-700 backdrop-filter backdrop-blur-sm bg-opacity-60 flex flex-col items-center text-center group hover:scale-105 transition-transform duration-300"
          >
            {goal.icon}
            <h3 className="text-2xl font-semibold text-white mb-3">{goal.title}</h3>
            <p className="text-gray-300 text-sm mb-6">{goal.description}</p>
            <button className="py-2 px-6 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold text-sm hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-md">
              {goal.cta}
            </button>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default ExploreByGoals;
