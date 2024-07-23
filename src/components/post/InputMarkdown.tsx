// Input Markdown


import { useState } from "react";
import Markdown from "react-markdown";


const InputMarkdown = () => {
  const [input, setInput] = useState<string>('');


  return (
    <div>

      <textarea rows={3} value={input} onChange={(event) => { setInput(event.target.value) }}
        className="input-resize-content df-input w-full min-h-[2lh] max-h-[12lh]">Defualt</textarea>

      <Markdown className="mark-down">{input}</Markdown>

    </div>
  );
}

export default InputMarkdown;