import React from 'react'

function ContestTemplate({
    title="Contest 1",
    date="today",
    status="upcoming"
}) {
  return (
    <div className='w-full bg-white p-4 rounded-lg shadow-md border border-gray-300 transition-transform transform 
    hover:scale-y-105 hover:shadow-lg hover:scale-95 hover:border-gray-400 hover:bg-gray-50 cursor-pointer'>
        <div className='flex justify-between items-center '>
            <div className='flex flex-col gap-1'>
            <h1 className='text-2xl font-bold'>{title}</h1>
            <p className='text-sm text-gray-400 ml-3'>{date}</p>
            </div>
            <p className={`${status=='upcoming'?'text-green-500': 'text-red-500'} 'text-sm'`}>{status}</p>
        </div>
    </div>
  )
}

export default ContestTemplate