// Display Markdown tsx

import Markdown from "react-markdown";

interface DisplayMarkdownProps {
  id: string;
  markdown: string;
}

const DisplayMarkdown: React.FC<DisplayMarkdownProps> = ({ id, markdown }) => {

  return (
    <Markdown className="mark-down">{markdown}</Markdown>
  );
};

export default DisplayMarkdown;
