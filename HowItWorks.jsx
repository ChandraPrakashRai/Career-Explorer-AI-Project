import React from 'react';

const HowItWorks = () => {
  return (
    <section className="w-full max-w-5xl bg-gray-800 p-6 md:p-8 rounded-xl shadow-lg border border-gray-700 backdrop-filter backdrop-blur-sm bg-opacity-60 animate-fade-in">
      <h2 className="text-3xl font-bold text-center mb-10 text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-400">
        How It Works: Your Path to Discovery
      </h2>
      <div className="flex flex-col md:flex-row items-center justify-center gap-12">
        <div className="md:w-1/2 space-y-8">
          <div className="flex items-start">
            <div className="text-4xl font-extrabold text-purple-400 mr-4">01</div>
            <div>
              <h3 className="text-2xl font-semibold text-white mb-2">Answer</h3>
              <p className="text-gray-300">Start by answering a few simple questions about your interests, skills, and academic background.</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="text-4xl font-extrabold text-pink-400 mr-4">02</div>
            <div>
              <h3 className="text-2xl font-semibold text-white mb-2">Discover What Makes You — You</h3>
              <p className="text-gray-300">Our AI analyzes your responses to find out what makes you stand apart from others and why certain careers are great fits for you.</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="text-4xl font-extrabold text-blue-400 mr-4">03</div>
            <div>
              <h3 className="text-2xl font-semibold text-white mb-2">Explore</h3>
              <p className="text-gray-300">Dive deep into suggested career paths, get detailed insights, and prepare for interviews with AI-generated content.</p>
            </div>
          </div>
        </div>
        <div className="md:w-1/2 flex justify-center items-center relative min-h-[300px]">
          {/* Reimagined visual elements from image_6268d2.jpg */}
          <div className="absolute w-48 h-64 bg-purple-700 rounded-lg shadow-xl transform -rotate-6 top-0 left-10 opacity-70 flex items-center justify-center p-4 text-center text-white font-bold text-lg">
            <span className="bg-purple-900 p-2 rounded-full mb-2">G</span> Guardian <br/> (Creative, Introspective)
          </div>
          <div className="absolute w-48 h-64 bg-teal-700 rounded-lg shadow-xl transform rotate-3 bottom-0 right-10 opacity-70 flex items-center justify-center p-4 text-center text-white font-bold text-lg">
            <span className="bg-teal-900 p-2 rounded-full mb-2">A</span> Architect <br/> (Analytical, Problem-Solver)
          </div>
          <div className="absolute w-40 h-28 bg-gray-700 rounded-lg shadow-lg -bottom-10 left-1/4 transform rotate-12 opacity-80 p-3 text-sm text-gray-200">
            Your value: ability, feeling of achievement, and opportunities for advancement.
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
