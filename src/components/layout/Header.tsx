// Header tsx

"use client";

import { useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
// Components
import IconGeneral from "../icons/IconGeneral";
import IconDevDeakin from "../icons/IconDevDeakin";
import { useAuth } from "../providers/AuthProvider";

const DynamicProfileBanner = dynamic(() => import('./ProfileBanner'), {
  loading: () => <></>,
})

const Header = () => {
  const { user, loading } = useAuth();
  const [isProfileBannerVisible, setIsProfileBannerVisible] = useState<boolean>(false);

  return (
    <header className="app-container py-6 flex items-center justify-between text-xl">

      <Link href='/' className="flex justify-center items-center gap-2">
        <IconDevDeakin />
        <div>
          <p className="font-mono font-semibold leading-5">{'<Devs />'}</p>
          <p className="font-mono font-semibold leading-5">{'<Deakin />'}</p>
        </div>
      </Link>


      <div className="flex items-center gap-x-4 mb:gap-x-10">
        <Link href="/post" className="">Post</Link>
        <Link href="/questions" className="">Questions</Link>

        {!user ? (
          <>
            <Link href="/login" className="">Sign In</Link>
            <Link href="/login" className="">Register</Link>
          </>
        ) : (
          <div className="cursor-pointer flex-shrink-0" onClick={() => setIsProfileBannerVisible(true)}>
            <IconGeneral type="profile" fillLightMode="hsl(0 0% 40%)" fillDarkMode="hsl(0 0% 60%)" size={30} />
          </div>
        )}

        {isProfileBannerVisible && user && (
          <DynamicProfileBanner onClose={() => setIsProfileBannerVisible(false)} uid={user.uid} />
        )}


      </div>
    </header>
  )
};

export default Header;