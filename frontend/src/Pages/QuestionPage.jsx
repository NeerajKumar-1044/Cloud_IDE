import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-github";
import { getQuestionById } from '../../server/server.js';
import Loading from '../Components/Loading.jsx';

function QuestionPage() {
    const { id } = useParams();
    const timeoutId = useRef(null);
    const [CodeTemplate, setCodeTemplate] = useState('// Write Code Here');
    const [Title, setTitle] = useState('New Question');
    const [Points, setPoints] = useState(10);
    const [Deadline, setDeadline] = useState(null);
    const [Status, setStatus] = useState('Medium');
    const [Description, setDescription] = useState('');
    const [SampleInput, setSampleInput] = useState(null);
    const [SampleOutput, setSampleOutput] = useState(null);
    const [loading, setLoading] = useState(true);
    const [leftWidth, setLeftWidth] = useState(50); // Initial width percentage for the left section
    const navigate = useNavigate();

    const onChange = (newValue) => {
        if (timeoutId.current) clearTimeout(timeoutId.current);
        timeoutId.current = setTimeout(() => {
            setCodeTemplate(newValue);
        }, 3000);
    };

    const fetchQuestion = async () => {
        try {
            const response = await getQuestionById(id);
            if (response) {
                setTitle(response.title);
                setPoints(response.points);
                setDeadline(response.deadline);
                setStatus(response.status);
                setDescription(response.description);
                setSampleInput(response.sampleInput);
                setSampleOutput(response.sampleOutput);
                setCodeTemplate(response.codeTemplate);
            }
        } catch (error) {
            console.error("Error fetching question:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchQuestion();
    }, [id]);

    const handleMouseDown = (e) => {
        const startX = e.clientX;

        const handleMouseMove = (event) => {
            const deltaX = event.clientX - startX;
            const newLeftWidth = ((leftWidth * window.innerWidth) / 100 + deltaX) / window.innerWidth * 100;
            if (newLeftWidth > 20 && newLeftWidth < 80) { // Limit resizing range between 20% and 80%
                setLeftWidth(newLeftWidth);
            }
        };

        const handleMouseUp = () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    };

    const handleSubmit = async () => {
        console.log("Submitting code...");
        // Add API or submission logic here
    };

    const handleRun = async () => {
        console.log("Running code...");
        // Add logic to run code
    };

    return (
        <>
            {loading ? (
                <Loading />
            ) : (
                <div className="flex flex-col items-center w-full h-screen mt-4">
                    <div className="flex gap-4 mb-4">
                        <button onClick={handleRun} className="bg-blue-500 text-white px-4 py-2 rounded-lg">
                            Run
                        </button>
                        <button onClick={handleSubmit} className="bg-green-500 text-white px-4 py-2 rounded-lg">
                            Submit
                        </button>
                    </div>
                    <div className="flex w-full h-full">
                        {/* Left Section: Description */}
                        <div
                            className="h-full border-2 border-gray-400 rounded-xl p-4"
                            style={{ width: `${leftWidth}%` }}
                        >
                            <div className="flex flex-col gap-4">
                                <div className="flex justify-between items-center">
                                    <h2 className="text-2xl font-bold">{Title}</h2>
                                    <div
                                        className={`${Status === 'Easy'
                                                ? 'text-green-500'
                                                : Status === 'Medium'
                                                    ? 'text-yellow-500'
                                                    : 'text-red-600'
                                            } font-semibold`}
                                    >
                                        <span className="text-gray-500 mr-2">{Points}</span>
                                        {Status}
                                    </div>
                                </div>
                                {Description && (
                                    <div className="border-2 border-gray-400 p-2 rounded-lg">
                                        {Description}
                                    </div>
                                )}
                                {Deadline && <p>Deadline: {Deadline}</p>}
                                {SampleInput && (
                                    <div>
                                        <h3 className="font-semibold">Sample Input</h3>
                                        <div className="border-2 border-gray-400 p-2 rounded-lg">
                                            {SampleInput}
                                        </div>
                                    </div>
                                )}
                                {SampleOutput && (
                                    <div>
                                        <h3 className="font-semibold">Sample Output</h3>
                                        <div className="border-2 border-gray-400 p-2 rounded-lg">
                                            {SampleOutput}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Resizable Divider */}
                        <div
                            className="w-1 cursor-col-resize h-full flex flex-col items-center justify-center"
                            onMouseDown={handleMouseDown}
                        >
                            <div className='h-10 w-2 bg-gray-500 border rounded-2xl'></div>
                        </div>

                        {/* Right Section: Code Editor */}
                        <div
                            className="h-full border-2 border-gray-400 rounded-xl p-4 flex flex-col"
                            style={{ width: `${100 - leftWidth}%` }}
                        >
                            {/* Code Editor Section */}
                            <div className="flex-grow" style={{ minHeight: '50px' }}>
                                <AceEditor
                                    mode="java"
                                    theme="github"
                                    onChange={onChange}
                                    value={CodeTemplate}
                                    name="CodeEditor"
                                    editorProps={{ $blockScrolling: true }}
                                    style={{ width: '100%', height: '100%' }}
                                    fontSize={16}
                                    setOptions={{
                                        fontFamily: 'monospace',
                                        showGutter: true,
                                        scrollPastEnd: true,
                                        showPrintMargin: false,
                                    }}
                                />
                            </div>

                            {/* Resizable Test Cases Section */}
                            <div
                                className="relative bg-gray-100 border-t-2 border-gray-400 h-[20vh]"

                            >
                                <textarea
                                    className="w-full h-full p-2 text-sm border-none rounded-lg focus:outline-none resize-none"
                                    placeholder="Enter test cases here..."
                                />
                            </div>
                        </div>

                    </div>
                </div>
            )}
        </>
    );
}

export default QuestionPage;
