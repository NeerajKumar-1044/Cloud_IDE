import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { healthCheck, healthCheckApiServer } from '../server/server';

function HomePage() {
  const navigate = useNavigate();
  const [status, setStatus] = useState('Connecting to Server...');
  const [statusDashboard, setstatusDashboard] = useState('Connecting to api-Server...');

  useEffect(() => {
    healthCheckApiServer()
      .then((response) => {
        if (response.data) {
          setstatusDashboard('Go to Dashboard');
        }
      })
      .catch((error) => {
        console.error('Error while checking health:', error);
      });
  }, []);

  useEffect(() => {
    healthCheck()
      .then((response) => {
        if (response.data) {
          setStatus('Start Coding');
        }
      })
      .catch((error) => {
        console.error('Error while checking health:', error);
      });
  }, []);

  return (
    <div className="w-full h-screen bg-gradient-to-b from-gray-50 to-gray-200 flex flex-col">
      {/* Header Section */}
      <div className="w-full flex flex-col items-center border-b border-gray-300 py-6 shadow-sm">
        <h1 className="text-5xl font-bold text-gray-800 tracking-tight">
          Welcome to HomePage
        </h1>
        <p className="text-gray-500 text-lg mt-2">Your coding journey starts here</p>
      </div>

      {/* Main Button Section */}
      <div className="flex-grow flex flex-col justify-center items-center gap-3">
      

        <button
          className={`text-2xl w-60 h-20 bg-blue-600 text-white px-6 py-3 rounded-3xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:bg-blue-500 ${
            statusDashboard !== 'Go to Dashboard'
              ? 'opacity-50 cursor-not-allowed'
              : 'hover:bg-blue-500'
          }`}
          onClick={() => navigate('/user/dashboard')}
          disabled={statusDashboard !== 'Go to Dashboard'}
        >
          {statusDashboard}
        </button>
        <button
          className={`text-2xl w-60 h-20 bg-blue-600 text-white px-6 py-3 rounded-3xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:bg-blue-500 ${
            status !== 'Start Coding'
              ? 'opacity-50 cursor-not-allowed'
              : 'hover:bg-blue-500'
          }`}
          onClick={() => navigate('/main')}
          disabled={status !== 'Start Coding'}
        >
          {status}
        </button>
      </div>

      

      {/* Footer Section */}
      <div className="w-full flex items-center justify-center py-4 bg-gray-100 border-t border-gray-300 text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} CodePlatform.
      </div>
    </div>
  );
}

export default HomePage;
