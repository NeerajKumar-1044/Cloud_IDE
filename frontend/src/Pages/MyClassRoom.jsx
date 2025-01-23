import React, { useEffect, useCallback, useState } from 'react';
import { getAllClassRooms } from '../../server/server.js';
import ClassCard from '../Components/ClassCard.jsx';
import { useNavigate } from 'react-router-dom';

function MyClassRoom() {
  const navigate = useNavigate();
  const [Data, setData] = useState([]);

  const fetchData = useCallback(async () => {
    const data = await getAllClassRooms();
    setData(data);
    // console.log(data);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className='flex flex-wrap justify-center gap-4 p-4'>
      {Data?.map((item) => (
        <ClassCard 
          key={item._id} 
          name={item.name}
        />
      ))}
      <ClassCard 
        name='Create New ClassRoom'
        class_Name={'bg-green-500'}
        onClick={() => navigate('/user/create-class')}
      />
    </div>
  );
}

export default MyClassRoom;
