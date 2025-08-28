import React from 'react';
import { X } from 'lucide-react';

const Modal = ({ title, children, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 p-6 rounded-xl shadow-2xl border border-gray-700 max-w-3xl w-full max-h-[90vh] overflow-y-auto relative">
        <h3 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 pr-10">{title}</h3>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-gray-700 hover:bg-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>
        <div className="text-gray-200 text-base leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
