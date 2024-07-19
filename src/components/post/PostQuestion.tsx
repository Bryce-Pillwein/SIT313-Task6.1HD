// Post Question tsx

"use client";

import { useState } from 'react';
import PaddingBlock from '../ui/PaddingBlock';

const PostQuestion = () => {
  const [question, setQuestion] = useState({ title: '', text: '', tags: '' });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  /**
   * Handle Input Change
   * @param event element change
   */
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setQuestion({ ...question, [name]: value });
  };

  /**
   * Post
   * @param event Form
   * @returns 
   */
  const post = (event: React.FormEvent) => {
    event.preventDefault();
    if (!question.title || !question.text) {
      setErrorMessage('Enter all fields');
      return;
    }

    try {
      // Post the Question TBA
      console.log('Question posted:', question);
      setErrorMessage(null); // Clear errors
      setQuestion({ title: '', text: '', tags: '' });
    } catch (error) {
      console.error(error);
      setErrorMessage('Failed to post article');
    }
  };

  return (
    <form onSubmit={post}>
      <h1 className="text-lg">Question</h1>

      {errorMessage && <p className="text-red-500 text-center text-sm">{errorMessage}</p>}

      <p className="text-sub-10">Title</p>
      <input type="text" name="name" className='inputField w-full'
        value={question.title} onChange={handleInputChange} />

      <PaddingBlock pad={1} />

      <p className="text-sub-10">Describe your problem</p>
      <textarea name="text" className='inputField w-full' rows={5}
        value={question.text} onChange={handleInputChange}></textarea>

      <PaddingBlock pad={1} />

      <p className="text-sub-10">Tags (Add up to 3)</p>
      <input type="text" name="tags" className='inputField w-full'
        value={question.tags} onChange={handleInputChange} />

      <PaddingBlock pad={1} />

      <div className="flex justify-end">
        <button className="btn" type="submit">Post</button>
      </div>
    </form>
  )
};

export default PostQuestion;