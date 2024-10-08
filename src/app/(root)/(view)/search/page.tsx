// Search Page tsx

"use client";

import { Suspense, useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { useNotification } from "@/components/providers/NotificationProvider";
import { Post } from "@/types/Post";
import { getPostFromSearchQuery } from "@/services";
import LayoutDefault from "@/components/layout/LayoutDefault";
import ToolBar from "@/components/ToolBar";
import dynamic from "next/dynamic";

const DynPostCard = dynamic(() => import('../../../../components/post/PostCard'), { loading: () => null })

function SearchPage() {
  const { addNotification } = useNotification();
  const searchParams = useSearchParams();
  const [searchResults, setSearchResults] = useState<Post[] | null>(null);
  const [visiblePost, setVisiblePost] = useState<Post[] | null>(null);
  const [isGridView, setIsGridView] = useState<boolean>(true);
  const [isSearchExecuted, setIsSearchExecuted] = useState(false);


  /**
   * Search and Filter Posts
   * @param searchTerm Search Term
   * @param searchType Search Type
   */
  const handleSearch = async (searchTerm: string, searchType: string) => {
    setSearchResults(null);
    setVisiblePost(null);

    console.log(searchTerm, searchType);

    try {
      const validSTerm = searchTerm.trim();

      if (validSTerm.length <= 0) return;

      const response = await getPostFromSearchQuery(validSTerm, searchType);
      setSearchResults(response);
      setVisiblePost(response);
    } catch (error) {
      addNotification('Search Failed');
    }
  };

  /**
   * Handle Search if via redirect
   */
  /**
   * Handle Search if via redirect
   */
  const memoizedSearch = useCallback(() => {
    const searchTerm = searchParams.get('searchTerm')?.trim() || null;
    const searchType = searchParams.get('searchType')?.trim() || null;

    if (searchTerm && searchType && handleSearch && !isSearchExecuted) {
      handleSearch(searchTerm, searchType);
      setIsSearchExecuted(true); // Mark search as executed
    }
  }, [searchParams, handleSearch, isSearchExecuted]);

  useEffect(() => {
    memoizedSearch();
  }, [memoizedSearch]);

  /**
   * Handle Unhide
   */
  const handleUnhide = () => {
    setVisiblePost(searchResults);
  };

  /**
   * Handle Hide
   * @param postId Post ID
   */
  const handleHide = (postId: string) => {
    setVisiblePost((prevPosts) => prevPosts!.filter((p) => p.postId !== postId));
  };


  return (
    <LayoutDefault>
      <main className="pb-4 min-h-[60vh]">

        <ToolBar isGridView={isGridView} unhide={handleUnhide} toggleView={() => setIsGridView(!isGridView)}
          onSearch={() => null} onSearchEnter={handleSearch} />

        <h1 className="font-semibold text-3xl mb-4 mt-4 ml-4">Results</h1>

        {/* Search Result */}
        {visiblePost && visiblePost.length >= 1 && (
          <div className={`gap-4 ${isGridView ? 'grid grid-cols-1 md:grid-cols-3' : 'flex flex-col'}`}>
            {visiblePost.map((post, index) => (
              <motion.div
                key={post.postId}
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.7 }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.15,
                  type: "spring",
                  stiffness: 300,
                  damping: 20
                }}
                className="h-full w-full"
              >
                <DynPostCard pd={post} hideQuestion={() => handleHide(post.postId)} isGridView={isGridView} />
              </motion.div>
            ))}
          </div>
        )}

      </main>
    </LayoutDefault >
  );
}


export default function SearchPageSuspense() {
  return (
    <Suspense>
      <SearchPage />
    </Suspense>
  );
}