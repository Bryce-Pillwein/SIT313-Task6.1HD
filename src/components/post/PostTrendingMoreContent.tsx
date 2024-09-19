// Post Trending More Content tsx

"use client";

import { getTrending } from "@/services";
import { Post } from "@/types/Post";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";


const PostTrendingMoreContent = () => {
  const [posts, setPosts] = useState<Post[] | null>(null);

  useEffect(() => {
    const fetchTrendingPost = async () => {
      try {
        const trendingPost = await getTrending();
        if (trendingPost)
          setPosts(trendingPost);
      } catch (error) {
        console.error('Error fetching trending post content:', error);
      }
    };

    fetchTrendingPost();
  }, [])

  if (!posts || posts.length <= 0 || !posts) return;



  return (
    <div className="mt-8">
      <p className="text-hsl-l70 dark:text-hsl-l30 text-sm text-center">Trending Posts</p>

      {posts.map((post, idx) => (
        <Link href={`/view-post/${post.postId}?type=${post.postType}`} key={idx} className="group grid grid-cols-3 mt-2 mb-4">
          <div className="col-span-2 flex flex-col justify-center">
            <h3 className="group-hover:text-mb-pink group-hover:dark:text-mb-yellow text-wrap font-medium text-sm">{post.title}</h3>
            <p className="text-hsl-l70 dark:text-hsl-l30 text-xs text-balance mt-1">{post.authorFirstName} {post.authorLastName}</p>
            {/* <p className="text-hsl-l70 dark:text-hsl-l30 text-xs text-balance mt-1">{post.tags.length > 0 ? post.tags.join(' • ') : 'None'}</p> */}
          </div>

          <div className="relative pb-[56.25%]">
            <Image src={post.imageURL} alt="Post Banner Image" sizes="100%"
              fill={true} style={{ objectFit: "cover" }} priority
              className="absolute inset-0 w-full h-full rounded-md" />
          </div>
        </Link >
      ))}
    </div>
  );
};

export default PostTrendingMoreContent;