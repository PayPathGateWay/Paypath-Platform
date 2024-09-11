import React from 'react';
import MainApp from './Routes/Router';


const App: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
          <MainApp />
      </main>
    </div>
  );
};

export default App;