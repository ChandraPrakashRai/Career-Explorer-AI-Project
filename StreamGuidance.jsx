import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Atom, Briefcase, Palette, GraduationCap } from 'lucide-react';

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
};

const StreamGuidance = () => {
  const [selectedStream, setSelectedStream] = useState(null);

  const streamData = {
    Science: {
      icon: <Atom size={40} className="text-blue-400" />,
      careers: ['Software Engineer', 'Data Scientist', 'Doctor', 'Research Scientist', 'Cybersecurity Analyst'],
      description: "Explore cutting-edge fields in technology, medicine, and research.",
    },
    Commerce: {
      icon: <Briefcase size={40} className="text-green-400" />,
      careers: ['Chartered Accountant', 'Financial Analyst', 'Marketing Manager', 'Business Analyst', 'FinTech Developer'],
      description: "Dive into the world of finance, business, and management.",
    },
    Arts: {
      icon: <Palette size={40} className="text-purple-400" />,
      careers: ['Journalist', 'Psychologist', 'Graphic Designer', 'Content Writer', 'UX/UI Designer'],
      description: "Unleash your creativity and impact society through diverse fields.",
    },
    Other: {
      icon: <GraduationCap size={40} className="text-pink-400" />,
      careers: ['Chef', 'Event Manager', 'Fitness Trainer', 'Teacher', 'Entrepreneur'],
      description: "Discover vocational skills and unique passions for a fulfilling career.",
    },
  };

  return (
    <motion.section
      className="w-full max-w-5xl mx-auto py-16 px-4 text-center"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={sectionVariants}
    >
      <h2 className="text-4xl font-bold mb-12 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400">
        Choose Your Stream, We'll Guide You
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {Object.entries(streamData).map(([streamName, data], index) => (
          <motion.div
            key={streamName}
            variants={cardVariants}
            whileHover={{ scale: 1.05, boxShadow: "0 10px 15px -3px rgba(0,0,0,0.3)" }}
            onClick={() => setSelectedStream(selectedStream === streamName ? null : streamName)}
            className={`bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-700 backdrop-filter backdrop-blur-sm bg-opacity-60 cursor-pointer transition-all duration-300
              ${selectedStream === streamName ? 'border-purple-500 ring-2 ring-purple-500' : ''}`}
          >
            <div className="flex flex-col items-center mb-4">
              {data.icon}
              <h3 className="text-2xl font-semibold text-white mt-4">{streamName}</h3>
            </div>
            <p className="text-gray-300 text-sm mb-4">{data.description}</p>
            {selectedStream === streamName && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-4 pt-4 border-t border-gray-600"
              >
                <h4 className="text-lg font-semibold text-purple-300 mb-2">Example Careers:</h4>
                <ul className="list-disc list-inside text-gray-300 text-left text-sm">
                  {data.careers.map((career, i) => (
                    <li key={i}>{career}</li>
                  ))}
                </ul>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
      <motion.button
        onClick={() => setSelectedStream(null)}
        className="mt-12 py-3 px-8 rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-semibold text-lg hover:from-teal-600 hover:to-cyan-600 transition-all duration-300 shadow-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: selectedStream ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{ pointerEvents: selectedStream ? 'auto' : 'none' }}
      >
        Hide Details
      </motion.button>
    </motion.section>
  );
};

export default StreamGuidance;
