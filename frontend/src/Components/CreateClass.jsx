import React, { useState, useEffect } from 'react';
import { useUser } from '../Store/zustand';
import { CreateClassRoom } from '../../server/server.js';
import Loading from '../Components/Loading.jsx';

function CreateClass() {
    const [subowners, setSubowners] = useState([]);
    const [subownerInput, setSubownerInput] = useState('');
    const user = useUser((state) => state.user);

    const [classroomName, setClassroomName] = useState('');
    const [classroomCode, setClassroomCode] = useState('');

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [response, setResponse] = useState(null);

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            setLoading(true);
            if (!user) {
                console.log("User not logged in");
                return;
            }
            const data = {
                owner: user._id,
                name: classroomName,
                joinCode: classroomCode,
                subowners: subowners,
            };
            console.log("data in page:- ", data);
            if (!data.name || !data.joinCode) {
                console.log("Please fill all the fields");
                return;
            }
            const res = await CreateClassRoom(data);
            setResponse(res);
            setLoading(false);
            setSuccess(true);
            console.log("response in page:- ", res); // Use res directly
        } catch (error) {
            console.error('Error while creating classroom:', error);
            setError('Error while creating classroom:', error);
            setLoading(true);
            setSuccess(false);
        }
    };

    const addSubowner = () => {
        const trimmedSubownerInput = subownerInput.trim();
        if (trimmedSubownerInput && !subowners.includes(trimmedSubownerInput)) {
            setSubowners([...subowners, trimmedSubownerInput]);
            setSubownerInput('');
        }
    };

    const removeSubowner = (subowner) => {
        setSubowners(subowners.filter((item) => item !== subowner));
    };

    return (
        <>
            {loading ? (
                error ? (
                    <div className="flex justify-center items-center bg-gray-50 min-h-screen p-4">
                        <div className="max-w-lg w-full bg-white shadow-lg rounded-lg p-6 space-y-6">
                            <h2 className="text-2xl font-semibold text-gray-800 text-center">
                                Error
                            </h2>
                            <p className="text-sm text-gray-500 text-center">
                                {error}
                            </p>
                        </div>
                    </div>
                ) : (
                    <Loading />
                )
            ) : (
                success ? (
                    <div className="flex justify-center items-center bg-gray-50 min-h-screen p-4">
                        <div className="max-w-lg w-full bg-white shadow-lg rounded-lg p-6 space-y-6">
                            <h2 className="text-2xl font-semibold text-gray-800 text-center">
                                Classroom Created Successfully
                            </h2>
                            <p className="text-sm text-gray-500 text-center">
                                Your classroom has been created successfully.
                            </p>
                            <div className="text-center">
                                <button
                                    onClick={() => setSuccess(false)}
                                    className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-6 py-3"
                                >
                                    Create Another Classroom
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="flex justify-center items-center bg-gray-50 min-h-screen p-4">
                        <form
                            className="max-w-lg w-full bg-white shadow-lg rounded-lg p-6 space-y-6"
                            onSubmit={(e) => handleSubmit(e)}
                        >
                            {/* Header */}
                            <h2 className="text-2xl font-semibold text-gray-800 text-center">
                                Create a New Classroom
                            </h2>
                            <p className="text-sm text-gray-500 text-center">
                                Fill out the details to create a new classroom.
                            </p>

                            {/* Classroom Name Field */}
                            <div className="relative z-0 w-full group">
                                <input
                                    type="text"
                                    name="classroom-name"
                                    id="classroom-name"
                                    className="block py-3 px-4 w-full text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                                    placeholder="Classroom Name"
                                    required
                                    onChange={(e) => setClassroomName(e.target.value)}
                                />
                            </div>

                            {/* Classroom Code Generation */}
                            <div className="relative z-0 w-full group">
                                <label
                                    htmlFor="classroom-code"
                                    className="block text-sm font-medium text-gray-700 mb-2"
                                >
                                    Classroom Code
                                </label>
                                <div className="flex items-center space-x-2">
                                    <input
                                        type="text"
                                        name="classroom-code"
                                        id="classroom-code"
                                        className="block py-3 px-4 flex-grow text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                                        placeholder="Classroom Code"
                                        onChange={(e) => setClassroomCode(e.target.value)}
                                    />
                                </div>
                            </div>

                            {/* Sub-owners Field */}
                            <div className="relative z-0 w-full group">
                                <label
                                    htmlFor="subowners"
                                    className="block text-sm font-medium text-gray-700 mb-2"
                                >
                                    Add Sub-owners (Optional)
                                </label>
                                <div className="flex items-center space-x-2">
                                    <input
                                        type="email"
                                        name="subowners"
                                        id="subowners"
                                        className="block py-3 px-4 w-full text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                                        placeholder="Enter email and press Enter"
                                        value={subownerInput}
                                        onChange={(e) => setSubownerInput(e.target.value)}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                e.preventDefault();
                                                addSubowner();
                                            }
                                        }}
                                    />
                                    <button
                                        type="button"
                                        onClick={addSubowner}
                                        className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
                                    >
                                        Add
                                    </button>
                                </div>
                                {subowners.length > 0 && (
                                    <ul className="mt-2 text-sm text-gray-600">
                                        {subowners.map((subowner, index) => (
                                            <li key={index} className="flex justify-between items-center">
                                                <span>{subowner}</span>
                                                <button
                                                    type="button"
                                                    onClick={() => removeSubowner(subowner)}
                                                    className="text-red-600 hover:text-red-800"
                                                >
                                                    Remove
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>

                            {/* Submit Button */}
                            <div className="text-center">
                                <button
                                    type="submit"
                                    className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-6 py-3"
                                >
                                    Create Classroom
                                </button>
                            </div>
                        </form>
                    </div>
                )
            )}
        </>
    );
}

export default CreateClass;
