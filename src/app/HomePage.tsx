// Home Page tsx

"use client";

import { useRouter } from "next/navigation";
import LayoutDefault from "@/components/layout/LayoutDefault";
import SubscribeBanner from "@/components/SubscribeBanner";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Post } from "@/types/xPost";
import { getAllQuestions, getFeaturedPosts } from "@/services";
import { useNotification } from "@/components/providers/NotificationProvider";
import PostCard from "@/components/post/PostCard";


export default function HomePage() {
  const { addNotification } = useNotification();
  const [qFeatured, setQFeatured] = useState<Post[]>([]);
  const [aFeatured, setAFeatured] = useState<Post[]>([]);
  const [isFectingFeatured, setIsFetchingFeatured] = useState<boolean>(false);


  /**
   * Fetch Featured Post Upon Mounting Page
   */
  useEffect(() => {
    getFeatured();
  }, []);


  /**
   * Get Featured Post (articles & questions)
   * @returns error or updates posts arrays
   */
  const getFeatured = async () => {
    setIsFetchingFeatured(true);
    try {
      // Get Featured Question Posts
      const qResponse = await getFeaturedPosts('QUESTIONS');
      if ('success' in qResponse) {
        if (!qResponse.success) {
          addNotification(qResponse.message || 'Error Fetching Questions');
        }
        return;
      }
      setQFeatured(qResponse);

      // Get Featured Article Posts
      const aResponse = await getFeaturedPosts('ARTICLES');
      if ('success' in aResponse) {
        if (!aResponse.success) {
          addNotification(aResponse.message || 'Error Fetching Articles');
        }
        return;
      }
      setAFeatured(aResponse);
    } catch (error) {
      console.error(error);
      addNotification('Unexpected Error Occured. Reload Featured Posts');
    } finally {
      setIsFetchingFeatured(false);
    }
  }

  return (
    <LayoutDefault>
      {/* 
      TO DO
      CHANGE THIS FOR A BETER BANNER 
      
      */}
      <img src="https://picsum.photos/1440/350?grayscale" className="mx-auto" />


      {qFeatured && (qFeatured.length > 0) && (
        <div>
          <div className="flex justify-between items-center mb-4 mt-8">
            <h1 className="font-semibold text-3xl ml-4">Featured Questions</h1>
            <Link href="/questions"
              className="text-sm text-hsl-l50 bg-hsl-l95 hover:bg-hsl-l90 dark:bg-hsl-l15 dark:hover:bg-hsl-l20 rounded-lg px-2 py-1">See All Questions</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {qFeatured.map((post, idx) => (
              <PostCard key={idx} pd={post} />
            ))}
          </div>
        </div>
      )}

      {/* {qTrendingVisible && (qTrendingVisible.length <= 0) && qLatestVisible && (qLatestVisible.length <= 0) && (
        <div className="flex justify-center items-center my-8">
          <button type="button" onClick={handleUnhide} title="Unhide Post"
            className="flex items-center gap-2 px-2 py-1 rounded-lg bg-hsl-l95 hover:bg-hsl-l90 dark:bg-hsl-l15 dark:hover:bg-hsl-l20">
            <IconGeneral type="visibility-off" />
            <p className="font-semibold text-hsl-l50">Unhide Post</p>
          </button>
        </div>
      )} */}


    </LayoutDefault>
  );
}
