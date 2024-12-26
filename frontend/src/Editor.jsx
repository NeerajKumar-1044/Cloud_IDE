import React from 'react';
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-github";
import {setfiledata} from '../server/server.js';

function Editor({ path, data }) {
  let timeoutId;

  function onChange(path, newValue) {
    if (newValue) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(async () => {
        try {
          await setfiledata(path, newValue);
        } catch (error) {
          console.error("Error while saving file:", error);
        }
      }, 3000);
    } else {
      console.log('No data to save');
      clearTimeout(timeoutId);
    }
  }

  return (
    <div className="w-full h-full overflow-hidden">
      <AceEditor
        mode="java"
        theme="twilight"
        onChange={(newValue) => onChange(path, newValue)}
        value={data}
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
  );
}

export default Editor;
