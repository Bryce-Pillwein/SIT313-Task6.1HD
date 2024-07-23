// Post Page tsx

"use client";

import { useState } from "react";
// Components
import LayoutDefault from "@/components/layout/LayoutDefault";
import InputFileImage from "@/components/post/InputFileImage";
import AddTags from "@/components/post/AddTags";
import PaddingBlock from "@/components/ui/PaddingBlock";
// Types
import { PostUpload } from "@/types/PostUpload";
// Provider
import { useNotification } from "@/components/providers/NotificationProvider";
// Scripts
import { setPost } from "@/services";
import { serverTimestamp, Timestamp } from "firebase/firestore";

export default function PostPage() {
  const { addNotification } = useNotification();
  const [isQuestion, setIsQuestion] = useState<boolean>(true);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [content, setContent] = useState<PostUpload>({ title: '', abstract: '', text: '', tags: [], image: null });

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
    setContent({ ...content, image: file });
  };

  /**
   * Update Content Tags from AddTags child
   * @param newTags 
   */
  const updateContentTags = (newTags: string[]) => {
    setContent(prevContent => ({
      ...prevContent,
      tags: newTags
    }));
  };

  /**
   * Post
   * @param event Form
   * @returns 
   */
  const postContent = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!content.image) {
      addNotification('Please upload an image');
      return;
    }

    setIsUploading(true);

    const postType = isQuestion ? 'POST_QUESTION' : 'POST_ARTICLE'

    // Remove the abstract field if the post type is POST_QUESTION
    if (postType === 'POST_QUESTION') {
      const { abstract, ...rest } = content;
      setContent(rest);
    }

    try {
      const status = await setPost(content, postType);

      if (!status.success) {
        addNotification(status.message!);
        return;
      }

      /**
       * TO DO
       * REROUTE USER
       */
      setContent({ title: '', abstract: '', text: '', tags: [], image: null });
      addNotification('Post Uploaded!')
    } catch (error) {
      console.error(error);
      addNotification('Error adding post. Try again later')
    } finally {
      setIsUploading(false);
    }

  };


  return (
    <LayoutDefault>
      {!isUploading ? (

        <main className="my-8">
          <div className="flex justify-between items-center">
            <h1 className="text-xl">Post a {isQuestion ? 'Question' : 'Article'}</h1>
            <div className="flex justify-end gap-4 items-center">
              <button className={`btn ${isQuestion ? 'cta-btn' : ''}`} onClick={() => { setIsQuestion(true) }}>Post a Question</button>
              <button className={`btn ${!isQuestion ? 'cta-btn' : ''}`} onClick={() => { setIsQuestion(false) }}>Post an Article</button>
            </div>
          </div>

          <form onSubmit={postContent}
            className="grid grid-cols-3 gap-x-8 gap-y-4 mt-4">

            {/* Add Title, Abstract and Text */}
            <div className="col-span-3 sm:col-span-2">
              <label htmlFor="title" className="text-hsl-l50 text-sm">Title</label>
              <input type="text" id="title" name="title" className='inputField w-full' required
                value={content.title} onChange={handleInputChange} />

              {!isQuestion && (<>
                <PaddingBlock pad={0.5} />
                <label htmlFor="abstract" className="text-hsl-l50 text-sm">Abstract</label>
                <textarea name="abstract" id="abstract" className='inputField w-full' rows={2} required
                  value={content.abstract} onChange={handleInputChange}></textarea>
              </>)}

              <PaddingBlock pad={0.5} />
              <label htmlFor="text" className="text-hsl-l50 text-sm">Article Text</label>
              <textarea name="text" id="text" className='inputField w-full' rows={8} required
                value={content.text} onChange={handleInputChange}></textarea>
            </div>

            {/* Upload Image & Add Tags */}
            <div className="col-span-3 sm:col-span-1">
              <AddTags updateContentTags={updateContentTags} />
              <InputFileImage handleImage={handleImageChange} />
            </div>

            <div className=" col-span-3 flex justify-end">
              <button className="btn" type="submit">Post</button>
            </div>
          </form>
        </main>
      ) : (
        <div className="flex justify-center items-center min-h-[50vh]">
          <h1 className="text-hsl-l50 text-4xl font-medium">Uploading Post...</h1>
        </div>
      )}
    </LayoutDefault>
  );
}
