import React, { useEffect, useState } from 'react';
import { logo } from "@/Utils/Index";

const LoadingIntro: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000); // Simulate 5-second loading time
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`loading-intro ${loading ? 'active' : 'hidden'}`}>
        <img src={logo} alt="Logo" />
      <div className="timeline">
        <div className="progress"></div>
      </div>
    </div>
  );
};

export default LoadingIntro;
