// Display Markdown tsx

import { useState } from "react";
// Components
import Markdown from "react-markdown";

interface DisplayMarkdownProps {
  id: string;
  markdown: string;
}

const DisplayMarkdown: React.FC<DisplayMarkdownProps> = ({ id, markdown }) => {


  return (
    <div>
      <Markdown className="mark-down">{markdown}</Markdown>
      {/* <textarea id={`md-textarea-${id}`} autoComplete="off" disabled={inputDisabled}
        className="input-resize-content df-input w-full min-h-[15lh] max-h-[15lh]"
        value={input} onChange={handleInputChange} /> */}
    </div>
  );
};

export default DisplayMarkdown;
