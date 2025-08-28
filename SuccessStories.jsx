import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const testimonialVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const testimonials = [
  {
    name: "Aisha Sharma",
    stream: "Science",
    story: "Career Explorer AI helped me navigate from engineering confusion to a clear path in Data Science. The AI chat assistant was a game-changer!",
    image: "https://placehold.co/100x100/A78BFA/ffffff?text=AS", // Placeholder for profile image
  },
  {
    name: "Rahul Verma",
    stream: "Commerce",
    story: "I never thought I'd find a tech role with a Commerce background. This platform showed me FinTech development, and I'm loving it!",
    image: "https://placehold.co/100x100/6EE7B7/ffffff?text=RV", // Placeholder for profile image
  },
  {
    name: "Priya Singh",
    stream: "Arts",
    story: "As an Arts student, the Vision Board helped me visualize my career in UX/UI design. It felt so empowering to plan my creative journey.",
    image: "https://placehold.co/100x100/F472B6/ffffff?text=PS", // Placeholder for profile image
  },
  {
    name: "Amit Kumar",
    stream: "Diploma",
    story: "I gained confidence in pursuing a Junior Software Developer role after using the career roadmap and interview prep features. Highly recommend!",
    image: "https://placehold.co/100x100/FBBF24/ffffff?text=AK", // Placeholder for profile image
  },
];

const SuccessStories = () => {
  return (
    <motion.section
      className="w-full max-w-5xl mx-auto py-16 px-4 text-center"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={sectionVariants}
    >
      <h2 className="text-4xl font-bold mb-12 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-red-400">
        Success Stories: Real Journeys, Real Impact
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={index}
            variants={testimonialVariants}
            transition={{ delay: index * 0.1 }}
            className="bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-700 backdrop-filter backdrop-blur-sm bg-opacity-60 flex flex-col items-center text-center"
          >
            <img
              src={testimonial.image}
              alt={testimonial.name}
              className="w-20 h-20 rounded-full object-cover mb-4 border-2 border-purple-500"
            />
            <Quote size={30} className="text-purple-400 mb-4" />
            <p className="text-gray-300 text-lg italic mb-4">"{testimonial.story}"</p>
            <p className="text-white font-semibold text-xl">{testimonial.name}</p>
            <p className="text-gray-400 text-sm">{testimonial.stream} Stream</p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default SuccessStories;
