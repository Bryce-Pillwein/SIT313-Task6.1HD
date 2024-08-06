// Questions Page tsx
"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

// Components
import LayoutDefault from "@/components/layout/LayoutDefault";
import ToolBar from "@/components/ToolBar";
import PostCard from "@/components/post/PostCard";
import PostBanner from "@/components/post/PostBanner";
import IconGeneral from "@/components/icons/IconGeneral";
import { useNotification } from "@/components/providers/NotificationProvider";
// Types
import { Post } from "@/types/xPost";
// Scripts
import { getAllQuestions } from "@/services";

export default function Questions() {
  const { addNotification } = useNotification();
  const [isFetchingQuestions, setIsFetchingQuestions] = useState<boolean>(true);
  const [questions, setQuestions] = useState<Post[] | null>(null);
  const [qTrendingVisible, setQTrendingVisible] = useState<Post[] | null>(null);
  const [qLatestVisible, setQLatestVisible] = useState<Post[] | null>(null);
  const [qSearchResults, setQSearchResults] = useState<Post[] | null>(null);
  const [gridDisplay, setGridDisplay] = useState<boolean>(true);

  /**
   * Get Questions
   * Set trending and latest question arrays
   * @returns 
   */
  const getQuestions = useCallback(async () => {
    try {
      const response = await getAllQuestions();
      if (!response) return;

      setQuestions(response);
      setQTrendingVisible(response);
      setQLatestVisible(response);
    } catch (error) {
      console.error(error);
      addNotification('Error fetching questions. Reload')
    } finally {
      setIsFetchingQuestions(false);
    }
  }, [addNotification]);

  /**
 * Fetch Questions Upon Mounting Page
 */
  useEffect(() => {
    getQuestions();
  }, [getQuestions]);

  /**
   * Hide Trending Questions
   * @param postId Post ID
   */
  const hideQTrending = (postId: string) => {
    setQTrendingVisible(prevQuestions => prevQuestions!.filter(q => q.postId !== postId));
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
      const searchTermLower = searchTerm.toLowerCase();

      switch (searchType) {
        case 'Title':
          return question.title.toLowerCase().includes(searchTermLower);
        case 'Author':
          const authorFirstName = question.authorFirstName.toLowerCase();
          const authorLastName = question.authorLastName.toLowerCase();
          return authorFirstName.includes(searchTermLower) || authorLastName.includes(searchTermLower);
        case 'Tag':
          return question.tags.some(tag => tag.toLowerCase().includes(searchTermLower));
        case 'Date':
          return question.date?.toLowerCase().includes(searchTermLower) || false;
        default:
          return false;
      }
    });

    setQSearchResults(filteredQuestions);
  };

  const handleUnhide = () => {
    setQTrendingVisible(questions);
    setQLatestVisible(questions);
  };


  return (
    <LayoutDefault>
      <main className="pb-4">

        <ToolBar onSearch={handleSearch} unhide={handleUnhide} />

        {/* Search Result  */}
        <AnimatePresence>
          {qSearchResults && (qSearchResults.length >= 1) && (
            <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }} transition={{ duration: 0.3 }}
              className="transition-opacity duration-500 ease-in opacity-100">
              <h1 className="font-semibold text-3xl mb-4 mt-8 ml-4">Search Results</h1>
              <div className="flex flex-col gap-y-4">
                <AnimatePresence>
                  {qSearchResults.map((post, idx) => (
                    <motion.div key={idx} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} >
                      <PostBanner pd={post} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Trending Post */}
        {qTrendingVisible && (qTrendingVisible.length > 0) && (
          <div>
            <h1 className="font-semibold text-3xl mb-4 mt-8 ml-4">Trending</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {qTrendingVisible.slice(0, 3).map((post, idx) => (
                <PostCard key={idx} pd={post} hideQuestion={() => hideQTrending(post.postId)} />
              ))}
            </div>
          </div>
        )}

        {/* Latest Post */}
        {qLatestVisible && (qLatestVisible.length > 0) && (
          <div>
            <h1 className="font-semibold text-3xl mb-4 mt-8 ml-4">Latest</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {qLatestVisible.map((post, idx) => (
                <PostCard key={idx} pd={post} hideQuestion={() => hideQLatest(post.postId)} />
              ))}
            </div>
          </div>
        )}

        {qTrendingVisible && (qTrendingVisible.length <= 0) && qLatestVisible && (qLatestVisible.length <= 0) && (
          <div className="flex justify-center items-center my-8">
            <button type="button" onClick={handleUnhide} title="Unhide Post"
              className="flex items-center gap-2 px-2 py-1 rounded-lg bg-hsl-l95 hover:bg-hsl-l90 dark:bg-hsl-l15 dark:hover:bg-hsl-l20">
              <IconGeneral type="visibility-off" />
              <p className="font-semibold text-hsl-l50">Unhide Post</p>
            </button>
          </div>
        )}

        {/* Retrieving Data */}
        {isFetchingQuestions && (
          <div className="min-h-[70vh] flex justify-center items-center">
            <p className="text-2xl text-hsl-l50 font-medium">Fetching Questions...</p>
          </div>
        )}

        {/* Failed Retreiving Data */}
        {!isFetchingQuestions && !questions && (
          <div className="min-h-[70vh] flex flex-col justify-center items-center">
            <p className="text-2xl text-hsl-l50 font-medium">Error Fetching Questions.</p>
            <p className="text-2xl text-hsl-l50 font-medium">Please try again later.</p>
          </div>
        )}


      </main>
    </LayoutDefault >
  );
}