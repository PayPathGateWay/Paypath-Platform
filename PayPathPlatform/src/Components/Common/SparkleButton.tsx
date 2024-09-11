const SparkleButton = ({ onClick, isClicked = false }:any) => {
  return (
    <div className="relative group">
      <button
        className={`w-[420px] relative px-6 py-3 text-black font-semibold rounded-lg overflow-hidden shadow-lg transition-all duration-300
          ${isClicked ? 'bg-green-500' : 'bg-white'} 
          ${isClicked ? 'group-hover:scale-100' : 'group-hover:scale-105'} 
          ${isClicked ? 'text-white' : 'group-hover:text-white'}
        `}
        onClick={onClick}
      >
        <span
          className={`absolute inset-0 w-full h-full bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 opacity-0 
            ${isClicked ? 'opacity-0' : 'group-hover:opacity-100'}
            transition-opacity duration-500
          `}
        ></span>
        {/* <span
          className={`absolute w-6 h-6 bg-blue-400 rounded-full top-0 left-0 opacity-0 
            ${isClicked ? 'opacity-0' : 'group-hover:opacity-100'} 
            transition-transform transform -translate-x-10 translate-y-10 rotate-45
          `}
        ></span> */}
        <svg
          className="absolute right-2 bottom-[1%] w-12 h-12 text-blue-800 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14.187 8.096L15 5.25L15.813 8.096C16.0231 8.83114 16.4171 9.50062 16.9577 10.0413C17.4984 10.5819 18.1679 10.9759 18.903 11.186L21.75 12L18.904 12.813C18.1689 13.0231 17.4994 13.4171 16.9587 13.9577C16.4181 14.4984 16.0241 15.1679 15.814 15.903L15 18.75L14.187 15.904C13.9769 15.1689 13.5829 14.4994 13.0423 13.9587C12.5016 13.4181 11.8321 13.0241 11.097 12.814L8.25 12L11.096 11.187C11.8311 10.9769 12.5006 10.5829 13.0413 10.0423C13.5819 9.50162 13.9759 8.83214 14.186 8.097L14.187 8.096Z"
            fill="white"
            stroke="white"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className="relative z-10 -left-44 group-hover:text-white">Login</span>

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
          className={`absolute top-[45%] right-[3rem] pointer-events-none flex justify-center items-center opacity-0 
            ${isClicked ? 'opacity-0' : 'group-hover:opacity-100'}
            transition-opacity duration-2000
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
