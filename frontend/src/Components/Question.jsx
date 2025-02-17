import React from 'react'

function Question({
    points=0,
    title="Question Title",
    level="Medium"
}) {


  return (
    <div className='w-full bg-white p-4 rounded-lg shadow-md border border-gray-300 transition-transform transform 
    hover:scale-y-105 hover:shadow-lg hover:scale-95 hover:border-gray-400 hover:bg-gray-50 cursor-pointer'>
          <div className='flex justify-between items-center'>
              <div className=''>
                {points}
              </div>

                <div className='text-gray-500 text-base'>
                    {title}
                </div>
                <div className={`${level == 'Easy' ? "text-green-500" : level==="Medium"?"text-yellow-500":"text-red-600"}`}>
                    {level}
                </div>
          </div> 
    </div>
  )
}

export default Question