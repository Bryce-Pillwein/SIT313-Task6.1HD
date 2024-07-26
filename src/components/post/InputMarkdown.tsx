// Input Markdown

import { useState } from "react";
import Markdown from "react-markdown";

interface InputMarkdownProps {
  isQuestion: boolean;
  handleInput: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}



const InputMarkdown: React.FC<InputMarkdownProps> = ({ isQuestion, handleInput }) => {
  const [input, setInput] = useState<string>('');
  const [markdownContent, setMarkdownContent] = useState<string | null>(null);

  /**
   * Handle Input Change
   * @param event element change
   */
  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    handleInput(event);
    setInput(event.target.value);
  };

  return (
    <div>
      <label htmlFor="markdownText" className="text-hsl-l50 text-sm">{isQuestion ? 'Question Details' : 'Article Text'} (Markdown Accepted)</label>
      <textarea id="markdownText" name="markdownText" rows={8} autoComplete="off"
        className="input-resize-content df-input w-full min-h-[10lh] max-h-[15lh]"
        value={input} onChange={handleInputChange} />

      {markdownContent && (
        <Markdown className="mark-down">{markdownContent}</Markdown>
      )}
    </div>
  );
};

export default InputMarkdown;
