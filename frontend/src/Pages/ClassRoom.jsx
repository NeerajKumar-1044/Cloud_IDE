import React, {useCallback, useEffect, useState} from 'react';
import {getEnrolledClassrooms} from '../../server/server.js';
import { useNavigate } from 'react-router-dom';
import ClassCard from '../Components/ClassCard.jsx';

function ClassRoom() {

  const [classrooms, setClassrooms] = useState([]);
  const navigate = useNavigate();
  const fetchEnrolledClassrooms = useCallback(async () => {
    try {
      const enrolledClassrooms = await getEnrolledClassrooms();
      console.log(enrolledClassrooms);
      setClassrooms(enrolledClassrooms);
    } catch (error) {
      console.error('Error while fetching enrolled classrooms:', error);
    }
  }, []);

  useEffect(() => {
    fetchEnrolledClassrooms();
  }, [fetchEnrolledClassrooms]);


  return (
    <>
      <div className='flex flex-wrap justify-center gap-4 p-4'>
      {classrooms?.map((item) => (
        <ClassCard 
          key={item._id} 
          name={item.name}
        />
      ))}
      <ClassCard 
        name='Join a New ClassRoom'
        class_Name={'bg-green-500'}
        onClick={() => navigate('/user/join-class')}
      />
    </div>
    </>
  )
}

export default ClassRoom