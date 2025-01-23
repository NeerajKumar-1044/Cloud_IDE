import React, { useState } from 'react';
import { useUser } from '../Store/zustand.js';
import Loading from './Loading.jsx';
import {joinClassRoom} from '../../server/server.js';
import { useNavigate } from 'react-router-dom';

function JoinClass() {
    const user = useUser((state) => state.user);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [classroomCode, setClassroomCode] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Input Validation
        if (!user) {
            alert("User not logged in 🥲");
            return;
        }
        if (!classroomCode.trim()) {
            alert("Classroom Code not provided 🥲");
            return;
        }

        try {
            setLoading(true);
            setError('');

            const res = await joinClassRoom(classroomCode);
            if(res){
                setSuccess(true);
                navigate('/user/classrooms');
            }

        } catch (err) {
            console.error('Error while joining classroom:', err);
            setError('Failed to join the classroom. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    // Reset form state
    const resetForm = () => {
        setClassroomCode('');
        setSuccess(false);
        setError('');
    };

    return (
        <>
            {loading ? (
                <Loading />
            ) : success ? (
                <div className="flex justify-center items-center bg-gray-50 min-h-screen p-4">
                    <div className="max-w-lg w-full bg-white shadow-lg rounded-lg p-6 space-y-6">
                        <h2 className="text-2xl font-semibold text-gray-800 text-center">
                            Classroom Joined Successfully
                        </h2>
                        <p className="text-sm text-gray-500 text-center">
                            You have been enrolled in the new classroom successfully.
                        </p>
                        <div className="text-center">
                            <button
                                onClick={resetForm}
                                className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-6 py-3"
                            >
                                Join Another Classroom
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex justify-center items-center bg-gray-50 min-h-screen p-4">
                    <form
                        className="max-w-lg w-full bg-white shadow-lg rounded-lg p-6 space-y-6"
                        onSubmit={handleSubmit}
                    >
                        <h2 className="text-2xl font-semibold text-gray-800 text-center">
                            Join a New Classroom
                        </h2>
                        <p className="text-sm text-gray-500 text-center">
                            Fill out the details to join a new classroom.
                        </p>

                        {/* Error Display */}
                        {error && (
                            <div className="text-sm text-red-500 text-center">
                                {error}
                            </div>
                        )}

                        {/* Classroom Code Input */}
                        <div className="relative z-0 w-full group">
                            <label
                                htmlFor="classroom-code"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Classroom Code
                            </label>
                            <input
                                type="text"
                                name="classroom-code"
                                id="classroom-code"
                                value={classroomCode}
                                onChange={(e) => setClassroomCode(e.target.value)}
                                className="block py-3 px-4 w-full text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                                placeholder="Classroom Code"
                            />
                        </div>

                        {/* Submit Button */}
                        <div className="text-center">
                            <button
                                type="submit"
                                className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-6 py-3"
                            >
                                Join Classroom
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </>
    );
}

export default JoinClass;
