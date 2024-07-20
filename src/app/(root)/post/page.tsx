// Post Page tsx

"use client";

import { useState } from "react";
// Components
import LayoutDefault from "@/components/layout/LayoutDefault";
import PaddingBlock from "@/components/ui/PaddingBlock";
import PostQuestion from "@/components/post/PostQuestion";
import PostArticle from "@/components/post/PostArticle";
import { Post } from "@/types/post";
import InputFileImage from "@/components/ui/InputFileImage";


export default function PostPage() {
  const [isQuestion, setIsQuestion] = useState<boolean>(true);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [content, setContent] = useState<Post>({ title: '', abstract: '', text: '', tags: [], image: null });

  /**
   * Handle Input Change
   * @param event element change
   */
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setContent({ ...content, [name]: value });
  };

  /**
   * Handle File Change
   * @param event 
   */
  const handleImageChange = (file: File | null) => {
    console.log("IN PARENT FILE");
    setContent({ ...content, image: file });
  };

  /**
   * Post
   * @param event Form
   * @returns 
   */
  const postContent = (event: React.FormEvent) => {
    event.preventDefault();

    setIsUploading(true);

    // try {
    //   // Post the article TBA
    //   console.log('Article posted:', content);
    //   setErrorMessage(null); // Clear errors
    //   setContent({ title: '', abstract: '', text: '', tags: '' });
    // } catch (error) {
    //   console.error(error);
    //   setErrorMessage('Failed to post article');
    // }
  };





  return (
    <LayoutDefault>
      <main className="my-8">
        <div className="flex justify-between items-center">
          <h1 className="text-xl">Post a {isQuestion ? 'Question' : 'Article'}</h1>
          <div className="flex justify-end gap-4 items-center">
            <button className={`btn ${isQuestion ? 'cta-btn' : ''}`} onClick={() => { setIsQuestion(true) }}>Post a Question</button>
            <button className={`btn ${!isQuestion ? 'cta-btn' : ''}`} onClick={() => { setIsQuestion(false) }}>Post an Article</button>
          </div>
        </div>



        <form onSubmit={postContent}
          className="grid grid-cols-3 gap-4">
          <div className="col-span-3">
            {errorMessage && <p className="text-red-500 text-center text-sm">{errorMessage}</p>}
          </div>

          {/* Add Title, Abstract and Text */}
          <div className="col-span-2">
            <label htmlFor="title" className="text-sub-10">Title</label>
            <input type="text" id="title" name="title" className='inputField w-full' required
              value={content.title} onChange={handleInputChange} />

            {!isQuestion && (<>
              <label htmlFor="abstract" className="text-sub-10">Abstract</label>
              <textarea name="abstract" id="abstract" className='inputField w-full' rows={2} required
                value={content.abstract} onChange={handleInputChange}></textarea>
            </>)}


            <label htmlFor="text" className="text-sub-10">Article Text</label>
            <textarea name="text" id="text" className='inputField w-full' rows={8} required
              value={content.text} onChange={handleInputChange}></textarea>
          </div>

          {/* Upload Image & Add Tags */}
          <div className="col-span-1">
            <label htmlFor="tags" className="text-sub-10">Tags (Add up to 3)</label>
            <div className="flex gap-4 mt-2">
              <input type="text" id="tags" name="tags" className='inputField w-full' />
              <button className="btn">Add</button>
            </div>

            <InputFileImage handleImage={handleImageChange} />
          </div>

          <div className=" col-span-3 flex justify-end">
            <button className="btn" type="submit">Post</button>
          </div>

        </form>

      </main>
    </LayoutDefault>
  );
}
