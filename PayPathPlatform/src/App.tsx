import React from 'react';
import MainApp from './Routes/Router';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
          <ToastContainer />
          <MainApp />
      </main>
    </div>
  );
};

export default App;