// View Post Page tsx
"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import Image from "next/image";
// Components
import LayoutDefault from "@/components/layout/LayoutDefault";
import IconInteraction from "@/components/icons/IconInteraction";
import IconGeneral from "@/components/icons/IconGeneral";
import { useNotification } from "@/components/providers/NotificationProvider";
// Types
import { Post } from "@/types/Post";
// Scripts
import getPost from "@/services/post/getPost";
import { EditorComponent } from "@/types/EditorComponent";
import PostCommentSection from "@/components/post/PostCommentSection";
import ProfilePicture from "@/components/ui/ProfilePicture";

const DynDisplayMarkdown = dynamic(() => import('../../../../components/postDisplays/DisplayMarkdown'), { loading: () => null })
// const DynDisplayCodeMirror = dynamic(() => import('./EditorCodeMirror'), { loading: () => null })


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
  }, [slug, postType]);

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
          <div className="grid grid-cols-3 gap-4">
            <section className="col-span-3 md:col-span-2 border border-hsl-l90 dark:border-hsl-l25 bg-hsl-l100 dark:bg-hsl-l15 rounded-xl">

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
                  <p className="text-hsl-l50">{post.authorFirstName} {post.authorLastName} &#x2022; {post.date}</p>
                </div>

                {contentComponents.map((component: EditorComponent, index: number) => (
                  <div key={component.id} className='mt-4 mb-8'>
                    {component.type === 'markdown' ? (
                      <DynDisplayMarkdown id={component.id} markdown={component.content} />
                    ) : (
                      <></>
                      // <DynEditorCodeMirror
                      //   id={component.id}
                      // />
                    )}
                  </div>
                ))}
              </div>

              <div className="px-4 py-8 border-t border-hsl-l90 dark:border-hsl-l25">
                <PostCommentSection postId={slug} dbPath={postType === 'question' ? 'POST_QUESTION' : 'POST_ARTICLE'}
                  updateCommentTotal={updateCommentTotal} />
              </div>

            </section>



            <section className="col-span-3 md:col-span-1 relative">
              <div className="bg-hsl-l100 dark:bg-hsl-l15 rounded-lg shadow-md overflow-hidden w-full max-w-full p-2 sticky top-4">
                <div className="flex flex-wrap items-center gap-1">
                  {post.tags?.map((tag, idx) => (
                    <p key={idx} className="bg-hsl-l95 dark:bg-hsl-l20 px-2 py text-hsl-l50 text-xxs rounded-lg">{tag}</p>
                  ))}
                </div>

                <IconInteraction type="like" />
                <IconInteraction type="dislike" />
                <IconInteraction type="heart" />
                <IconGeneral type="comment" />
                <p>{commentsTotal}</p>
                <IconGeneral type="flag" />

              </div>
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