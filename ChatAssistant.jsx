import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send } from 'lucide-react';
import { motion } from 'framer-motion'; // Import motion for animations

const ChatAssistant = ({ isDarkMode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef(null); // Ref for the scrollable chat messages container

  // Scroll behavior: Only scroll to bottom if user is already at the bottom
  // or if a new user message is sent. Otherwise, let user control scroll.
  useEffect(() => {
    const chatContainer = chatContainerRef.current;
    if (chatContainer) {
      const isScrolledToBottom = chatContainer.scrollHeight - chatContainer.clientHeight <= chatContainer.scrollTop + 1; // +1 for buffer

      // If the user is at the bottom, or it's a new user message, or the very first message
      if (isScrolledToBottom || messages[messages.length - 1]?.sender === 'user' || messages.length === 1) {
        chatContainer.scrollTo({
          top: chatContainer.scrollHeight,
          behavior: "smooth"
        });
      }
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (input.trim() === '') return;

    const userMessage = { sender: 'user', text: input };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // IMPORTANT: For local development and Netlify deployment, use process.env.REACT_APP_GEMINI_API_KEY.
      // In the Canvas environment, the apiKey is automatically populated via __app_id.
      const geminiApiKey = process.env.REACT_APP_GEMINI_API_KEY || "";
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${geminiApiKey}`;

      if (!geminiApiKey) {
        setMessages((prevMessages) => [...prevMessages, { sender: 'bot', text: 'Error: Gemini API key is not configured. Please set REACT_APP_GEMINI_API_KEY.' }]);
        setIsLoading(false);
        return;
      }

      // Prepare chat history for the API call
      let chatHistory = messages.map(msg => ({
        role: msg.sender === 'user' ? 'user' : 'model',
        parts: [{ text: msg.text }]
      }));
      chatHistory.push({ role: "user", parts: [{ text: input }] });

      const payload = { contents: chatHistory };

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      if (response.ok && result.candidates && result.candidates.length > 0 &&
          result.candidates[0].content && result.candidates[0].content.parts &&
          result.candidates[0].content.parts.length > 0) {
        const botResponse = result.candidates[0].content.parts[0].text;
        setMessages((prevMessages) => [...prevMessages, { sender: 'bot', text: botResponse }]);
      } else {
        // Log the full response for debugging unexpected structures or API errors
        console.error('API Error or Unexpected Response:', result);
        setMessages((prevMessages) => [...prevMessages, { sender: 'bot', text: 'Sorry, I could not get a response. Please try again. (Error: ' + (result.error?.message || 'Unknown API error') + ')' }]);
      }
    } catch (error) {
      console.error('Error fetching from Gemini API:', error);
      setMessages((prevMessages) => [...prevMessages, { sender: 'bot', text: 'An error occurred while fetching a response. Please check your internet connection and API key.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Floating Chat Icon */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 p-4 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-purple-500 z-50
          ${isDarkMode ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white' : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'}
          ${isOpen ? 'rotate-45' : 'rotate-0'}
        `}
        aria-label="Open chat assistant"
      >
        {isOpen ? <X size={28} /> : <MessageSquare size={28} />}
      </button>

      {/* Chatbot Modal/Panel */}
      {isOpen && (
        <div className={`fixed bottom-20 right-6 w-80 md:w-96 h-96 rounded-xl shadow-2xl flex flex-col z-50
          ${isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-300'}
          backdrop-filter backdrop-blur-lg bg-opacity-80
        `}>
          {/* Chat Header */}
          <div className={`p-4 rounded-t-xl flex justify-between items-center ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-800'}`}>
            <motion.h3
              className="text-lg font-semibold flex items-center"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <MessageSquare size={20} className="mr-2" />
              <motion.span
                animate={{
                  scale: [1, 1.02, 1], // Subtle pulse effect
                  opacity: [1, 0.9, 1], // Subtle fade effect
                }}
                transition={{
                  duration: 2,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              >
                AI Assistant
              </motion.span>
            </motion.h3>
            <button
              onClick={() => setIsOpen(false)}
              className={`p-1 rounded-full ${isDarkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-300'} transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500`}
              aria-label="Close chat assistant"
            >
              <X size={20} />
            </button>
          </div>

          {/* Chat Messages */}
          <div ref={chatContainerRef} className="flex-grow p-4 overflow-y-auto custom-scrollbar" style={{ scrollbarWidth: 'thin', scrollbarColor: `${isDarkMode ? '#888 #555' : '#ccc #f1f1f1'}` }}>
            {messages.length === 0 && (
              <div className="text-center text-gray-400 mt-10">
                Type a message to start chatting!
              </div>
            )}
            {messages.map((msg, index) => (
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
            {isLoading && (
              <div className={`mb-3 p-3 rounded-lg mr-auto ${isDarkMode ? 'bg-gray-600' : 'bg-gray-200'} text-gray-400 animate-pulse`}>
                Typing...
              </div>
            )}
          </div>

          {/* Chat Input */}
          <div className={`p-4 border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} flex items-center`}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
              className={`flex-grow p-2 rounded-lg ${isDarkMode ? 'bg-gray-700 text-white border border-gray-600' : 'bg-gray-100 text-gray-800 border border-gray-300'} focus:outline-none focus:ring-2 focus:ring-purple-500`}
              disabled={isLoading}
            />
            <button
              onClick={handleSendMessage}
              className={`ml-2 p-2 rounded-full ${isDarkMode ? 'bg-purple-600 hover:bg-purple-700' : 'bg-purple-500 hover:bg-purple-600'} text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500`}
              disabled={isLoading}
              aria-label="Send message"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatAssistant;
