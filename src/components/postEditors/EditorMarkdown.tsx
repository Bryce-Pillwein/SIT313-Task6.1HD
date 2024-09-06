// Editor Markdown tsx

"use client";

import { useEffect, useState } from "react";
import IconGeneral from "../icons/IconGeneral";
import { usePostContext } from "../providers/PostProvider";

interface EditorMarkdownProps {
  id: string;
  index: number;
  componentsLength: number;
  content?: string;
}

const EditorMarkdown: React.FC<EditorMarkdownProps> = ({ id, index, componentsLength, content }) => {
  const { updateContent, moveComponent, removeComponent } = usePostContext();
  const [input, setInput] = useState<string>('');

  /**
   * Set Content (if it exists: for editing existing post)
   */
  useEffect(() => {
    if (content) {
      setInput(content);
    }
  }, [content]);

  /**
   * Handle Input Change
   * @param event element change
   */
  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateContent(id, event.target.value);
    setInput(event.target.value);
  };

  return (
    <div>
      {/* Code Block Options / Menu */}
      <div className="flex justify-between items-center mb-2 pl-4 bg-hsl-l98 dark:bg-hsl-l20 rounded-md border border-solid border-hsl-l90 dark:border-hsl-l25">
        <p className='text-hsl-l50 text-sm'>Markdown</p>

        <div className="flex justify-center items-center">
          <button type="button" disabled={index === 0}
            className='px-2 border-l border-solid border-hsl-l90 dark:border-hsl-l25'
            onClick={() => moveComponent(index, 'up')} >
            <IconGeneral type='arrow-drop-up' size={30} />
          </button>

          <button type="button" disabled={index === componentsLength - 1}
            className='px-2 border-l border-solid border-hsl-l90 dark:border-hsl-l25'
            onClick={() => moveComponent(index, 'down')} >
            <IconGeneral type='arrow-drop-down' size={30} />
          </button>

          <button type="button"
            className='px-2 border-l border-solid border-hsl-l90 dark:border-hsl-l25'
            onClick={() => removeComponent(id)}>
            <IconGeneral type='close' size={30} />
          </button>
        </div>
      </div>

      {/* Input Area */}
      <textarea id={`md-textarea-${id}`} autoComplete="off"
        className="input-resize-content df-input w-full min-h-[15lh] max-h-[15lh]"
        value={input} onChange={handleInputChange} />
    </div>
  );
};

export default EditorMarkdown;
