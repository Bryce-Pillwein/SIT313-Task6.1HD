// Home Page tsx

"use client";

import { useEffect, useState } from "react";
import { Post } from "@/types/Post";
import { useNotification } from "@/components/providers/NotificationProvider";
import PostCard from "@/components/post/PostCard";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { getCalcTrending, getWeather, setTrendingPostIds } from "@/services";
import CampusWeather from "@/components/CampusWeather";
import IconGeneral from "@/components/icons/IconGeneral";



export default function HomePage() {
  const { addNotification } = useNotification();
  const [trending, setTrending] = useState<Post[]>([]);
  const [isGridView, setIsGridView] = useState<boolean>(true);

  useEffect(() => {
    const getTrendingPost = async () => {
      try {
        // Re calculate Trending Post
        const posts = await getCalcTrending();
        setTrending(posts);
        // Reset calculated trending posts
        const postIds = posts.map(post => post.postId);
        await setTrendingPostIds(postIds);
      } catch (error) {
        addNotification('Error Fetching Post. Refresh');
        console.error(error);
      }
    };

    getTrendingPost();
  }, []);


  return (
    <main>
      <Header />
      <div className="relative w-full min-h-[75vw] sm:min-h-[50vw] md:min-h-[20vw] overflow-hidden flex items-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(/deakin-cover-1.jpg)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-hsl-l98 to-transparent pointer-events-none"></div>
      </div>


      <div className="app-container">


        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <div></div>
          <div></div>
          <CampusWeather />


        </div>


        {/* Trending Post */}
        {trending && (trending.length > 0) && (
          <div>
            <div className="flex justify-between items-center mt-8 mb-2">
              <h1 className="font-semibold text-3xl ml-4">Trending</h1>
              <button type="button" onClick={() => setIsGridView(!isGridView)} className="group">
                <IconGeneral type={isGridView ? "list-view" : "grid-view"}
                  className="fill-hsl-l80 dark:fill-hsl-l20 group-hover:fill-hsl-l50" />
              </button>
            </div>
            <div className={`gap-4 ${isGridView ? 'grid grid-cols-1 md:grid-cols-3' : 'flex flex-col'}`}>
              {trending.map((post, idx) => (
                <PostCard key={idx} pd={post} isGridView={isGridView} />
              ))}
            </div>
          </div>
        )}




      </div>


      <Footer />
    </main >
  );
}
