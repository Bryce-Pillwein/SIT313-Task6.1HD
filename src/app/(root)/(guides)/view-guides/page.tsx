// View Guies Page tsx

"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useNotification } from "@/components/providers/NotificationProvider";
import { getAllGuides } from "@/services";
import LayoutDefault from "@/components/layout/LayoutDefault";
import ToolBar from "@/components/ToolBar";
import IconGeneral from "@/components/icons/IconGeneral";
import Guide from "@/types/Guide";
import Link from "next/link";

export default function ViewGuiesPage() {
  const { addNotification } = useNotification();
  const [isFetchingData, setIsFetchingData] = useState<boolean>(true);
  const [guides, setGuides] = useState<Guide[] | null>(null);


  /**
   * Fetch Posts Upon Mounting Page
   */
  useEffect(() => {
    const fetchGuides = async () => {
      try {
        const data = await getAllGuides();
        setGuides(data);
      } catch (error) {
        console.error(error);
        addNotification("Error fetching posts. Please reload.");
      } finally {
        setIsFetchingData(false);
      }
    }

    fetchGuides();
  }, [addNotification]);



  return (
    <LayoutDefault>
      <main className="pb-4">

        {/* Guides */}
        <h1 className="font-semibold text-3xl mb-4 mt-8 ml-4">Guides</h1>
        {guides && (guides.length > 0) && (
          <div className="gap-4 grid grid-cols-1 md:grid-cols-3">
            {guides.map((guide, idx) => (
              <motion.div
                key={guide.postId}
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.7 }}
                transition={{
                  duration: 0.3, delay: idx * 0.15,
                  type: "spring", stiffness: 300, damping: 20
                }}
                className="group bg-hsl-l100 dark:bg-hsl-l15 rounded-lg shadow-md w-full max-w-full h-full mx-auto relative"
              >
                <Link href={`/view-guide/${guide.postId}`} className="w-full h-full">
                  <video src={guide.videoURL} className=" rounded-tr-lg rounded-tl-lg"></video>
                  <div className="p-4 flex flex-col">
                    <h2 className="text-lg font-bold truncate">{guide.title}</h2>
                    <p className="text-sm text-hsl-l50">{guide.authorFirstName} {guide.authorLastName}</p>
                    <div className="flex justify-between items-center">
                      <p className="text-xs text-hsl-l50">{guide.date}</p>
                      <div className="flex gap-x-2 items-center">
                        <IconGeneral type="visible" className="fill-hsl-l50 dark:fill-hsl-l50" size={18} />
                        <p className="text-xs text-hsl-l50">{guide.viewsCount} {guide.viewsCount === 1 ? 'View' : 'Views'}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}


        {/* Retrieving Data */}
        {isFetchingData && (
          <div className="min-h-[70vh] flex justify-center items-center">
            <p className="text-2xl text-hsl-l50 font-medium">Fetching Questions...</p>
          </div>
        )}

        {/* Failed Retreiving Data */}
        {!isFetchingData && !guides && (
          <div className="min-h-[70vh] flex flex-col justify-center items-center">
            <p className="text-2xl text-hsl-l50 font-medium">Error Fetching Posts</p>
            <p className="text-2xl text-hsl-l50 font-medium">Please try again later</p>
          </div>
        )}

      </main>
    </LayoutDefault >
  );
}