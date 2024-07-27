// Input Markdown

import { useEffect, useState } from "react";

interface InputMarkdownProps {
  isQuestion: boolean;
  handleInput: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  markdownURL?: string;
}

const InputMarkdown: React.FC<InputMarkdownProps> = ({ isQuestion, handleInput, markdownURL }) => {
  const [input, setInput] = useState<string>('');
  const [inputDisabled, setInputDisabled] = useState<boolean>(false);

  useEffect(() => {
    if (markdownURL) {
      setInputDisabled(true);
      getMarkdown();
    }
  }, [markdownURL]);

  /**
   * Get Markdown Text
   */
  const getMarkdown = async () => {
    try {
      const response = await fetch(markdownURL!);
      const text = await response.text();
      setInput(text);

      // Use Existing change event handler to set initial text on parent component
      const initDataPretendEvent = {
        target: {
          name: 'markdownText',
          value: text
        }
      } as unknown as React.ChangeEvent<HTMLTextAreaElement>;
      handleInput(initDataPretendEvent);
      setInputDisabled(false);
    } catch (error) {
      console.error(error);
    }
  };

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
        value={input} onChange={handleInputChange} disabled={inputDisabled} />
    </div>
  );
};

export default InputMarkdown;
