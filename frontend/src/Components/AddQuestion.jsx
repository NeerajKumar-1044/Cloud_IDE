import React, {useState, useRef} from 'react';
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-github";
import {CreateQuestion} from '../../server/server.js';
import { useNavigate } from 'react-router-dom';

function AddQuestion() {
    const timeoutId = useRef(null);
    const [CodeTemplate, setCodeTemplate] = useState('// Add CodeTemplate');
    const [Title, setTitle] = useState('New Question');
    const [Label, setLabel] = useState('Public');
    const [Points, setPoints] = useState(10);
    const [Deadline, setDeadline] = useState(null); // this is a data and time feild
    const [Language, setLanguage] = useState('CPP');
    const [Status, setStatus] = useState('Medium');
    const [Description, setDescription] = useState('');
    const [SampleInput, setSampleInput] = useState(null);
    const [SampleOutput, setSampleOutput] = useState(null);
    const [Testcases, setTestcases] = useState(null);
    const [Memory, setMemory] = useState('1024');
    const [Time, setTime] = useState('5000');
    const navigate = useNavigate();
    function onChange(newValue) {
        if (newValue) {
            if (timeoutId.current) {
                clearTimeout(timeoutId.current);
            }
            timeoutId.current = setTimeout(() => {
                setCodeTemplate(newValue);
            }, 3000);
        } else {
            if (timeoutId.current) {
                clearTimeout(timeoutId.current);
            }
        }
    }



    const handleSubmit = async(e) => {
        e.preventDefault();
        const questionData = {
            title: Title,
            label: Label,
            points: Points,
            deadline: Deadline,
            language: Language,
            status: Status,
            description: Description,
            sampleInput: SampleInput,
            sampleOutput: SampleOutput,
            testCases: Testcases,
            MemoryLimit: Memory,
            TimeLimit: Time,
            codeTemplate: CodeTemplate,
        };

        if(!Title || !Label || !Points || !Language || !Status || !Description) {
            alert('Please fill all the fields');
            return;
        }

        try {
            const res = await CreateQuestion(questionData);
            console.log(res);
            navigate('/user/dashboard');
        } catch (error) {
            console.log(error);
        }
        
    }
    

    return (
        <div className='w-full h-full grid grid-cols-2 gap-4 p-4'>

            {/* Left Section: Form */}
            <div className='w-full h-full border-2 border-gray-400 rounded-xl p-4'>
                <form className='flex flex-col w-full h-full'
                    onSubmit={(e) => handleSubmit(e)}>

                    {/* Title */}
                    <div className='flex flex-col items-center w-full mb-6'>
                        <label htmlFor="title" className='text-3xl font-bold mb-2'>Title</label>
                        <input
                            type="text"
                            id="title"
                            placeholder='Add title'
                            className='w-10/12 border-2 border-gray-300 h-10 px-4 rounded-lg focus:outline-none'
                            onChange={(e) => setTitle(e.target.value)}
                            required = {true}
                        />
                    </div>

                    {/* Labels */}
                    <div className='flex justify-between w-full mb-6'>
                        <div className='w-1/2 pr-2'>
                            <label htmlFor="label" className='block mb-2 font-medium'>Label</label>
                            <select
                                id="label"
                                className='w-full border-2 border-gray-300 h-10 px-2 rounded-lg focus:outline-none'
                                onChange={(e) => setLabel(e.target.value)}
                                required = {true}>
                                <option value="Public">Public</option>
                                <option value="Private">Private</option>
                            </select>
                        </div>
                        <div className='w-1/2 pl-2'>
                            <label htmlFor="points" className='block mb-2 font-medium'>Points</label>
                            <input
                                type="number"
                                id="points"
                                placeholder='Add Points'
                                className='w-full border-2 border-gray-300 h-10 px-4 rounded-lg focus:outline-none'
                                onChange={(e) => setPoints(e.target.value)}
                                required = {true}
                            />
                        </div>
                    </div>

                    {/* Deadline */}
                    <div className='w-full mb-6'>
                        <label htmlFor="deadline" className='block mb-2 font-medium'>Deadline</label>
                        <input
                            type="datetime-local"
                            id="deadline"
                            className='w-full border-2 border-gray-300 h-10 px-4 rounded-lg focus:outline-none'
                            onChange={(e) => setDeadline(e.target.value)}
                        />
                    </div>

                    {/* Language and Status */}
                    <div className='flex justify-between w-full mb-6'>
                        <div className='w-1/2 pr-2'>
                            <label htmlFor="language" className='block mb-2 font-medium'>Language</label>
                            <select
                                id="language"
                                className='w-full border-2 border-gray-300 h-10 px-2 rounded-lg focus:outline-none'
                                onChange={(e) => setLanguage(e.target.value)}
                                required = {true}>
                                <option value="CPP">C++</option>
                                <option value="Python">Python</option>
                                <option value="JavaScript">JavaScript</option>
                            </select>
                        </div>
                        <div className='w-1/2 pl-2'>
                            <label htmlFor="status" className='block mb-2 font-medium'>Status</label>
                            <select
                                id="status"
                                className='w-full border-2 border-gray-300 h-10 px-2 rounded-lg focus:outline-none'
                                onChange={(e) => setStatus(e.target.value)}
                                required = {true}>
                                <option value="Easy">Easy</option>
                                <option value="Medium">Medium</option>
                                <option value="Hard">Hard</option>
                            </select>
                        </div>
                    </div>

                    {/* Description */}
                    <div className='w-full mb-6'>
                        <label htmlFor="description" className='block mb-2 text-3xl font-bold'>Description</label>
                        <textarea
                            id="description"
                            placeholder='Add Description'
                            className='w-10/12 border-2 border-gray-300 h-24 px-4 rounded-lg focus:outline-none'
                            onChange={(e) => setDescription(e.target.value)}
                            required = {true}
                        ></textarea>
                    </div>

                    {/* Sample Input and Output */}
                    <div className='flex justify-between w-full mb-6'>
                        <div className='w-1/2 pr-2'>
                            <label htmlFor="sample-input" className='block mb-2 font-medium'>Sample Input</label>
                            <textarea
                                id="sample-input"
                                placeholder='Add Sample Input'
                                className='w-full border-2 border-gray-300 h-24 px-4 rounded-lg focus:outline-none'
                                onChange={(e) => setSampleInput(e.target.value)}
                            ></textarea>
                        </div>
                        <div className='w-1/2 pl-2'>
                            <label htmlFor="sample-output" className='block mb-2 font-medium'>Sample Output</label>
                            <textarea
                                id="sample-output"
                                placeholder='Add Sample Output'
                                className='w-full border-2 border-gray-300 h-24 px-4 rounded-lg focus:outline-none'
                                onChange={(e) => setSampleOutput(e.target.value)}
                            ></textarea>
                        </div>
                    </div>

                    {/* Testcases */}
                    <div className='w-full mb-6'>
                        <label htmlFor="testcases" className='block mb-2 font-medium'>Testcases</label>
                        <textarea
                            id="testcases"
                            placeholder='Add Testcases'
                            className='w-10/12 border-2 border-gray-300 h-24 px-4 rounded-lg focus:outline-none'
                            onChange={(e) => setTestcases(e.target.value)}
                        ></textarea>
                    </div>

                    

                    {/* Constraints */}
                    <div className='flex justify-between w-full mb-6'>
                        <div className='w-1/2 pr-2'>
                            <label htmlFor="Memory" className='block mb-2 font-medium'>Memory Limit</label>
                            <input
                                type="number"
                                id="Memory"
                                placeholder='Add Memory Limit in KBs'
                                className='w-full border-2 border-gray-300 h-10 px-4 rounded-lg focus:outline-none'
                                onChange={(e) => setMemory(e.target.value)}
                            />
                        </div>
                        <div className='w-1/2 pl-2'>
                            <label htmlFor="Time" className='block mb-2 font-medium'>Time Limit</label>
                            <input
                                type="number"
                                id="Time"
                                placeholder='Add TimeLimit in milliseconds'
                                className='w-full border-2 border-gray-300 h-10 px-4 rounded-lg focus:outline-none'
                                onChange={(e) => setTime(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className='w-full flex justify-center'>
                        <button
                            type="submit"
                            className='bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600'>
                            Submit Question
                        </button>
                    </div>
                </form>
            </div>

            {/* Right Section: Placeholder for code editor */}
            <div className='w-full h-full  border-2 border-gray-400 rounded-xl p-4'>
                
                    <div className="w-full h-full overflow-hidden">
                          <AceEditor
                            mode="java"
                            theme="twilight"
                            onChange={(newValue) => onChange(newValue)}
                            value={CodeTemplate}
                            name="UNIQUE_ID_OF_DIV"
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
            </div>

        </div>
    );
}

export default AddQuestion;
