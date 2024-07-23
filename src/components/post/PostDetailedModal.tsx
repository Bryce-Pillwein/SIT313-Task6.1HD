// Question Detailed tsx

import { Post } from '@/types/Post';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import IconGeneral from '../icons/IconGeneral';

interface PostDetailedModalProps {
  pd: Post // Question Data
  onClose: () => void;
}

const PostDetailedModal: React.FC<PostDetailedModalProps> = ({ pd, onClose }) => {
  const truncatedText = pd.text.length > 500 ? pd.text.slice(0, 500) + '...' : pd.text;

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

  return createPortal(
    <div className='fixed top-0 left-0 w-[100vw] h-[100vh] bg-black bg-opacity-70 flex flex-col justify-center items-center z-50'>
      <div className="bg-hsl-l98 dark:bg-hsl-l13 p-4 rounded-lg flex flex-col min-w-[50%] max-w-[98%] mb:max-w-[90%] lg:max-w-[60%] lg min-h-[70%] max-h-[90%] ">

        <div className='flex justify-between items-center'>
          <h2 className="text-xl font-bold">{pd.title}</h2>
          <button className='btn rounded-full px-1 py-2' onClick={() => onClose()}>
            <IconGeneral type='close' size={24} />
          </button>
        </div>

        <p className="text-sm text-hsl-l50">{pd.authorFirstName} {pd.authorLastName} &#x2022; {pd.date.toDateString()}</p>

        <div className="flex justify-start items-center mt-1 mb-8 gap-x-2">
          {pd.tags?.map((tag, idx) => (
            <p key={idx} className="bg-hsl-l95 dark:bg-hsl-l20 px-2 py-1 text-hsl-l50 text-xs rounded-lg">{tag}</p>
          ))}
        </div>

        <p>{truncatedText}</p>

        <div className='flex justify-end gap-4 mt-auto'>
          <Link href={`/question/${pd.postId}`} className="btn">See Post</Link>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default PostDetailedModal;
