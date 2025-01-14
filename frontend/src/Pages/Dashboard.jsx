import React from 'react';
import Navbar from '../Components/Navbar';
import Question from '../Components/Question';

function Dashboard() {
    return (
        <div className='bg-gray-100 h-screen'>
            
            <div className="flex justify-center items-center bg-gray-100">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-xl mt-10 mb-10">
                    <div
                        className="h-36 flex justify-center items-center p-8 border border-gray-300 bg-white text-2xl font-bold rounded-lg shadow-md transition-transform transform hover:scale-110 hover:shadow-lg cursor-pointer"
                    >
                        <h2 className="text-gray-700">Join ClassRoom</h2>
                    </div>
                    <div
                        className="h-36 flex justify-center items-center p-8 border border-gray-300 bg-white text-2xl font-bold rounded-lg shadow-md transition-transform transform hover:scale-110 hover:shadow-lg cursor-pointer"
                    >
                        <h2 className="text-gray-700">Create ClassRoom</h2>
                    </div>
                </div>
            </div>

            <div className='flex flex-col gap-2 justify-center items-center p-5'>
                <Question status='solved' title='Two Sum' level='Easy' />
                <Question status='unsolved' title='Next Permutation' level='Medium' />
                <Question status='unsolved' title='Rain Water' level='Hard' />
                <Question status='solved' title='Add Two Numbers' level='Easy' />
                <Question status='unsolved' title='Interger To Roman' level='Medium' />
                <Question status='unsolved' title='Valid Paranthesis' level='Hard' />
            </div>

        </div>
    )
}

export default Dashboard