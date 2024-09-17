import React from 'react';
import MainApp from './Routes/Router';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

const App: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow"> 
         <ToastContainer/>
          <MainApp />
      </main>
    </div>
  );
};

export default App;