// View Post Page tsx
"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Post } from "@/types/Post";
import { EditorComponent } from "@/types/EditorComponent";
import { useNotification } from "@/components/providers/NotificationProvider";
import dynamic from "next/dynamic";
import Image from "next/image";
import LayoutDefault from "@/components/layout/LayoutDefault";
import IconInteraction from "@/components/icons/IconInteraction";
import getPost from "@/services/post/getPost";
import PostCommentSection from "@/components/post/PostCommentSection";
import ProfilePicture from "@/components/ui/ProfilePicture";
import Link from "next/link";
import PostAutherMoreContent from "@/components/post/PostAuthorMoreContent";
import PostInteractions from "@/components/post/PostInteractions";

const DynDisplayMarkdown = dynamic(() => import('../../../../../components/postDisplays/DisplayMarkdown'), { loading: () => null })
const DynDisplayCodeMirror = dynamic(() => import('../../../../../components/postDisplays/DisplayCodeMirror'), { loading: () => null })


export default function ViewPostPage({ params }: { params: { slug: string } }) {
  const { addNotification } = useNotification();
  const { slug } = params;
  const searchParams = useSearchParams();
  const postType = searchParams.get('type');
  const [isFetchingPost, setIsFetchingPost] = useState<boolean>(true);
  const [post, setPost] = useState<Post | null>(null);
  const [isFetchingPostContent, setIsFetchingPostContent] = useState<boolean>(true);
  const [contentComponents, setContentComponents] = useState<EditorComponent[]>([]);

  const [commentsTotal, setCommentsTotal] = useState<number>(0);

  /**
   * Fecth the Post Data at Page Mounting
   */
  useEffect(() => {
    if (slug && postType) {
      const fetchPost = async () => {
        try {
          const path = postType === 'question' ? 'POST_QUESTION' : 'POST_ARTICLE';
          const response = await getPost(slug, path);

          if ('success' in response && !response.success) {
            addNotification(response.message || 'Error fetching post');
            return;
          }

          setPost(response as Post);
        } catch (error) {
          console.error(error);
          addNotification('Error fetching post. Please reload.');
        } finally {
          setIsFetchingPost(false);
        }
      };

      fetchPost();
    }
  }, [slug, postType, addNotification]);

  /**
   * Fetch Post Content
   */
  useEffect(() => {
    if (post?.contentURLs) {
      const fetchPostContent = async () => {
        try {
          const components: EditorComponent[] = await Promise.all(
            post.contentURLs.map(async (contentURL: { type: string; url: string }, index: number) => {
              const response = await fetch(contentURL.url);
              const content = await response.text();
              return {
                id: `${index}-${contentURL.type}`,
                type: contentURL.type as 'markdown' | 'code',
                fileType: contentURL.type,
                content,
              };
            })
          );

          setContentComponents(components);
        } catch (error) {
          console.error('Error fetching post content:', error);
        } finally {
          setIsFetchingPostContent(false);
        }
      };

      fetchPostContent();
    }
  }, [post]);


  const updateCommentTotal = (commentsTotalNumber: number) => {
    setCommentsTotal(commentsTotalNumber);
  };

  return (
    <LayoutDefault>
      <main className="pb-8">
        {post && (
          <div className="relative grid grid-cols-3 gap-4">
            {/* Sticky Interactions for large Screen*/}
            <div className="hidden md:block absolute left-0 transform translate-x-[-120%] top-0 h-full">
              <PostInteractions layout="vert" postId={slug} postType={postType!} />
            </div>

            {/* Post Area */}
            <section className="relative col-span-3 md:col-span-2 border border-hsl-l90 dark:border-hsl-l25 bg-hsl-l100 dark:bg-hsl-l15 rounded-xl">
              {/* Banner Image */}
              <div className="relative pb-[56.25%] border-b border-hsl-l90 dark:border-hsl-l25">
                <Image src={post.imageURL} alt="Post Banner Image" sizes="100%"
                  fill={true} style={{ objectFit: "cover" }} priority
                  className="absolute inset-0 w-full h-full rounded-tl-xl rounded-tr-xl" />
              </div>

              {/* Content Markdown & Code */}
              <div className="px-4">
                <h2 className="text-2xl font-semibold mt-8 mb-2">{post.title}</h2>
                <div className="flex items-center gap-4  mb-8">
                  <ProfilePicture size="30" />
                  <p className="text-hsl-l50 ">
                    <Link href={`/profile/${post.userId}`}
                      className="hover:text-mb-pink hover:dark:text-mb-yellow hover:underline">
                      {post.authorFirstName} {post.authorLastName}
                    </Link> &#x2022; {post.date}
                  </p>

                  <div className="flex flex-wrap items-center gap-1">
                    {post.tags?.map((tag, idx) => (
                      <p key={idx} className="bg-hsl-l95 dark:bg-hsl-l20 px-2 py text-hsl-l50 text-xxs rounded-lg">{tag}</p>
                    ))}
                  </div>
                </div>

                {contentComponents.map((component: EditorComponent, index: number) => (
                  <div key={component.id} className='mt-4 mb-8'>
                    {component.type === 'markdown' ? (
                      <DynDisplayMarkdown id={component.id} markdown={component.content} />
                    ) : (
                      <DynDisplayCodeMirror id={component.id} code={component.content} fileType={component.fileType!} />
                    )}
                  </div>
                ))}
              </div>

              {/* Small Screen Interactions / Reactions */}
              <div className="block md:hidden px-4 py-8 border-t border-hsl-l90 dark:border-hsl-l25">
                <PostInteractions layout="horiz" postId={slug} postType={postType!} />
              </div>

              {/* Comment Section */}
              <div className="px-4 py-4 border-t border-hsl-l90 dark:border-hsl-l25">
                <PostCommentSection postId={slug} dbPath={postType === 'question' ? 'POST_QUESTION' : 'POST_ARTICLE'}
                  updateCommentTotal={updateCommentTotal} />
              </div>
            </section>

            {/* See More From The Author */}
            <section className="hidden md:block md:col-span-1">
              <PostAutherMoreContent postId={slug} postUserId={post.userId} dbPath={postType === 'question' ? 'POST_QUESTION' : 'POST_ARTICLE'} />
            </section>
          </div>
        )}

        {/* Retrieving Data */}
        {isFetchingPost && (
          <div className="min-h-[70vh] flex justify-center items-center">
            <p className="text-2xl text-hsl-l50 font-medium">Fetching Post...</p>
          </div>
        )}

        {/* Failed Retreiving Data */}
        {!isFetchingPost && !post && (
          <div className="min-h-[70vh] flex flex-col justify-center items-center">
            <p className="text-2xl text-hsl-l50 font-medium">Error Fetching Post.</p>
            <p className="text-2xl text-hsl-l50 font-medium">Please try again later.</p>
          </div>
        )}

      </main>
    </LayoutDefault >
  );
}