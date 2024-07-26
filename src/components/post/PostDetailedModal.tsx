// Question Detailed tsx

import { createPortal } from 'react-dom';
import Link from 'next/link';
import { useEffect, useState } from 'react';
// Components
import IconGeneral from '../icons/IconGeneral';
// Types
import { Post } from '@/types/Post';
import Markdown from 'react-markdown';

interface PostDetailedModalProps {
  pd: Post // Question Data
  onClose: () => void;
}

const PostDetailedModal: React.FC<PostDetailedModalProps> = ({ pd, onClose }) => {
  const [markdownText, setMarkdownText] = useState<string | null>(null);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  useEffect(() => {
    getMarkdown();
  }, [])

  const getMarkdown = async () => {
    try {
      const response = await fetch(pd.markdownURL);
      const text = await response.text();
      setMarkdownText(text);
    } catch (error) {
      console.error(error);
    }
  };

  return createPortal(
    <div className='fixed top-0 left-0 w-[100vw] h-[100vh] bg-black bg-opacity-70 flex flex-col justify-center items-center z-50'>
      <div className="bg-hsl-l98 dark:bg-hsl-l13 px-8 py-4 rounded-md flex flex-col min-w-[50%] max-w-[98%] mb:max-w-[90%] lg:max-w-[60%] min-h-[60%] max-h-[90%] ">

        <div className='flex justify-end'>
          <button className='bg-red-500 hover:bg-red-600 dark:bg-red-800 dark:hover:bg-red-700 rounded-lg'
            onClick={() => onClose()}>
            <IconGeneral type='close' size={24} fill='white' />
          </button>
        </div>

        <h2 className="text-2xl font-bold pt-4">{pd.title}</h2>

        <p className="text-sm text-hsl-l50">{pd.authorFirstName} {pd.authorLastName} &#x2022; {pd.date}</p>

        <div className="flex flex-wrap justify-start items-center mt-2 mb-8 gap-x-2">
          {pd.tags?.map((tag, idx) => (
            <p key={idx} className="bg-hsl-l95 dark:bg-hsl-l20 px-2 py-1 text-hsl-l50 text-xs rounded-lg">{tag}</p>
          ))}
        </div>

        {markdownText && (
          <Markdown className="mark-down">{markdownText}</Markdown>
        )}

        <div className='flex justify-end gap-4 mt-auto mb-8 mr-4'>
          <Link href={`/question/${pd.postId}`} className="btn">See Post</Link>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default PostDetailedModal;
