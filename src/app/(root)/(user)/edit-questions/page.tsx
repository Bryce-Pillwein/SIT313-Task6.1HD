// User/Edit Question Page tsx

"use client";

import { useEffect, useState } from "react";

// Components
import LayoutDefault from "@/components/layout/LayoutDefault";
// import InputMarkdown from "@/components/post/InputMarkdown";
import { useNotification } from "@/components/providers/NotificationProvider";
import { useAuth } from "@/components/providers/AuthProvider";
// Types
import { Post } from "@/types/Post";
// Scripts
import { getUserQuestions, updatePost } from "@/services";
import { useRouter } from "next/navigation";


export default function EditQuestion() {
  const router = useRouter()
  const { user, loading } = useAuth();
  const { addNotification } = useNotification();
  const [isFetchingQuestion, setIsFetchingQuestion] = useState<boolean>(true);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [questions, setQuestions] = useState<Post[] | null>(null);
  const [activeQuestion, setActiveQuestion] = useState<Post | null>(null);
  const [newPostData, setNewPostData] = useState<any>({ title: '', markdownText: '' });


  /**
   * Fetch Questions Upon Mounting Page
   */
  useEffect(() => {
    if (user) {
      getQuestions();
    }
  }, [user])

  /**
   * Get User Questions
   * @returns
   */
  const getQuestions = async () => {
    try {
      const response = await getUserQuestions();
      if ('success' in response) {
        if (!response.success) {
          addNotification(response.message || 'Error fetching questions');
        }
        return;
      }
      setQuestions(response);
    } catch (error) {
      console.error(error);
      addNotification('Error fetching question. Reload')
    } finally {
      setIsFetchingQuestion(false);
    }
  }


  /**
   * Handle Input Change
   * @param event element change
   */
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setNewPostData({ ...newPostData, [name]: value });
  };

  /**
   * Update Active Question
   * @param qd Post data
   */
  const updateActiveQuestion = (qd: Post) => {
    setNewPostData({ ...newPostData, title: qd.title })
    setActiveQuestion(qd);
  };

  /**
   * Update Post Content
   * @param event React Form Event
   * @returns
   */
  const updatePostContent = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      setIsUploading(true);

      if (!activeQuestion) {
        addNotification('Error - No question selected');
        return;
      }

      if (newPostData.title.trim().length <= 0 || newPostData.markdownText.trim().length <= 0) {
        addNotification('Error - Fields cannot be empty');
        return;
      }

      const status = await updatePost(activeQuestion, newPostData, 'POST_QUESTION');
      if (!status.success) {
        addNotification(status.message!);
        return;
      }
      router.push(`question/${activeQuestion.postId}`);
    } catch (error) {
      console.error(error);
      addNotification('Error adding post. Try again later')
    } finally {
      setIsUploading(false);

    }
  }

  return (
    <LayoutDefault>
      {!isUploading ? (
        <main className="pb-8">

          <h1 className="text-xl font-medium">Edit Question</h1>

          {questions && (
            <div className="grid grid-cols-5 gap-x-8 gap-y-4 mt-4 ">

              <form onSubmit={updatePostContent}
                className="col-span-5 md:col-span-3 bg-hsl-l100 dark:bg-hsl-l15 shadow py-8 px-4 md:px-8 rounded-lg">
                <label htmlFor="title" className="text-hsl-l50 text-sm">Title</label>
                <input type="text" id="title" name="title" className='df-input w-full mb-4 md:mb-8' required
                  value={newPostData.title} onChange={handleInputChange}
                  autoComplete="off" />

                {/* <InputMarkdown isQuestion={true} handleInput={handleInputChange} markdownURL={activeQuestion?.markdownURL} /> */}

                <div className="w-full flex justify-end mt-4">
                  <button className="btn" type="submit">Update Post</button>
                </div>
              </form>

              <div className="col-span-5 md:col-span-2">
                <p className="text-hsl-l50 text-sm pb-2">Choose a Question to Edit</p>
                <div className="flex flex-col gap-4 max-h-[60vh] overflow-y-scroll">
                  {questions.map((qd, idx) => (
                    <div key={idx} onClick={() => updateActiveQuestion(qd)}
                      className="cursor-pointer rounded-lg bg-hsl-l100 dark:bg-hsl-l15 hover:bg-hsl-l95 dark:hover:bg-hsl-l20 px-4 py-2 border border-solid border-hsl-l90 dark:border-hsl-l20">
                      <p className="truncate">{qd.title}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Retrieving Data */}
          {isFetchingQuestion && (
            <div className="min-h-[70vh] flex justify-center items-center">
              <p className="text-2xl text-hsl-l50 font-medium">Fetching Question...</p>
            </div>
          )}

          {/* Failed Retreiving Data */}
          {!isFetchingQuestion && !questions && (
            <div className="min-h-[70vh] flex flex-col justify-center items-center">
              <p className="text-2xl text-hsl-l50 font-medium">Error Fetching Question.</p>
              <p className="text-2xl text-hsl-l50 font-medium">Please try again later.</p>
            </div>
          )}

        </main>
      ) : (
        <div className="flex justify-center items-center min-h-[50vh]">
          <h1 className="text-hsl-l50 text-4xl font-medium">Uploading Post...</h1>
        </div>
      )}
    </LayoutDefault >
  );
}