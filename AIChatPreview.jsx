import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Send } from 'lucide-react';

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const chatMessages = [
  { sender: 'user', text: 'What are the career options after 12th Science (non-medical)?' },
  { sender: 'bot', text: 'Thinking...' }, // Placeholder for typing
  { sender: 'bot', text: 'Beyond engineering, you could explore Data Science, Cybersecurity, Architecture, Pure Sciences (Physics, Chemistry, Maths), or even unique fields like Astrophysics or Robotics. What are your interests?' },
  { sender: 'user', text: 'I like creative work, but also tech. Any suggestions?' },
  { sender: 'bot', text: 'Thinking...' }, // Placeholder for typing
  { sender: 'bot', text: 'With a blend of creativity and tech, UX/UI Design, Game Development, Digital Marketing, or even Technical Writing could be great fits. Would you like to know more about any of these?' },
];

const AIChatPreview = () => {
  const [displayedMessages, setDisplayedMessages] = useState([]);
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    if (messageIndex < chatMessages.length) {
      const currentMessage = chatMessages[messageIndex];
      let delay = 1000; // Default delay for user messages or initial bot thought
      if (currentMessage.sender === 'bot' && currentMessage.text !== 'Thinking...') {
        delay = currentMessage.text.length * 50 + 500; // Simulate typing speed
      } else if (currentMessage.text === 'Thinking...') {
        delay = 1500; // Longer delay for thinking
      }

      const timer = setTimeout(() => {
        setDisplayedMessages((prev) => {
          // If it's a 'Thinking...' message, replace it with the actual response
          if (currentMessage.text === 'Thinking...' && prev.length > 0 && prev[prev.length - 1].text === 'Thinking...') {
            const newMessages = [...prev];
            newMessages[newMessages.length - 1] = chatMessages[messageIndex + 1]; // Replace with next actual message
            setMessageIndex(messageIndex + 2); // Skip the actual message as it's already added
            return newMessages;
          }
          return [...prev, currentMessage];
        });
        setMessageIndex((prev) => prev + 1);
      }, delay);

      return () => clearTimeout(timer);
    } else {
      // Reset after all messages are displayed
      const resetTimer = setTimeout(() => {
        setDisplayedMessages([]);
        setMessageIndex(0);
      }, 5000); // Wait 5 seconds before restarting simulation
      return () => clearTimeout(resetTimer);
    }
  }, [messageIndex]); // Dependency array includes messageIndex

  return (
    <motion.section
      className="w-full max-w-5xl mx-auto py-16 px-4 text-center"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={sectionVariants}
    >
      <h2 className="text-4xl font-bold mb-12 text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-400">
        Your Personal AI Career Assistant
      </h2>
      <p className="text-lg text-gray-300 mb-8 max-w-3xl mx-auto">
        Get instant answers to all your career doubts. Our AI assistant is trained on vast career data to provide personalized, actionable advice.
      </p>

      <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700 backdrop-filter backdrop-blur-sm bg-opacity-60 max-w-xl mx-auto h-[450px] flex flex-col">
        {/* Chat Header */}
        <div className="p-3 rounded-t-lg flex justify-between items-center bg-gray-700 text-white">
          <h3 className="text-lg font-semibold flex items-center">
            <MessageSquare size={20} className="mr-2" /> AI Assistant Live Demo
          </h3>
        </div>

        {/* Chat Messages Simulation */}
        <div className="flex-grow p-4 overflow-y-auto custom-scrollbar flex flex-col justify-end">
          {displayedMessages.map((msg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`mb-3 p-3 rounded-lg max-w-[80%] ${
                msg.sender === 'user'
                  ? 'ml-auto bg-blue-600 text-white'
                  : 'mr-auto bg-gray-600 text-white'
              }`}
            >
              {msg.text}
            </motion.div>
          ))}
        </div>

        {/* Chat Input (simulated) */}
        <div className="p-4 border-t border-gray-700 flex items-center">
          <input
            type="text"
            placeholder="Type your message..."
            className="flex-grow p-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none"
            disabled
          />
          <button
            className="ml-2 p-2 rounded-full bg-purple-600 text-white"
            disabled
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </motion.section>
  );
};

export default AIChatPreview;
