import React, {useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { healthCheck } from '../server/server';

function HomePage() {
    const navigate = useNavigate();

    useEffect(() => {
        healthCheck().then((response) => {
            console.log(response.data);
        }
        ).catch((error) => {
            console.error('Error while checking health:', error);
        });
    }, []);
    
  return (
    <div className='w-full h-screen bg-gray-100 flex flex-col'>
      {/* Header Section */}
      <div className='w-full flex flex-col items-center border-b-2 border-gray-300 py-6'>
        <h1 className='text-4xl font-extrabold text-gray-800'>
          HomePage
        </h1>
      </div>

      {/* Main Button Section */}
      <div className='flex-grow flex justify-center items-center mt-8'>
        <button className='text-2xl bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-lg shadow-lg hover:from-blue-600 hover:to-blue-500 transition-all duration-300'
        onClick={() => navigate('/main')}>
          Start Coding
        </button>
      </div>
    </div>
  )
}

export default HomePage
