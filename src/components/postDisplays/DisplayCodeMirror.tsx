// Display Code Mirror tsx

import CodeMirror, { ViewUpdate } from '@uiw/react-codemirror';
import { langs } from '@uiw/codemirror-extensions-langs';
import { vscodeDark } from '@uiw/codemirror-theme-vscode';
import { useState } from 'react';

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
}

const DisplayCodeMirror: React.FC<DisplayCodeMirrorProps> = ({ id, code }) => {
  const [codeLanguage, setCodeLanguage] = useState<any>(langs.typescript());

  return (
    <CodeMirror value={code} height="200px"
      extensions={[codeLanguage]} theme={vscodeDark} />
  );
};

export default DisplayCodeMirror;
