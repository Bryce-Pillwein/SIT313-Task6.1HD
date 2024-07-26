// Questions Page tsx
"use client";

import { useEffect, useState } from "react";

// Components
import LayoutDefault from "@/components/layout/LayoutDefault";
import IconInteraction from "@/components/icons/IconInteraction";
import IconGeneral from "@/components/icons/IconGeneral";
import { useNotification } from "@/components/providers/NotificationProvider";
// Types
import { Post } from "@/types/Post";
// Scripts
import getPost from "@/services/post/getPost";
import Image from "next/image";

export default function Questions({ params }: { params: { slug: string } }) {
  const { addNotification } = useNotification();
  const [isFetchingQuestion, setIsFetchingQuestion] = useState<boolean>(true);
  const [question, setQuestion] = useState<Post | null>(null);

  /**
   * Fetch Questions Upon Mounting Page
   */
  useEffect(() => {
    getQuestions();
  }, [])

  /**
   * Get Questions
   * Set trending and latest question arrays
   * @returns 
   */
  const getQuestions = async () => {
    try {
      const response = await getPost(params.slug, 'POST_QUESTION');
      if ('success' in response) {
        if (!response.success) {
          addNotification(response.message || 'Error fetching questions');
        }
        return;
      }

      setQuestion(response);
    } catch (error) {
      console.error(error);
      addNotification('Error fetching question. Reload')
    } finally {
      setIsFetchingQuestion(false);
    }
  }



  return (
    <LayoutDefault>
      <main className="pb-8">

        {question && (
          <div className="grid grid-cols-3 gap-4">
            <section className="col-span-2">

              {/* IMAGE */}
              <div className="relative pb-[56.25%]">
                <Image src={question.imageURL} alt="Question Banner Image" sizes="100%"
                  fill={true} style={{ objectFit: "cover" }} priority
                  className="absolute inset-0 w-full h-full rounded-xl" />
              </div>

              <div className="px-4">
                <h2 className="text-2xl font-semibold mt-8 mb-2">{question.title}</h2>
                <p className="text-hsl-l50 mb-8">{question.authorFirstName} {question.authorLastName} &#x2022; {question.date}</p>

                {/* <p>{question.text}</p> */}
              </div>

            </section>

            <section className="col-span-1 relative">
              <div className="bg-hsl-l100 dark:bg-hsl-l15 rounded-lg shadow-md overflow-hidden w-full max-w-full p-2 sticky top-4">
                <div className="flex flex-wrap items-center gap-1">
                  {question.tags?.map((tag, idx) => (
                    <p key={idx} className="bg-hsl-l95 dark:bg-hsl-l20 px-2 py text-hsl-l50 text-xxs rounded-lg">{tag}</p>
                  ))}
                </div>



                <IconInteraction type="like" />
                <IconInteraction type="dislike" />
                <IconInteraction type="heart" />
                <IconGeneral type="comment" />

                <p>REPORT</p>
              </div>
            </section>

          </div>
        )}

        {/* Retrieving Data */}
        {isFetchingQuestion && (
          <div className="min-h-[70vh] flex justify-center items-center">
            <p className="text-2xl text-hsl-l50 font-medium">Fetching Question...</p>
          </div>
        )}

        {/* Failed Retreiving Data */}
        {!isFetchingQuestion && !question && (
          <div className="min-h-[70vh] flex flex-col justify-center items-center">
            <p className="text-2xl text-hsl-l50 font-medium">Error Fetching Question.</p>
            <p className="text-2xl text-hsl-l50 font-medium">Please try again later.</p>
          </div>
        )}

      </main>
    </LayoutDefault >
  );
}