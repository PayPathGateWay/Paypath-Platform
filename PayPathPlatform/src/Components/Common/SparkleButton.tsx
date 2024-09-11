import React from 'react';

interface SparkleButtonProps {
  setIsClicked: (clicked: boolean) => void;
  isClicked: boolean;
}

const SparkleButton: React.FC<SparkleButtonProps> = ({ setIsClicked, isClicked }) => {
  const handleClick = () => {
    
  };
  return (
    <div className="relative group">
      <button
        className={`w-[420px] relative px-6 py-3 text-black font-semibold rounded-lg overflow-hidden shadow-lg transition-all duration-300
          ${isClicked ? 'bg-green-500' : 'bg-white'} 
          ${isClicked ? 'group-hover:scale-100' : 'group-hover:scale-105'} 
          ${isClicked ? 'text-white' : 'group-hover:text-white'}
        `}
        onClick={handleClick}
      >
        <span
          className={`absolute inset-0 w-full h-full bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 opacity-0 
            ${isClicked ? 'opacity-0' : 'group-hover:opacity-100'}
            transition-opacity duration-500
          `}
        ></span>
        <span
          className={`absolute w-6 h-6 bg-blue-400 rounded-full top-0 left-0 opacity-0 
            ${isClicked ? 'opacity-0' : 'group-hover:opacity-100'} 
            transition-transform transform -translate-x-10 translate-y-10 rotate-45
          `}
        ></span>
        <span className="relative z-10">Login</span>

        {/* Check mark icon */}
        {isClicked && (
          <svg
            className="absolute top-1/2 right-0 w-12 h-12 text-green-500 transform -translate-x-1/2 -translate-y-1/2 transition-opacity duration-500"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21 6L9 18L3 12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}

        <div
          className={`absolute top-[40%] right-20 pointer-events-none flex justify-center items-center opacity-0 
            ${isClicked ? 'opacity-0' : 'group-hover:opacity-100'}
            transition-opacity duration-500
          `}
        >
          <div className="w-3 h-3 bg-white rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-white rounded-full animate-bounce ml-2"></div>
          <div className="w-3 h-3 bg-white rounded-full animate-bounce ml-2"></div>
        </div>
      </button>
    </div>
  );
};

export default SparkleButton;
