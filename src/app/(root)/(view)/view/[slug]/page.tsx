// View Questions / Articles Page tsx

"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { useNotification } from "@/components/providers/NotificationProvider";
import { Post } from "@/types/Post";
import { getPostAll } from "@/services";
import LayoutDefault from "@/components/layout/LayoutDefault";
import ToolBar from "@/components/ToolBar";
import PostCard from "@/components/post/PostCard";
import PostSearchBanner from "@/components/post/PostSearchBanner";
import IconGeneral from "@/components/icons/IconGeneral";

export default function ViewPage({ params }: { params: { slug: string } }) {
  const { addNotification } = useNotification();
  const { slug } = params;

  const [isFetchingPosts, setIsFetchingPosts] = useState<boolean>(true);
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [trendingVisible, setTrendingVisible] = useState<Post[] | null>(null);
  const [latestVisible, setLatestVisible] = useState<Post[] | null>(null);
  const [searchResults, setSearchResults] = useState<Post[] | null>(null);
  const [isGridView, setIsGridView] = useState<boolean>(true);

  /**
   * Get Posts (Questions or Articles)
   * Set trending and latest post arrays
   */
  const getPosts = useCallback(async () => {
    try {
      let response;
      if (slug === "questions") {
        response = await getPostAll('POST_QUESTION');
      } else if (slug === "articles") {
        response = await getPostAll('POST_ARTICLE');
      }

      if (!response) return;

      setPosts(response);
      setTrendingVisible(response);
      setLatestVisible(response);
    } catch (error) {
      console.error(error);
      addNotification("Error fetching posts. Please reload.");
    } finally {
      setIsFetchingPosts(false);
    }
  }, [slug, addNotification]);

  /**
   * Fetch Posts Upon Mounting Page
   */
  useEffect(() => {
    if (slug) {
      getPosts();
    }
  }, [getPosts, slug]);

  /**
   * Hide Trending Posts
   * @param postId Post ID
   */
  const hideTrending = (postId: string) => {
    setTrendingVisible((prevPosts) => prevPosts!.filter((p) => p.postId !== postId));
  };

  /**
   * Hide Latest Posts
   * @param postId Post ID
   */
  const hideLatest = (postId: string) => {
    setLatestVisible((prevPosts) => prevPosts!.filter((p) => p.postId !== postId));
  };

  /**
   * Search and Filter Posts
   * @param searchTerm Search Term
   * @param searchType Search Type
   */
  const handleSearch = (searchTerm: string, searchType: string) => {
    setSearchResults(null);
    if (!posts) return;

    if (searchTerm.length <= 0) {
      setSearchResults(null);
      return;
    }

    const filteredPosts = posts.filter((post) => {
      const searchTermLower = searchTerm.toLowerCase();

      switch (searchType) {
        case "Title":
          return post.title.toLowerCase().includes(searchTermLower);
        case "Author":
          const authorFirstName = post.authorFirstName.toLowerCase();
          const authorLastName = post.authorLastName.toLowerCase();
          return authorFirstName.includes(searchTermLower) || authorLastName.includes(searchTermLower);
        case "Tag":
          return post.tags.some((tag) => tag.toLowerCase().includes(searchTermLower));
        case "Date":
          return post.date?.toLowerCase().includes(searchTermLower) || false;
        default:
          return false;
      }
    });
    console.log(filteredPosts);
    setSearchResults(filteredPosts);
    console.log(searchResults);
  };

  /**
   * Handle Unhide
   */
  const handleUnhide = () => {
    setTrendingVisible(posts);
    setLatestVisible(posts);
  };


  return (
    <LayoutDefault>
      <main className="pb-4">

        <ToolBar isGridView={isGridView} onSearch={handleSearch} unhide={handleUnhide} toggleView={() => setIsGridView(!isGridView)} />

        {/* Search Result  */}
        {searchResults && (searchResults.length >= 1) && (
          <motion.div className="transition-opacity duration-500 ease-in opacity-100"
            initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }} transition={{ duration: 0.3 }}
          >
            <h1 className="font-semibold text-3xl mb-4 mt-8 ml-4">Search Results</h1>
            <div className="flex flex-col gap-y-4">
              <AnimatePresence>
                {searchResults.map((post) => (
                  <motion.div key={post.postId}
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
                  >
                    <PostSearchBanner pd={post} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        )}

        {/* Trending Post */}
        {trendingVisible && (trendingVisible.length > 0) && (
          <div>
            <h1 className="font-semibold text-3xl mb-4 mt-8 ml-4">Trending</h1>
            <div className={`gap-4 ${isGridView ? 'grid grid-cols-1 md:grid-cols-3' : 'flex flex-col'}`}>
              {trendingVisible.slice(0, 3).map((post, idx) => (
                <PostCard key={idx} pd={post} hideQuestion={() => hideTrending(post.postId)} isGridView={isGridView} />
              ))}
            </div>
          </div>
        )}

        {/* Latest Post */}
        {latestVisible && (latestVisible.length > 0) && (
          <div>
            <h1 className="font-semibold text-3xl mb-4 mt-8 ml-4">Latest</h1>
            <div className={`gap-4 ${isGridView ? 'grid grid-cols-1 md:grid-cols-3' : 'flex flex-col'}`}>
              {latestVisible.map((post, idx) => (
                <PostCard key={idx} pd={post} hideQuestion={() => hideLatest(post.postId)} isGridView={isGridView} />
              ))}
            </div>
          </div>
        )}

        {trendingVisible && (trendingVisible.length <= 0) && latestVisible && (latestVisible.length <= 0) && (
          <div className="flex justify-center items-center my-8">
            <button type="button" onClick={handleUnhide} title="Unhide Post"
              className="flex items-center gap-2 px-2 py-1 rounded-lg bg-hsl-l95 hover:bg-hsl-l90 dark:bg-hsl-l15 dark:hover:bg-hsl-l20">
              <IconGeneral type="visibility-off" />
              <p className="font-semibold text-hsl-l50">Unhide Post</p>
            </button>
          </div>
        )}

        {/* Retrieving Data */}
        {isFetchingPosts && (
          <div className="min-h-[70vh] flex justify-center items-center">
            <p className="text-2xl text-hsl-l50 font-medium">Fetching Questions...</p>
          </div>
        )}

        {/* Failed Retreiving Data */}
        {!isFetchingPosts && !posts && (
          <div className="min-h-[70vh] flex flex-col justify-center items-center">
            <p className="text-2xl text-hsl-l50 font-medium">Error Fetching Posts</p>
            <p className="text-2xl text-hsl-l50 font-medium">Please try again later</p>
          </div>
        )}


      </main>
    </LayoutDefault >
  );
}