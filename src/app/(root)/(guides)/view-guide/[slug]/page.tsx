// View Guide Video Playback Page tsx

"use client";

import { useEffect, useState } from "react";
import { useNotification } from "@/components/providers/NotificationProvider";
import LayoutDefault from "@/components/layout/LayoutDefault";
import ProfilePicture from "@/components/ui/ProfilePicture";
import Link from "next/link";
import Guide from "@/types/Guide";
import dynamic from "next/dynamic";
import { addViewToGuide, getGuideByPostId } from "@/services";
import IconGeneral from "@/components/icons/IconGeneral";
import { useAuth } from "@/components/providers/AuthProvider";

const DynDisplayMarkdown = dynamic(() => import('../../../../../components/postDisplays/DisplayMarkdown'), { loading: () => null })

export default function ViewGuideVideoPlaybackPage({ params }: { params: { slug: string } }) {
  const { user, loading } = useAuth();
  const { addNotification } = useNotification();
  const { slug } = params;
  const [guide, setGuide] = useState<Guide | null>(null);
  const [description, setDescription] = useState<string>('');
  const [isFetchingPost, setIsFetchingPost] = useState<boolean>(true);

  /**
   * Fecth the Post Data at Page Mounting
   */
  useEffect(() => {
    if (slug) {
      const fetchGuide = async () => {
        try {
          const response = await getGuideByPostId(slug);

          if ('success' in response && !response.success) {
            addNotification(response.message || 'Error fetching guide');
            return;
          }

          setGuide(response as Guide);
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
   * Fetch Guide Description Content
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
        }
      };
      fetchGuideContent();
    };
  }, [guide]);

  /**
   * Add View Count
   */
  useEffect(() => {
    if (user) {
      const addView = async () => {
        try {
          await addViewToGuide(slug, user.uid);
        } catch (error) {
          console.error('Error adding view: ', error);
        }
      }
      addView();
    }
  }, [user, slug])


  return (
    <LayoutDefault>
      <main className="pb-8">
        {guide && (
          <div className="grid grid-cols-3 gap-4">
            <section className="col-span-3 md:col-span-2 ">

              {/* Guide Video */}
              <video className="w-full rounded-md" controls src={guide.videoURL} >
                Your browser does not support the video tag.
              </video>

              {/* User Profile */}
              <div className="flex items-center gap-x-2 mt-4 px-4" >
                <ProfilePicture size="30" />
                <Link href={`/profile/${guide.userId}`} className="font-medium text-hsl-l30 dark:text-hsl-l70 hover:text-mb-pink hover:dark:text-mb-yellow hover:underline">
                  {guide.authorFirstName} {guide.authorLastName}
                </Link>
              </div>

              {/* View Count and Date */}
              <div className="flex gap-x-4 my-2 items-center px-4">
                <div className="flex items-center gap-x-2">
                  <IconGeneral type="visible" className="fill-hsl-l50 dark:fill-hsl-l50" />
                  <p className="font-medium text-sm text-hsl-l50">{guide.viewsCount} {guide.viewsCount === 1 ? 'View' : 'Views'}</p>
                </div>

                <p className="font-medium text-sm text-hsl-l50">{guide.date}</p>
              </div>

              {/* Title and Description */}
              <div className="mt-4 px-4 py-4 border border-hsl-l90 dark:border-hsl-l25 bg-hsl-l100 dark:bg-hsl-l15 rounded-md">
                <h2 className="text-2xl font-semibold">{guide.title}</h2>

                <DynDisplayMarkdown id={'001X'} markdown={description} />
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