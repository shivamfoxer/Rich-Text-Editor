import ClassicEditor from "@ckeditor/ckeditor5-build-classic"
import CKEditor from "@ckeditor/ckeditor5-react"
import parse from "html-react-parser"
import deepai from "deepai";
import React, { useCallback, useEffect, useState } from "react"

import RefreshIcon from "./RefreshIcon.js";

import "./App.css"

function App() {
  const [text, setText] = useState("")
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  
  useEffect(() => deepai.setApiKey('quickstart-QUdJIGlzIGNvbWluZy4uLi4K'), []);

  const generateSummary = useCallback(async () => {
    let summar = await deepai.callStandardApi("summarization", { text });
    setSummary(summar.output);
  }, [text]);
  
  const submitArticle = useCallback(async () => {

  }, [title, text, summary]);
  
  return (
    <div className="App">
      <h2 className="title">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
        />
      </h2>
      
      <div className="editor">
        <h2>Editor</h2>
        <h2>Content</h2>
        
        <CKEditor
          editor={ClassicEditor}
          data={text}
          onChange={(event, editor) => {
            const data = editor.getData()
            setText(data)
          }}
        />
          
        <p>{parse(text)}</p>
      </div>
      
      <div className="summary">
        <h2>
          Summary 
          <button onClick={generateSummary}>
            <RefreshIcon />
          </button>
        </h2>
        <div>{summary}</div>
      </div>

      <button className="submit" onChange={submitArticle}>Submit</button>
    </div>
  )
}

export default App
