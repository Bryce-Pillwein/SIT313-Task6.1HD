// Questions Page tsx
"use client";

import { useEffect, useState } from "react";
// Components
import LayoutDefault from "@/components/layout/LayoutDefault";
import CardQuestion from "@/components/post/PostCard";
import ToolBar from "@/components/ToolBar";
import { useNotification } from "@/components/providers/NotificationProvider";
// Types
import { Post } from "@/types/Post";
// Scripts
import { getAllQuestions } from "@/services";
import PostCard from "@/components/post/PostCard";
import PostBanner from "@/components/post/PostBanner";

export default function Questions() {
  const { addNotification } = useNotification();
  const [isFetchingQuestions, setIsFetchingQuestions] = useState<boolean>(true);
  const [questions, setQuestions] = useState<Post[] | null>(null);
  const [qLatestVisible, setQLatestVisible] = useState<Post[] | null>(null);
  const [qSearchResults, setQSearchResults] = useState<Post[] | null>(null);

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
      const response = await getAllQuestions();
      console.log(response);
      if (!response) {
        return;
      }
      setQuestions(response);

      setQLatestVisible(response);
    } catch (error) {
      console.error(error);
      addNotification('Error fetching questions. Reload')
    } finally {
      setIsFetchingQuestions(false);
    }
  }

  /**
   * Hide Trending Questions
   * @param postId Post ID
   */
  const hideQTrending = (postId: string) => {
    console.log(postId);

  };

  /**
   * Hide Latest Questions
   * @param postId 
   */
  const hideQLatest = (postId: string) => {
    setQLatestVisible(prevQuestions => prevQuestions!.filter(q => q.postId !== postId));
  };

  /**
 * Search and Filter Questions
 * @param searchTerm Search Term
 * @param searchType Search Type
 */
  const handleSearch = (searchTerm: string, searchType: string) => {
    if (!questions) return;

    if (searchTerm.length <= 0) {
      setQSearchResults(null)
      return;
    }

    const filteredQuestions = questions.filter((question) => {
      switch (searchType) {
        case 'Title':
          return question.title.toLowerCase().includes(searchTerm.toLowerCase());
        case 'Description':
          return question.text.toLowerCase().includes(searchTerm.toLowerCase());
        case 'Tag':
          return question.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
        case 'Date':
          if (question.createdAt) {
            const dateStr = question.date.toDateString();
            return dateStr.includes(searchTerm);
          }
          return false;
        default:
          return false;
      }
    });
    console.log(filteredQuestions);

    setQSearchResults(filteredQuestions);
  };


  return (
    <LayoutDefault>
      <main className="pb-4">

        <ToolBar onSearch={handleSearch} />

        {/* Search Result  */}
        {qSearchResults && (qSearchResults?.length >= 1) && (
          <div>
            <h1 className="font-semibold text-3xl mb-4 mt-8 ml-4">Search Results</h1>
            <div className="flex flex-col gap-y-4">
              {qSearchResults.map((post, idx) => (
                <PostBanner key={idx} pd={post} />
              ))}
            </div>
          </div>
        )}

        {/* Post */}
        {questions && qLatestVisible && (
          <div>
            {/* Trending */}
            <h1 className="font-semibold text-3xl mb-4 mt-8 ml-4">Trending</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {questions.map((post, idx) => (
                <PostCard key={idx} pd={post} hideQuestion={() => hideQTrending(post.postId)} />
              ))}
            </div>

            {/* Latest */}
            <h1 className="font-semibold text-3xl mb-4 mt-8 ml-4">Latest</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {qLatestVisible.map((post, idx) => (
                <PostCard key={idx} pd={post} hideQuestion={() => hideQLatest(post.postId)} />
              ))}
            </div>
          </div>
        )}

        {/* Retrieving Data */}
        {isFetchingQuestions && (
          <div className="min-h-[70vh] flex justify-center items-center">
            <p>Fetching Questions...</p>
          </div>
        )}

        {/* Failed Retreiving Data */}
        {!isFetchingQuestions && !questions && (
          <div className="min-h-[70vh] flex flex-col justify-center items-center">
            <p>Error Fetching Questions.</p>
            <p>Please try again later.</p>
          </div>
        )}


      </main>
    </LayoutDefault>
  );
}