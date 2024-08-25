// Home Page tsx

"use client";

import { useRouter } from "next/navigation";
import LayoutDefault from "@/components/layout/LayoutDefault";
import SubscribeBanner from "@/components/SubscribeBanner";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Post } from "@/types/Post";
// import { getAllQuestions, getFeaturedPosts } from "@/services";
import { useNotification } from "@/components/providers/NotificationProvider";
import PostCard from "@/components/post/PostCard";
import Image from "next/image";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";


export default function HomePage() {
  const { addNotification } = useNotification();
  // const [qFeatured, setQFeatured] = useState<Post[]>([]);
  // const [aFeatured, setAFeatured] = useState<Post[]>([]);
  // const [isFectingFeatured, setIsFetchingFeatured] = useState<boolean>(false);


  /**
   * Fetch Featured Post Upon Mounting Page
   */
  // useEffect(() => {
  //   getFeatured();
  // }, []);


  /**
   * Get Featured Post (articles & questions)
   * @returns error or updates posts arrays
   */
  // const getFeatured = async () => {
  //   setIsFetchingFeatured(true);
  //   try {
  //     // Get Featured Question Posts
  //     const qResponse = await getFeaturedPosts('QUESTIONS');
  //     if ('success' in qResponse) {
  //       if (!qResponse.success) {
  //         addNotification(qResponse.message || 'Error Fetching Questions');
  //       }
  //       return;
  //     }
  //     setQFeatured(qResponse);

  //     // Get Featured Article Posts
  //     const aResponse = await getFeaturedPosts('ARTICLES');
  //     if ('success' in aResponse) {
  //       if (!aResponse.success) {
  //         addNotification(aResponse.message || 'Error Fetching Articles');
  //       }
  //       return;
  //     }
  //     setAFeatured(aResponse);
  //   } catch (error) {
  //     console.error(error);
  //     addNotification('Unexpected Error Occured. Reload Featured Posts');
  //   } finally {
  //     setIsFetchingFeatured(false);
  //   }
  // }

  return (
    <main>
      <Header />
      <div className="relative w-full min-h-[75vw] sm:min-h-[50vw] md:min-h-[20vw] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(/deakin-cover-1.jpg)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-hsl-l98 to-transparent pointer-events-none"></div>
        <div className="relative z-10 p-4">
          {/* <h1 className="text-black">Hello</h1> */}
        </div>
      </div>


      <div className="app-container">
        <p>stuff</p>


        {/* {qFeatured && (qFeatured.length > 0) && (
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
      )} */}

        {/* {qTrendingVisible && (qTrendingVisible.length <= 0) && qLatestVisible && (qLatestVisible.length <= 0) && (
        <div className="flex justify-center items-center my-8">
          <button type="button" onClick={handleUnhide} title="Unhide Post"
            className="flex items-center gap-2 px-2 py-1 rounded-lg bg-hsl-l95 hover:bg-hsl-l90 dark:bg-hsl-l15 dark:hover:bg-hsl-l20">
            <IconGeneral type="visibility-off" />
            <p className="font-semibold text-hsl-l50">Unhide Post</p>
          </button>
        </div>
      )} */}
      </div>



      <Footer />
    </main >
  );
}
