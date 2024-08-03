// Post Page tsx

"use client";

import { useState } from "react";
// Components
import LayoutDefault from "@/components/layout/LayoutDefault";
import InputFileImage from "@/components/postCreation/InputFileImage";
import AddTags from "@/components/postCreation/AddTags";
import PaddingBlock from "@/components/ui/PaddingBlock";
// Provider
import { useNotification } from "@/components/providers/NotificationProvider";
// Scripts
import PostType from "@/components/postCreation/PostType";
import EditorWrapper from "@/components/postEditors/EditorWrapper";
import { PostProvider, usePostContext } from "@/components/providers/PostProvider";

function PostPage() {
  const { addNotification } = useNotification();
  const { content, components, handleTitleChange, postContent } = usePostContext();
  const [isUploading, setIsUploading] = useState<boolean>(false);


  /**
   * Post
   */
  const submitPost = async () => {
    // Error Validation
    if (content.postType !== 'question' && content.postType !== 'article') {
      addNotification('Choose Post Type (Question or Article)');
      return;
    }

    if (!content.title || content.title.length <= 0) {
      addNotification('Add A Title');
      return;
    }

    if (!content.image) {
      addNotification('Upload An Image');
      return;
    }

    if (components.length <= 0) {
      addNotification('Post is Empty! Add Content');
      return;
    }

    setIsUploading(true);

    try {
      await postContent();
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
            <h1 className="font-semibold text-3xl ml-4">Post {content.postType === 'question' ? '(Question)' : '(Article)'}</h1>
          </div>

          <div className="grid grid-cols-3 gap-x-8 gap-y-4 mt-4 bg-hsl-l100 dark:bg-hsl-l15 shadow py-8 px-4 md:px-8 rounded-lg">

            {/* Post Type, Title, Tags */}
            <div className="col-span-3 sm:col-span-2">
              <PostType />
              <PaddingBlock pad={0.25} />
              <label htmlFor="title" className="text-hsl-l50 text-sm">Title</label>
              <input type="text" id="title" name="title" className='df-input w-full' required
                value={content.title} onChange={handleTitleChange} autoComplete="off" />
              <PaddingBlock pad={0.25} />
              <AddTags />
            </div>

            {/* Upload Image & Add Tags */}
            <div className="col-span-3 sm:col-span-1">
              <InputFileImage />
            </div>


            {/* Add Markdown / Code Mirror */}
            <div className="col-span-3">
              <EditorWrapper />
            </div>


            <div className=" col-span-3 flex justify-end mt-4 md:mt-16">
              <button className="bg-hsl-l95 dark:bg-hsl-l20 text-hsl-l50 font-medium px-4 py-2 border-none outline-none rounded-md hover:bg-mb-pink hover:dark:bg-mb-yellow hover:text-hsl-l100" type="button" onClick={submitPost}>Submit</button>
            </div>
          </div>
        </main>
      ) : (
        <div className="flex justify-center items-center min-h-[50vh]">
          <h1 className="text-hsl-l50 text-4xl font-medium">Uploading Post...</h1>
        </div>
      )}
    </LayoutDefault>
  );
}


export default function PostPageWithProvider() {
  return (
    <PostProvider>
      <PostPage />
    </PostProvider>
  );
}


