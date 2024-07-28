// Header tsx

"use client";

import Link from "next/link";
// Components
import IconGeneral from "../icons/IconGeneral";
import IconDevDeakin from "../icons/IconDevDeakin";
import { useAuth } from "../providers/AuthProvider";
import dynamic from "next/dynamic";
import { useState } from "react";

const DynamicProfileBanner = dynamic(() => import('./ProfileBanner'), {
  loading: () => <></>,
})

const Header = () => {
  const { user, loading } = useAuth();
  const [isProfileBannerVisible, setIsProfileBannerVisible] = useState<boolean>(false);

  return (
    <header className="app-container py-6 flex items-center justify-between text-xl">
      <Link href='/' className="flex items-center">
        <IconDevDeakin />
        Deakin
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
          <div className="cursor-pointer" onClick={() => setIsProfileBannerVisible(true)}>
            <IconGeneral type="profile" fillLightMode="hsl(0 0% 40%)" fillDarkMode="hsl(0 0% 60%)" />
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