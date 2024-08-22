// Header tsx

"use client";

import { useEffect, useState } from "react";
import ReactDOM from 'react-dom';
import Link from "next/link";
import dynamic from "next/dynamic";
import IconGeneral from "../icons/IconGeneral";
import IconDevDeakin from "../icons/IconDevDeakin";
import { useAuth } from "../providers/AuthProvider";
import { AnimatePresence, motion } from "framer-motion";

const DynamicProfileBanner = dynamic(() => import('./ProfileBanner'), {
  loading: () => <></>,
})

const DynamicNavMenu = dynamic(() => import('./Navigation/NavMenu'), {
  loading: () => <></>
})

const DynamicNavMenuMobile = dynamic(() => import('./Navigation/NavMenuMobile'), {
  loading: () => <></>
})



const Header = () => {
  const { user, loading } = useAuth();
  const [isProfileBannerVisible, setIsProfileBannerVisible] = useState<boolean>(false);
  const [isClient, setIsClient] = useState(false);

  /**
   * Enforce document availible for profile banner
   */
  useEffect(() => {
    setIsClient(true);
  }, []);

  const renderProfileBanner = () => (
    <AnimatePresence>
      {isProfileBannerVisible && user && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed top-0 right-0 w-[100vw] h-[100vh] bg-black bg-opacity-50 flex flex-col justify-center items-center z-50"
        >
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="bg-hsl-l95 dark:bg-hsl-l15 rounded-tl-lg rounded-bl-lg flex flex-col fixed right-0 top-0 bottom-0 px-4 py-8 w-[80%] mb:max-w-[350px]"
          >
            <DynamicProfileBanner onClose={() => setIsProfileBannerVisible(false)} uid={user.uid} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <header className="app-container py-3 flex items-center justify-between">

      <Link href='/' className="flex justify-center items-center gap-2">
        <IconDevDeakin />
        <div>
          <p className="font-mono font-semibold leading-5 text-lg">{'<Devs />'}</p>
          <p className="font-mono font-semibold leading-5 text-lg">{'<Deakin />'}</p>
        </div>
      </Link>


      <div className="flex items-center gap-x-4 mb:gap-x-10">


        <div className="block md:hidden">
          <DynamicNavMenuMobile />
        </div>

        <div className="hidden md:block">
          <DynamicNavMenu />
        </div>


        {loading ? null : (
          !user ? (
            <Link href="/login" className="">Sign In</Link>
          ) : (
            <div className="cursor-pointer flex-shrink-0" onClick={() => setIsProfileBannerVisible(true)}>
              <IconGeneral type="profile" fillLightMode="hsl(0 0% 40%)" fillDarkMode="hsl(0 0% 60%)" size={30} />
            </div>
          )
        )}

      </div>


      {isClient && ReactDOM.createPortal(renderProfileBanner(), document.body)}

    </header>
  )
};

export default Header;