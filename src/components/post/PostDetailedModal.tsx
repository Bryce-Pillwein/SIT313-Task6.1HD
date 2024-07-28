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
      <div className="bg-hsl-l98 dark:bg-hsl-l13 rounded-md flex flex-col min-w-[50%] max-w-[98%] mb:max-w-[90%] lg:max-w-[60%] min-h-[70%] max-h-[80%]">

        <div className="flex h-full mb-4 overflow-hidden">

          <div className="px-8 pt-8 relative h-full">
            <h2 className="text-2xl font-bold">{pd.title}</h2>
            <p className="text-sm text-hsl-l50">{pd.authorFirstName} {pd.authorLastName} &#x2022; {pd.date}</p>
            <div className="flex flex-wrap justify-start items-center mt-2 mb-8 gap-x-2">
              {pd.tags?.map((tag, idx) => (
                <p key={idx} className="bg-hsl-l95 dark:bg-hsl-l20 px-2 py-1 text-hsl-l50 text-xs rounded-lg">{tag}</p>
              ))}
            </div>
            {markdownText && (
              <Markdown className="mark-down">{markdownText}</Markdown>
            )}
            <div className="absolute bottom-0 left-0 right-0 h-[250px] w-full pointer-events-none bg-gradient-to-t from-hsl-l98 dark:from-hsl-l13"></div>

            <div className='absolute bottom-8 right-0'>
              <Link href={`/question/${pd.postId}`} className="btn">View Post</Link>
            </div>
          </div>


          <div className='flex justify-end items-start flex-shrink-0'>
            <button className='bg-hsl-l90 hover:bg-hsl-l80 dark:bg-hsl-l15 rounded-tr-md rounded-bl-md dark:hover:bg-hsl-l20 p-1'
              onClick={() => onClose()}>
              <IconGeneral type='close' size={24} fillDarkMode='hsl(0 0% 60%)' fillLightMode='hsl(0 0% 40%)' />
            </button>
          </div>
        </div>



      </div>
    </div>,
    document.body
  );
};

export default PostDetailedModal;
