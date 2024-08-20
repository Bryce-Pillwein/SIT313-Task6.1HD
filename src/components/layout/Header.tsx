// Header tsx

"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import IconGeneral from "../icons/IconGeneral";
import IconDevDeakin from "../icons/IconDevDeakin";
import { useAuth } from "../providers/AuthProvider";
import NavMenu from "./NavigationMenu/NavMenu";

const DynamicProfileBanner = dynamic(() => import('./ProfileBanner'), {
  loading: () => <></>,
})

const DynamicNavMenu = dynamic(() => import('./NavigationMenu/NavMenu'), {
  loading: () => <></>
})

const DynamicNavMenuMobile = dynamic(() => import('./NavigationMenu/NavMenuMobile'), {
  loading: () => <></>
})



const Header = () => {
  const { user, loading } = useAuth();
  const [isProfileBannerVisible, setIsProfileBannerVisible] = useState<boolean>(false);


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


        {/* Update to check if loading.
        **************************************************
        Return no options */}
        {!user ? (
          <Link href="/login" className="">Sign In</Link>
        ) : (
          <div className="cursor-pointer flex-shrink-0" onClick={() => setIsProfileBannerVisible(true)}>
            <IconGeneral type="profile" fillLightMode="hsl(0 0% 40%)" fillDarkMode="hsl(0 0% 60%)" size={30} />
          </div>
        )}
      </div>

      {isProfileBannerVisible && user && (
        <DynamicProfileBanner onClose={() => setIsProfileBannerVisible(false)} uid={user.uid} />
      )}



    </header>
  )
};

export default Header;