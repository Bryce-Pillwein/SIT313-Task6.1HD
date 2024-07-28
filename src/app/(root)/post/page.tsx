// Post Page tsx

"use client";

import { KeyboardEvent, useState } from "react";
// Components
import LayoutDefault from "@/components/layout/LayoutDefault";
import InputFileImage from "@/components/post/InputFileImage";
import AddTags from "@/components/post/AddTags";
import InputMarkdown from "@/components/post/InputMarkdown";
import PaddingBlock from "@/components/ui/PaddingBlock";
// Types
import { PostUpload } from "@/types/PostUpload";
// Provider
import { useNotification } from "@/components/providers/NotificationProvider";
// Scripts
import { setPost } from "@/services";
import PostType from "@/components/post/PostType";


export default function PostPage() {
  const { addNotification } = useNotification();
  const [isPostType, setIsPostType] = useState<-1 | 1 | 2>(-1); // Map [-1 = none; 1 = question; 2 = article]
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [content, setContent] = useState<PostUpload>({ title: '', markdownText: '', tags: [], image: null });

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

    if (isPostType !== 1 && isPostType !== 2) {
      addNotification('Choose Post Type (Question or Article)');
      return;
    }

    if (!content.image) {
      addNotification('Please upload an image');
      return;
    }

    setIsUploading(true);

    try {
      const type = isPostType === 1 ? 'POST_QUESTION' : 'POST_ARTICLE'
      const status = await setPost(content, type);

      if (!status.success) {
        addNotification(status.message!);
        return;
      }

      /**
       * TO DO
       * REROUTE USER
       */
      setContent({ title: '', markdownText: '', tags: [], image: null });
      addNotification('Post Uploaded!')
    } catch (error) {
      console.error(error);
      addNotification('Error adding post. Try again later')
    } finally {
      setIsUploading(false);
    }

  };

  /**
   * Handle Key Down. Stops Enter key submitting form and allows new lines
   * @param event Keyboard event
   * @returns 
   */
  const handleKeyDown = (event: KeyboardEvent<HTMLFormElement>) => {
    if (event.key === 'Enter') {
      const target = event.target as HTMLTextAreaElement | HTMLInputElement;
      if (target.tagName === 'TEXTAREA' || target.tagName === 'INPUT' && target.type === 'text') {
        return;
      }
      event.preventDefault();
    }
  };


  return (
    <LayoutDefault>
      {!isUploading ? (

        <main className="my-8">
          <div className="flex justify-between items-center">
            <h1 className="text-xl">Post {isPostType === -1 ? '' : isPostType === 1 ? '(Question)' : '(Article)'}</h1>
          </div>

          <form onSubmit={postContent} onKeyDown={handleKeyDown}
            className="grid grid-cols-3 gap-x-8 gap-y-4 mt-4 bg-hsl-l100 dark:bg-hsl-l15 shadow py-8 px-4 md:px-8 rounded-lg">

            {/* Add Title */}
            <div className="col-span-3">
              <label htmlFor="title" className="text-hsl-l50 text-sm">Title</label>
              <input type="text" id="title" name="title" className='df-input w-full mb-4 md:mb-8' required
                value={content.title} onChange={handleInputChange} autoComplete="off" />
            </div>

            {/* Add Markdown / Question / Article */}
            <div className="col-span-3 sm:col-span-2">
              <InputMarkdown handleInput={handleInputChange} />
            </div>

            {/* Upload Image & Add Tags */}
            <div className="col-span-3 sm:col-span-1">
              <PaddingBlock pad={1} />
              <PostType isPostType={isPostType} setPostType={(pt) => { setIsPostType(pt) }} />
              <PaddingBlock pad={1} />
              <AddTags updateContentTags={updateContentTags} />
              <PaddingBlock pad={1} />
              <InputFileImage handleImage={handleImageChange} />
            </div>

            <div className=" col-span-3 flex justify-end mt-4 md:mt-16">
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
