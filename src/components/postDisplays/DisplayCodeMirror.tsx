// Display Code Mirror tsx

import CodeMirror, { ViewUpdate } from '@uiw/react-codemirror';
import { langs } from '@uiw/codemirror-extensions-langs';
import { vscodeDark } from '@uiw/codemirror-theme-vscode';
import { useEffect, useState } from 'react';

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

interface DisplayCodeMirrorProps {
  id: string;
  code: string;
  fileType: string;
}

const DisplayCodeMirror: React.FC<DisplayCodeMirrorProps> = ({ id, code, fileType }) => {
  const [codeLanguage, setCodeLanguage] = useState<any>(langs.typescript());

  /**
   * Update editor type
   */
  useEffect(() => {
    if (fileType && languageOptions[fileType as keyof typeof languageOptions]) {
      setCodeLanguage(languageOptions[fileType as keyof typeof languageOptions]);
    } else {
      setCodeLanguage(langs.typescript()); // Default to TypeScript
    }
    console.log('Type: ', fileType);
  }, [fileType]);

  return (
    <CodeMirror value={code} height="auto" maxHeight='800px'
      extensions={[codeLanguage]} theme={vscodeDark} editable={false} />
  );
};

export default DisplayCodeMirror;
