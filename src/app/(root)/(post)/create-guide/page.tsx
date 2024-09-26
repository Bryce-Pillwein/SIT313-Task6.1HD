// Post Guide Page tsx

"use client";

import { useState } from "react";
import LayoutDefault from "@/components/layout/LayoutDefault";
import { useNotification } from "@/components/providers/NotificationProvider";
import InputFileVideo from "@/components/postCreation/InputFileVideo";
import { setGuide } from "@/services";
import PaddingBlock from "@/components/ui/PaddingBlock";


export default function PostGuidePage() {
  const { addNotification } = useNotification();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [isUploading, setIsUploading] = useState<boolean>(false);

  // Handle video file selection
  const handleVideoChange = (file: File | null): void => {
    setSelectedFile(file);
  };


  /**
   * Post Guide
   */
  const submitPost = async () => {
    if (!selectedFile) {
      addNotification('Add video file');
      return;
    }

    if (!title) {
      addNotification('Add a title');
      return;
    }

    setIsUploading(true);

    try {
      const status = await setGuide(title, selectedFile, description);
      if (!status.success) {
        addNotification(status.message!);
        return;
      }
      addNotification('Video Uploaded!');
      setTitle('');
      setDescription('');
      setSelectedFile(null);
    } catch (error) {
      console.error(error);
      addNotification('Error adding video. Try again later')
    } finally {
      setIsUploading(false);
    }
  };

  if (isUploading) {
    return (
      <LayoutDefault>
        <div className="flex justify-center items-center min-h-[50vh]">
          <h1 className="text-hsl-l50 text-4xl font-medium">Uploading Post...</h1>
        </div>
      </LayoutDefault>
    )
  }

  return (
    <LayoutDefault>
      <main className="my-8">
        <h1 className="font-semibold text-3xl ml-4">Post Video Guide</h1>

        <div className="flex justify-center items-center mt-4 bg-hsl-l100 dark:bg-hsl-l15 shadow py-8 px-4 md:px-8 rounded-lg">
          <div className="w-full max-w-[100%] sm:max-w-[70%] md:max-w-[50%]">

            <InputFileVideo handleVideoChange={handleVideoChange} />


            <PaddingBlock pad={0.5} />

            <label htmlFor="title" className="text-hsl-l50 text-sm">Title</label>
            <input type="text" id="title" name="title" className='df-input w-full mb-4' required
              value={title} onChange={(e) => setTitle(e.target.value)} autoComplete="off" />


            <label htmlFor="desc" className="text-hsl-l50 text-sm">Video Description</label>
            <textarea id="desc" name="desc" autoComplete="off"
              className='input-resize-content df-input w-full min-h-[5lh] max-h-[15lh]'
              value={description} onChange={(e) => setDescription(e.target.value)}></textarea>


            <div className="flex justify-end mt-4">
              <button type="button" onClick={submitPost}
                className="bg-hsl-l95 dark:bg-hsl-l20 text-hsl-l50 font-medium px-4 py-2 border-none outline-none rounded-md
               hover:bg-mb-pink hover:dark:bg-mb-yellow hover:text-hsl-l100">Submit</button>
            </div>
          </div>

        </div>
      </main>
    </LayoutDefault>
  );
}


