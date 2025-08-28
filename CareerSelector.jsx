import React, { useState, useEffect } from 'react';
import CareerSuggestionCard from './CareerSuggestionCard';
// Modal is no longer needed if we are directly opening Google searches
// import Modal from './Modal'; // Removed import

const CareerSelector = () => {
  const [category, setCategory] = useState('');
  const [codingKnowledge, setCodingKnowledge] = useState('');
  const [careerSuggestions, setCareerSuggestions] = useState([]);
  // Removed states related to modals and API calls as they are no longer used
  // const [selectedCareerForDetails, setSelectedCareerForDetails] = useState(null);
  // const [selectedCareerForInterview, setSelectedCareerForInterview] = useState(null);
  // const [careerDetails, setCareerDetails] = useState('');
  // const [interviewQuestions, setInterviewQuestions] = useState('');
  // const [isLoadingDetails, setIsLoadingDetails] = useState(false);
  // const [isLoadingInterview, setIsLoadingInterview = useState(false);
  // const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  // const [isInterviewModalOpen, setIsInterviewModalOpen] = useState(false);


  // Load saved selection from localStorage on component mount
  useEffect(() => {
    const savedCategory = localStorage.getItem('careerCategory');
    const savedCodingKnowledge = localStorage.getItem('careerCodingKnowledge');
    if (savedCategory) setCategory(savedCategory);
    if (savedCodingKnowledge) setCodingKnowledge(savedCodingKnowledge);
  }, []);

  // Save selection to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('careerCategory', category);
    localStorage.setItem('careerCodingKnowledge', codingKnowledge);
    generateSuggestions(category, codingKnowledge);
  }, [category, codingKnowledge]);

  // Dummy data for career suggestions with Indian Rupee salaries (Lakhs INR)
  const careerData = {
    Science: {
      Yes: [
        { name: 'Software Engineer', salary: '6 - 25 Lakhs INR', scope: 'High demand, evolving tech', roadmap: 'B.Tech/B.E. in CS, internships, DSA' },
        { name: 'Data Scientist', salary: '8 - 30 Lakhs INR', scope: 'Growing field, AI/ML focus', roadmap: 'B.Sc/M.Sc in Stats/CS, Python, ML algorithms' },
        { name: 'Cybersecurity Analyst', salary: '5 - 18 Lakhs INR', scope: 'Critical for all industries', roadmap: 'Certifications (CompTIA Security+), network security' },
      ],
      Beginner: [
        { name: 'Web Developer (Frontend)', salary: '3 - 10 Lakhs INR', scope: 'Constant need for web presence', roadmap: 'HTML, CSS, JavaScript, React/Vue' },
        { name: 'IT Support Specialist', salary: '2.5 - 6 Lakhs INR', scope: 'Foundation for IT careers', roadmap: 'CompTIA A+, networking basics' },
      ],
      No: [
        { name: 'Doctor', salary: '6 - 50+ Lakhs INR', scope: 'Evergreen, high impact', roadmap: 'MBBS, MD/MS, specialization' },
        { name: 'Research Scientist', salary: '5 - 20 Lakhs INR', scope: 'Innovation, academic/industry roles', roadmap: 'B.Sc/M.Sc/Ph.D. in specific science' },
        { name: 'Pharmacist', salary: '3 - 8 Lakhs INR', scope: 'Healthcare sector, stable', roadmap: 'B.Pharm, M.Pharm/Pharm.D.' },
      ],
    },
    Commerce: {
      Yes: [
        { name: 'FinTech Developer', salary: '7 - 20 Lakhs INR', scope: 'Blends finance and tech', roadmap: 'B.Com/BBA + Coding skills, financial modeling' },
      ],
      Beginner: [
        { name: 'Business Analyst', salary: '4 - 12 Lakhs INR', scope: 'Bridge between business and tech', roadmap: 'BBA/B.Com, analytical skills, SQL' },
      ],
      No: [
        { name: 'Chartered Accountant (CA)', salary: '6 - 30+ Lakhs INR', scope: 'High demand, regulatory roles', roadmap: 'CA Foundation, Intermediate, Final exams' },
        { name: 'Financial Analyst', salary: '4 - 15 Lakhs INR', scope: 'Investment, corporate finance', roadmap: 'B.Com/BBA in Finance, CFA (optional)' },
        { name: 'Marketing Manager', salary: '4 - 12 Lakhs INR', scope: 'Brand building, digital marketing', roadmap: 'BBA/B.Com, MBA in Marketing' },
      ],
    },
    Arts: {
      Yes: [
        { name: 'UX/UI Designer', salary: '5 - 15 Lakhs INR', scope: 'Growing demand for user-friendly products', roadmap: 'Design principles, Figma/Sketch, coding basics (HTML/CSS)' },
      ],
      Beginner: [
        { name: 'Content Writer (Tech)', salary: '3 - 8 Lakhs INR', scope: 'Need for clear technical communication', roadmap: 'Strong writing skills, understanding of tech concepts' },
      ],
      No: [
        { name: 'Journalist', salary: '2.5 - 7 Lakhs INR', scope: 'Media, investigative roles', roadmap: 'B.A. in Journalism/Mass Comm, strong writing' },
        { name: 'Psychologist', salary: '3 - 9 Lakhs INR', scope: 'Mental health, counseling', roadmap: 'B.A./M.A. in Psychology, clinical practice' },
        { name: 'Graphic Designer', salary: '2.5 - 7 Lakhs INR', scope: 'Creative industry, branding', roadmap: 'Design degree, Adobe Creative Suite' },
      ],
    },
    Diploma: {
      Yes: [
        { name: 'Junior Software Developer', salary: '3 - 7 Lakhs INR', scope: 'Entry-level tech roles', roadmap: 'Diploma in CS/IT, practical coding skills' },
      ],
      Beginner: [
        { name: 'Network Technician', salary: '2.5 - 6 Lakhs INR', scope: 'Infrastructure support', roadmap: 'Diploma in Networking, CCNA (optional)' },
      ],
      No: [
        { name: 'Electrical Technician', salary: '2 - 5 Lakhs INR', scope: 'Hands-on, maintenance', roadmap: 'Diploma in Electrical Engg.' },
        { name: 'Automobile Mechanic', salary: '2 - 4.5 Lakhs INR', scope: 'Skilled trade, repair', roadmap: 'Diploma in Automobile Engg.' },
      ],
    },
    'Non-Tech': {
      Yes: [], // Non-Tech with coding knowledge might fall into other categories or specific niche roles
      Beginner: [],
      No: [
        { name: 'Chef', salary: '2 - 6 Lakhs INR', scope: 'Culinary arts, hospitality', roadmap: 'Culinary school, apprenticeships' },
        { name: 'Event Manager', salary: '3 - 8 Lakhs INR', scope: 'Planning, execution, creative', roadmap: 'Event management courses, practical experience' },
        { name: 'Fitness Trainer', salary: '2 - 5 Lakhs INR', scope: 'Health and wellness industry', roadmap: 'Certifications (ACSM, NASM), personal training' },
      ],
    },
  };

  const generateSuggestions = (selectedCategory, selectedCodingKnowledge) => {
    if (selectedCategory && selectedCodingKnowledge) {
      const suggestions = careerData[selectedCategory]?.[selectedCodingKnowledge] || [];
      setCareerSuggestions(suggestions);
    } else {
      setCareerSuggestions([]);
    }
  };

  return (
    <section className="w-full max-w-5xl mx-auto bg-gray-800 p-6 md:p-8 rounded-xl shadow-lg border border-gray-700 backdrop-filter backdrop-blur-sm bg-opacity-60 animate-fade-in flex flex-col min-h-[70vh]">
      <h2 className="text-3xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400">
        Find Your Ideal Career Path
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 flex-shrink-0">
        {/* Category/Stream Dropdown */}
        <div className="relative">
          <label htmlFor="category" className="block text-gray-300 text-lg font-medium mb-2">
            Select Category / Stream:
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 appearance-none pr-8"
          >
            <option value="" disabled>Choose a category</option>
            <option value="Science">Science</option>
            <option value="Commerce">Commerce</option>
            <option value="Arts">Arts</option>
            <option value="Diploma">Diploma</option>
            <option value="Non-Tech">Non-Tech</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400 mt-8">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
          </div>
        </div>

        {/* Coding Knowledge Dropdown */}
        <div className="relative">
          <label htmlFor="codingKnowledge" className="block text-gray-300 text-lg font-medium mb-2">
            Do you have coding knowledge?
          </label>
          <select
            id="codingKnowledge"
            value={codingKnowledge}
            onChange={(e) => setCodingKnowledge(e.target.value)}
            className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 appearance-none pr-8"
          >
            <option value="" disabled>Select an option</option>
            <option value="Yes">Yes (Experienced)</option>
            <option value="Beginner">Beginner</option>
            <option value="No">No</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400 mt-8">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
          </div>
        </div>
      </div>

      {/* Career Suggestions Display */}
      {careerSuggestions.length > 0 && (
        <div className="mt-10 flex-grow overflow-y-auto custom-scrollbar p-2 -mx-2"> {/* Added flex-grow and scroll */}
          <h3 className="text-2xl font-bold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-red-400">
            Suggested Career Paths:
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {careerSuggestions.map((career, index) => (
              // No longer passing fetchCareerDetails or fetchInterviewQuestions
              <CareerSuggestionCard key={index} career={career} />
            ))}
          </div>
        </div>
      )}

      {careerSuggestions.length === 0 && category && codingKnowledge && (
        <p className="text-center text-gray-400 text-lg mt-8 flex-shrink-0">
          No specific suggestions for this combination yet. Try different options or use the AI Chat Assistant for more personalized advice!
        </p>
      )}
    </section>
  );
};

export default CareerSelector;
