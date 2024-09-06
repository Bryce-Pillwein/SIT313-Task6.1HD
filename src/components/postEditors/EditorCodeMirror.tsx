// Editor Code Mirror tsx

"use client";

import { useEffect, useState } from 'react';
import CodeMirror, { ViewUpdate } from '@uiw/react-codemirror';
import { langs } from '@uiw/codemirror-extensions-langs';
import { vscodeDark } from '@uiw/codemirror-theme-vscode';
import IconGeneral from '../icons/IconGeneral';
import { usePostContext } from '../providers/PostProvider';

const languageOptions = {
  c: langs.c,
  cpp: langs.cpp,
  csharp: langs.csharp,
  css: langs.css,
  html: langs.html,
  java: langs.java,
  javascript: langs.javascript,
  json: langs.json,
  markdown: langs.markdown,
  python: langs.python,
  sql: langs.sql,
  typescript: langs.typescript,
  tsx: langs.tsx,
  vue: langs.vue,
};

interface EditorCodeMirrorProps {
  id: string;
  index: number;
  componentsLength: number;
  content?: string;
  fileType?: string;
}

const EditorCodeMirror: React.FC<EditorCodeMirrorProps> = ({ id, index, componentsLength, content, fileType }) => {
  const { updateContent, moveComponent, removeComponent, updateComponentFiletype } = usePostContext();
  const [input, setInput] = useState<string>('');
  const [codeLanguage, setCodeLanguage] = useState<any>(langs.typescript());

  /**
   * Set Content (if it exists: for editing existing post)
   */
  useEffect(() => {
    if (content) setInput(content);
  }, [content]);

  /**
   * Update editor type (if it exists: for editing existing post)
   */
  useEffect(() => {
    if (fileType && languageOptions[fileType as keyof typeof languageOptions]) {
      setCodeLanguage(languageOptions[fileType as keyof typeof languageOptions]);
    } else {
      setCodeLanguage(langs.typescript()); // Default to TypeScript
    }
  }, [fileType]);

  /**
   * Select Langauge Change
   * @param event Change Event
   */
  const handleLangChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLang = event.target.value as keyof typeof languageOptions;
    updateComponentFiletype(id, selectedLang);
    setCodeLanguage(languageOptions[selectedLang]());
  };

  /**
   * Handle Input Change
   * @param event element change
   */
  const handleInputChange = (value: string, viewUpdate: ViewUpdate) => {
    updateContent(id, value)
    setInput(value);
  };

  return (
    <div>
      {/* Code Block Options / Menu */}
      <div className="flex justify-between items-center mb-2 pl-4 bg-hsl-l98 dark:bg-hsl-l20 rounded-md border border-solid border-hsl-l90 dark:border-hsl-l25">
        <p className='text-hsl-l50 text-sm'>Code Mirror</p>

        <div className="flex justify-center items-center">
          <select className="bg-inherit text-sm text-hsl-l50 mr-2" id={`select-filetype-${id}`}
            onChange={handleLangChange}>
            <option value="typescript">TypeScript</option>
            <option value="c">C</option>
            <option value="cpp">C++</option>
            <option value="csharp">C#</option>
            <option value="css">CSS</option>
            <option value="html">HTML</option>
            <option value="java">Java</option>
            <option value="javascript">JavaScript</option>
            <option value="json">JSON</option>
            <option value="markdown">Markdown</option>
            <option value="python">Python</option>
            <option value="sql">SQL</option>
            <option value="tsx">TSX</option>
            <option value="vue">Vue</option>
          </select>

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
      <CodeMirror value={input} height="200px" style={{ borderRadius: '5rem' }}
        extensions={[codeLanguage]} theme={vscodeDark}
        onChange={handleInputChange} />
    </div>
  );
};

export default EditorCodeMirror;