import React from 'react';

function ClassCard({ name, class_Name, onClick }) {
    return (
        <div 
            className={`w-64 h-40 bg-gradient-to-r from-blue-400 via-blue-500
                 to-indigo-600 rounded-xl shadow-lg transform hover:scale-105 hover:shadow-xl transition-all 
                 duration-300 ease-in-out cursor-pointer ${class_Name}`} 
            onClick={onClick}
        >
            {/* Card Content */}
            <div className="p-4 flex flex-col justify-center items-center h-full text-white">
                {/* Header: Classroom Name */}
                <h3 className="text-xl font-semibold text-center mb-2">{name}</h3>
            </div>
        </div>
    );
}

export default ClassCard;
