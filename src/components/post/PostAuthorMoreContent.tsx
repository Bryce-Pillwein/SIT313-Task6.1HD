// Post Auther More Content tsx

"use client";

import { getPostByAuthorId } from "@/services";
import { Post } from "@/types/Post";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface PostAutherMoreContentProps {
  postId: string;
  postUserId: string;
}

const PostAutherMoreContent: React.FC<PostAutherMoreContentProps> = ({ postId, postUserId }) => {
  const [authorPost, setAuthorPost] = useState<Post[]>([]);
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    const getAuthorPosts = async () => {
      try {
        const posts = await getPostByAuthorId(postUserId);
        // Filter out the post where the postId equals itself
        const filteredPosts = posts.filter((p: Post) => p.postId !== postId);
        setAuthorPost(filteredPosts);
        if (filteredPosts.length > 0) setPost(filteredPosts[0]);
      } catch (error) {
        console.error(error);
      }
    }
    getAuthorPosts();
  }, [postUserId])

  if (!authorPost || authorPost.length <= 0 || !post) return;


  return (
    <div className="max-h-[70vh] overflow-y-scroll custom-scrollbar">
      <p className="text-hsl-l70 dark:text-hsl-l30 text-sm text-center">More Questions From This User</p>

      {authorPost.map((post, idx) => (
        <Link href={`/view-post/${post.postId}?type=${post.postType}`} key={idx} className="group grid grid-cols-3 mt-2 mb-4">
          <div className="col-span-2 flex flex-col justify-center">
            <h3 className="group-hover:text-mb-pink group-hover:dark:text-mb-yellow text-wrap font-medium text-sm">{post.title}</h3>
            <p className="text-hsl-l70 dark:text-hsl-l30 text-xs text-balance mt-1">Tags: {post.tags.length > 0 ? post.tags.join(' • ') : 'None'}</p>
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

export default PostAutherMoreContent;