import React, {useState, useEffect} from 'react';
import Question from '../Components/Question';
import { useNavigate } from 'react-router-dom';
import {getAllQuestions} from '../../server/server.js';

function Dashboard() {

    const navigate = useNavigate();
    const [Questions, setQuestions] = useState([]);

    const fetchQuestions = async () => {
        try {
            const res = await getAllQuestions();
            setQuestions(res?.Questions);
        } catch (err) {
            console.error('Error while fetching questions:', err);
        }
    }

    useEffect(() => {
        if(Questions.length === 0) {
            fetchQuestions();
        }
    }
    , []);

    return (
        <div className='bg-gray-100 h-screen'>
            <div className="flex justify-center items-center bg-gray-100">
                <div className="flex justify-center gap-6 w-full mt-10 mb-10">
                    <div
                        className="h-36 flex w-52 justify-center items-center border border-gray-300 bg-white text-2xl 
                        font-bold rounded-lg shadow-md transition-transform transform hover:scale-110 hover:shadow-lg cursor-pointer"
                        onClick={()=> {
                            console.log('Create ClassRoom');
                            navigate('/user/join-class')
                        }}
                    >
                        <h2 className="text-gray-700 text-center w-[100%]">Join ClassRoom</h2>
                    </div>
                    <div
                        className="h-36 w-52 flex justify-center items-center p-8 border border-gray-300 bg-white text-2xl font-bold rounded-lg shadow-md transition-transform transform hover:scale-110 hover:shadow-lg cursor-pointer"
                        onClick={()=> {
                            console.log('Create ClassRoom');
                            navigate('/user/create-class')
                        }}
                    >
                        <h2 
                        className="text-gray-700 text-center w-[100%]"
                        >Create ClassRoom</h2>
                    </div>

                    <div
                        className="h-36 w-52 flex justify-center items-center p-8 border border-gray-300 bg-white text-2xl font-bold rounded-lg shadow-md transition-transform transform hover:scale-110 hover:shadow-lg cursor-pointer"
                        onClick={()=> {
                            console.log('Create ClassRoom');
                            navigate('/user/add-new-question')
                        }}
                    >
                        <h2 
                        className="text-gray-700 text-center w-[100%]"
                        >Add a Question</h2>
                    </div>
                </div>
            </div>

            <div className='flex flex-col gap-2 justify-center items-center p-5'>
                
                {/* <Question status='solved' title='Two Sum' level='Easy' /> */}

                <ul className='flex flex-col gap-2 w-full h-full overflow-scroll'>
  {Questions?.map((question, index) => (
    <li
      key={index}
      className='flex justify-center items-center w-full'
      onClick={() => navigate(`/user/question-page/${question?._id}`)}
    >
      <Question points={question?.points} title={question?.title} level={question?.status} />
    </li>
  ))}
</ul>

                
            </div>

        </div>
    )
}

export default Dashboard