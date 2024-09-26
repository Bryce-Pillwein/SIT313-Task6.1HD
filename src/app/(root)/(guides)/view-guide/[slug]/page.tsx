// View Guide Single - Page tsx

"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useNotification } from "@/components/providers/NotificationProvider";
import Image from "next/image";
import LayoutDefault from "@/components/layout/LayoutDefault";
import getPost from "@/services/post/getPost";
import PostCommentSection from "@/components/post/PostCommentSection";
import ProfilePicture from "@/components/ui/ProfilePicture";
import Link from "next/link";
import Guide from "@/types/Guide";
import dynamic from "next/dynamic";
import PostInteractions from "@/components/post/PostInteractions";

const DynDisplayMarkdown = dynamic(() => import('../../../../../components/postDisplays/DisplayMarkdown'), { loading: () => null })

export default function ViewPostPage({ params }: { params: { slug: string } }) {
  const { addNotification } = useNotification();
  const { slug } = params;
  const [isFetchingPost, setIsFetchingPost] = useState<boolean>(true);
  const [guide, setGuide] = useState<Guide | null>(null);
  const [description, setDescription] = useState<string>('');
  const [isFetchingPostContent, setIsFetchingPostContent] = useState<boolean>(true);

  /**
   * Fecth the Post Data at Page Mounting
   */
  useEffect(() => {
    if (slug) {
      const fetchGuide = async () => {
        try {
          const response = await getPost(slug);

          if ('success' in response && !response.success) {
            addNotification(response.message || 'Error fetching post');
            return;
          }

          // setGuide(response as Guide);
        } catch (error) {
          console.error(error);
          addNotification('Error fetching post. Please reload.');
        } finally {
          setIsFetchingPost(false);
        }
      };

      fetchGuide();
    }
  }, [slug, addNotification]);

  /**
   * Fetch Post Content
   */
  useEffect(() => {
    if (guide?.descriptionURL) {
      const fetchGuideContent = async () => {
        try {

          const response = await fetch(guide.descriptionURL);
          const content = await response.text();

          setDescription(content);
        } catch (error) {
          console.error('Error fetching post content:', error);
        } finally {
          setIsFetchingPostContent(false);
        }
      };

      fetchGuideContent();
    };
  }, [guide]);


  return (
    <LayoutDefault>
      <main className="pb-8">
        {guide && (
          <div className="relative grid grid-cols-3 gap-4">
            {/* Sticky Interactions for large Screen*/}
            <div className="hidden md:block absolute left-0 transform translate-x-[-120%] top-0 h-full">
              <PostInteractions layout="vert" postId={slug} />
            </div>

            {/* Post Area */}
            <section className="relative col-span-3 md:col-span-2 border border-hsl-l90 dark:border-hsl-l25 bg-hsl-l100 dark:bg-hsl-l15 rounded-xl">
              {/* Banner Image */}
              <div className="relative pb-[56.25%] border-b border-hsl-l90 dark:border-hsl-l25">
                <p>image</p>
              </div>

              {/* Content Markdown & Code */}
              <div className="px-4">
                <h2 className="text-2xl font-semibold mt-8 mb-2">{guide.title}</h2>
                <div className="flex items-center gap-4  mb-8">
                  <ProfilePicture size="30" />
                  <p className="text-hsl-l50 ">
                    <Link href={`/profile/${guide.userId}`}
                      className="hover:text-mb-pink hover:dark:text-mb-yellow hover:underline">
                      {guide.authorFirstName} {guide.authorLastName}
                    </Link> &#x2022; {guide.date}
                  </p>

                </div>

                <DynDisplayMarkdown id={'001X'} markdown={description} />

              </div>

              {/* Small Screen Interactions / Reactions */}
              <div className="block md:hidden px-4 py-8 border-t border-hsl-l90 dark:border-hsl-l25">
                <PostInteractions layout="horiz" postId={slug} />
              </div>

              {/* Comment Section */}
              <div className="px-4 py-4 border-t border-hsl-l90 dark:border-hsl-l25">
                <PostCommentSection postId={slug} />
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
        {!isFetchingPost && !guide && (
          <div className="min-h-[70vh] flex flex-col justify-center items-center">
            <p className="text-2xl text-hsl-l50 font-medium">Error Fetching Post.</p>
            <p className="text-2xl text-hsl-l50 font-medium">Please try again later.</p>
          </div>
        )}

      </main>
    </LayoutDefault >
  );
}