// Post Page tsx

"use client";

import { KeyboardEvent, useState } from "react";
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
import PostType from "@/components/post/PostType";
import EditorWrapper from "@/components/Editors/EditorWrapper";
import { PostProvider, usePostContext } from "@/components/providers/PostProvider";

function PostPage() {
  const { addNotification } = useNotification();
  const { content, handleTitleChange, postContent } = usePostContext();
  const [isUploading, setIsUploading] = useState<boolean>(false);


  /**
   * Post
   */
  const submitPost = async () => {
    // Error Validation
    if (content.postType !== 1 && content.postType !== 2) {
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


    setIsUploading(true);

    try {
      const type = content.postType === 1 ? 'POST_QUESTION' : 'POST_ARTICLE'
      // const status = await setPost(content, type);
      // if (!status.success) {
      //   addNotification(status.message!);
      //   return;
      // }
      /**
       * TO DO
       * REROUTE USER
       */
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
            <h1 className="font-semibold text-3xl ml-4">Post {content.postType === -1 ? '' : content.postType === 1 ? '(Question)' : '(Article)'}</h1>
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
              <button className="btn" type="button" onClick={submitPost}>Post</button>
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


