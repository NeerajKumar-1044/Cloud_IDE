import { useEffect, useState } from 'react';
import { Terminal } from '@xterm/xterm';
import Editor from './Editor.jsx';
import { io } from "socket.io-client";
import { getFolderStructure , getfiledata} from '../server/server.js';
import TreeExample from './TreeExample.jsx'

function App() {
  const [term, setTerm] = useState(null);
  const [PageState, setPageState] = useState(''); // path of the current file in used
  const [FolderStructure, setFolderStructure] = useState([]); // array of objects
  const [FileData, setFileData] = useState('Hello world!'); // string of the file data
  const socket = io(String(import.meta.env.VITE_BACKEND_URL));

  useEffect(() => {
    let terminal;
    let inputBuffer = '';
  
    const createTerminal = () => {
      terminal = new Terminal({
        fontSize: 15,
        fontFamily: 'Menlo',
      });
  
      terminal.open(document.getElementById('terminal'));
      terminal.write('$ ');
      terminal.focus();
  
      terminal.onData((data) => {
        if (data === '\r') {
          socket.emit('Terminal-input', inputBuffer+'\n');

          // console.log(inputBuffer);
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
    };

    createTerminal();
  
    // Socket listeners within useEffect
    socket.on("connect", () => {
      // console.log(socket.id);
    });
  
    socket.on("disconnect", () => {
      // console.log('socket disconnected');
    });

    socket.on("Terminal-output", (arg) => {
      terminal.write(`\r\n ${arg}`);
      // console.log(arg);
    });

    return () => {
      if (terminal) {
        terminal.dispose();
      }
      socket.disconnect();
    };

  }, []);

  useEffect(() => {
    getFolderStructure().then((data) => {
      // console.log(data);
      setFolderStructure(data);
    });
  }, [PageState, term]);

  useEffect(() => {
    if (PageState !== '') {
      getfiledata(PageState).then((data) => {
        // console.log(data);
        setFileData(data);
      }
      );
    }
  }, [PageState]);


  const handlePageState = (path) => {
    // console.log(path);
    setPageState(path);
  };

  return (
    <>
      <div className='w-full h-screen flex'>
        {/* left side*/}
        <div className='border-2 border-gray-400 min-w-[20%] h-full sm:block hidden'>
          <TreeExample data={FolderStructure} handlePageState={handlePageState} path = '/' />
        </div>

        {/* right side*/}
        <div className='min-w-[80%] max-w-[100%] h-full'>
          <div className='border-2 h-[70vh] w-full border-gray-400 flex flex-col'>
            {PageState === '' ? (
              <div className='w-full h-full flex flex-col items-center justify-center py-6'>
              <h1 className='text-4xl font-extrabold text-gray-400'>
                Select a file to edit
              </h1>
            </div>
            ) :( 
              // <Editor data={FileData} />
              <div className='flex flex-col h-full'>
                <p className='border-2 border-gray-400'>Current path: {PageState}</p>
                <Editor path={PageState} data={FileData} />
              </div>
              )}
          </div>
          <div id="terminal" className='w-full overflow-y-auto max-h-[30vh]'></div>
        </div>
      </div>
    </>
  );
}

export default App;
