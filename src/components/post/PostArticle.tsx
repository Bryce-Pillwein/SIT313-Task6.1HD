// Post Article tsx

"use client";

import { useState } from 'react';
import PaddingBlock from '../ui/PaddingBlock';

const PostArticle = () => {
  const [article, setArticle] = useState({ title: '', abstract: '', text: '', tags: '' });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  /**
   * Handle Input Change
   * @param event element change
   */
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setArticle({ ...article, [name]: value });
  };

  /**
   * Post
   * @param event Form
   * @returns 
   */
  const post = (event: React.FormEvent) => {
    event.preventDefault();
    if (!article.title || !article.abstract || !article.text) {
      setErrorMessage('Enter all fields');
      return;
    }

    try {
      // Post the article TBA
      console.log('Article posted:', article);
      setErrorMessage(null); // Clear errors
      setArticle({ title: '', abstract: '', text: '', tags: '' });
    } catch (error) {
      console.error(error);
      setErrorMessage('Failed to post article');
    }
  };


  return (
    <form onSubmit={post}>
      <h1 className="text-lg">Article</h1>

      {errorMessage && <p className="text-red-500 text-center text-sm">{errorMessage}</p>}

      <p className="text-sub-10">Title</p>
      <input type="text" name="title" className='inputField w-full'
        value={article.title} onChange={handleInputChange} />

      <PaddingBlock pad={1} />

      <p className="text-sub-10">Abstract</p>
      <textarea name="abstract" className='inputField w-full' rows={2}
        value={article.abstract} onChange={handleInputChange}></textarea>

      <PaddingBlock pad={1} />

      <p className="text-sub-10">Article Text</p>
      <textarea name="text" className='inputField w-full' rows={8}
        value={article.text} onChange={handleInputChange}></textarea>

      <PaddingBlock pad={1} />

      <p className="text-sub-10">Tags (Add up to 3)</p>
      <input type="text" name="tags" className='inputField w-full'
        value={article.tags} onChange={handleInputChange} />

      <PaddingBlock pad={1} />

      <div className="flex justify-end">
        <button className="btn" type="submit">Post</button>
      </div>
    </form>
  )
};

export default PostArticle;