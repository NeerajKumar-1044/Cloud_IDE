import React from 'react';
import ContestTemplate from '../Components/ContestTemplate';

function Contest() {
  return (
    <div className='h-full flex flex-col justify-center items-center m-5 p-5 border-2 border-gray-200
    rounded-2xl bg-gray-200 shadow-sm gap-3'>
      <ContestTemplate title="Contest 1" date="12-1-2025" status="upcoming" />
      <ContestTemplate title="Contest 2" date="1-1-2025" status="ended" />
      <ContestTemplate title="Contest 3" date="10-1-2025" status="ended" />
      <ContestTemplate title="Contest 4" date="20-1-2025" status="upcoming" />
      <ContestTemplate title="Contest 5" date="10-1-2025" status="ended" />
    </div>
  )
}

export default Contest