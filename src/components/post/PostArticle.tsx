// Post Article tsx

"use client";

import { useState } from 'react';
import PaddingBlock from '../ui/PaddingBlock';

const PostArticle = () => {
  const [article, setArticle] = useState({ title: '', abstract: '', text: '', tags: '', image: null });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false)

  /**
   * Handle Input Change
   * @param event element change
   */
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setArticle({ ...article, [name]: value });
  };

  /**
   * Handle File Change
   * @param event 
   */
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setArticle({ ...article, image: file });
  };

  /**
   * Post
   * @param event Form
   * @returns 
   */
  const post = (event: React.FormEvent) => {
    event.preventDefault();
    if (!article.title || !article.abstract || !article.text || !article.image) {
      setErrorMessage('Enter all fields and add an image');
      return;
    }

    setIsUploading(true);

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

      <label htmlFor="title" className="text-sub-10">Title</label>
      <input type="text" id="title" name="title" className='inputField w-full' required
        value={article.title} onChange={handleInputChange} />

      <PaddingBlock pad={1} />

      <label htmlFor="image" className='text-sub-10 block'>Add an Image</label>
      <input type="file" id="image" name="image" className='' required
        accept="image/png, image/jpeg, image/jpg, image/gif" onChange={handleFileChange} />

      <PaddingBlock pad={1} />

      <label htmlFor="abstract" className="text-sub-10">Abstract</label>
      <textarea name="abstract" id="abstract" className='inputField w-full' rows={2} required
        value={article.abstract} onChange={handleInputChange}></textarea>

      <PaddingBlock pad={1} />

      <label htmlFor="text" className="text-sub-10">Article Text</label>
      <textarea name="text" id="text" className='inputField w-full' rows={8} required
        value={article.text} onChange={handleInputChange}></textarea>

      <PaddingBlock pad={1} />

      <label htmlFor="tags" className="text-sub-10">Tags (Add up to 3)</label>
      <input type="text" id="tags" name="tags" className='inputField w-full' required
        value={article.tags} onChange={handleInputChange} />

      <PaddingBlock pad={1} />

      <div className="flex justify-end">
        <button className="btn" type="submit">Post</button>
      </div>
    </form>
  )
};

export default PostArticle;