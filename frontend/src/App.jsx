import { useEffect, useState } from 'react';
import { Terminal } from '@xterm/xterm';
import Editor from './Editor.jsx';
import { io } from "socket.io-client";
import { getFolderStructure, getfiledata } from '../server/server.js';
import TreeExample from './TreeExample.jsx';
import { stringify } from 'postcss';

function App() {
  const [term, setTerm] = useState(null);
  const [PageState, setPageState] = useState('');
  const [FolderStructure, setFolderStructure] = useState([]);
  const [FileData, setFileData] = useState('Hello world!');
  const socket = io(String(import.meta.env.VITE_BACKEND_URL));

  const handleFolderStructure = async() => {
    getFolderStructure().then((data) => {
      setFolderStructure(data);
    });
  }

  useEffect(() => {
    let terminal;
    let inputBuffer = '';

    const createTerminal = () => {
      terminal = new Terminal({
        fontSize: 15,
        fontFamily: 'Menlo',
      });

      const terminalElement = document.getElementById('terminal');
      terminal.open(terminalElement);


      const resizeTerminal = () => {
        const cols = Math.floor(terminalElement.offsetWidth / 8);
        const rows = Math.floor(terminalElement.offsetHeight / 18);
        terminal.resize(cols, rows);
      };

      resizeTerminal();
      window.addEventListener('resize', resizeTerminal);

      terminal.write('$ ');
      terminal.focus();

      terminal.onData((data) => {
        if (data === '\r') {
          socket.emit('Terminal-input', inputBuffer + '\n');
          inputBuffer = '';
        } else if (data === '\u007F') {
          if (inputBuffer.length > 0) {
            inputBuffer = inputBuffer.slice(0, -1);
            terminal.write('\b \b');
          }
        } else if (data >= String.fromCharCode(32) && data <= String.fromCharCode(126)) {
          inputBuffer += data;
          terminal.write(data);
        }
      });

      setTerm(terminal);

      return () => {
        window.removeEventListener('resize', resizeTerminal);
      };
    };

    createTerminal();

    // Socket listeners
    socket.on("connect", () => {
      // console.log('Socket connected:', socket.id);
    });

    socket.on("disconnect", () => {
      // console.log('Socket disconnected');
    });

    socket.on("Terminal-output", (arg) => {
      handleFolderStructure();
      terminal.write(`\r\n ${arg}`);
    });

    return () => {
      if (terminal) terminal.dispose();
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    handleFolderStructure();
  }, [PageState, term]);

  useEffect(() => {
    if (PageState !== '') {
      getfiledata(PageState).then((data) => {
        // check if data is an object
        if (typeof data === 'object') {
          data = JSON.stringify(data, null, 2);
        }
        setFileData(data);
      });
    }
  }, [PageState]);

  const handlePageState = (path) => {
    setPageState(path);
  };

  return (
    <>
      <div className='w-full h-screen flex'>
        {/* Left side */}
        <div className='border-2 border-gray-400 min-w-[20%] h-full sm:block hidden'>
          <TreeExample data={FolderStructure} handlePageState={handlePageState} path='/' />
        </div>

        {/* Right side */}
        <div className='min-w-[80%] max-w-[100%] h-full flex flex-col'>
          <div className='border-2 h-[70vh] w-full border-gray-400 flex flex-col'>
            {PageState === '' ? (
              <div className="w-full h-full flex flex-col items-center justify-center py-6 bg-gray-50 rounded-lg shadow-lg">
                <h1 className="text-4xl font-extrabold text-gray-600">
                  Select a file to edit
                </h1>
                <p className="text-lg text-gray-500 mt-4">
                  Navigate through the file tree to choose a file.
                </p>
              </div>
            ) : (
              <div className="flex flex-col h-full bg-white p-3 rounded-lg shadow-lg">
                <p className="border-2 border-gray-400 py-1 px-3 rounded-lg mb-4 text-gray-700 font-medium">
                  Current path: <span className="font-semibold text-blue-600">{PageState}</span>
                </p>
                <Editor path={PageState} data={FileData} />
              </div>
            )}

          </div>
          <div id="terminal" className='w-full flex-grow overflow-y-auto max-h-[30vh] text-left p-0 bg-black text-white'></div>
        </div>
      </div>
    </>
  );
}

export default App;
