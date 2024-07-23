// Header tsx

"use client";

import Link from "next/link";
import IconGeneral from "../icons/IconGeneral";
import { useThemeContext } from "../providers/ThemeProvider";
import IconDevDeakin from "../icons/IconDevDeakin";
import { auth } from '@/firebaseConfig';

const Header = () => {
  const { toggleTheme } = useThemeContext();


  return (
    <header className="app-container py-8 flex justify-between text-xl">
      <Link href='/' className="flex items-center">
        <IconDevDeakin />
        Deakin
      </Link>
      <div className="flex gap-4 mb:gap-10">
        {/* <input type="text" placeholder="Search"
          className="hidden md:block inputField w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg text-sm" /> */}
        <Link href="/post" className="">Post</Link>
        <Link href="/questions" className="">Questions</Link>
        <div className="cursor-pointer flex flex-shrink-0" onClick={toggleTheme}>
          <IconGeneral type='dark-light-mode' />
        </div>

        {!auth.currentUser ? (
          <>
            <Link href="/login" className="">Sign In</Link>
            <Link href="/login" className="">Register</Link>
          </>
        ) : (
          <div>
            <IconGeneral type="profile" />
          </div>
        )}


      </div>
    </header>
  )
};

export default Header;