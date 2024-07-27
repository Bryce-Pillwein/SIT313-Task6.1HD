// Profile Banner tsx

import { getUserValue } from "@/services";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import IconGeneral from "../icons/IconGeneral";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getAuth, signOut } from "firebase/auth";
import { firebaseApp } from "@/firebaseConfig";
import { useThemeContext } from "../providers/ThemeProvider";

interface ProfileBannerProps {
  uid: string;
  onClose: () => void;
}

const ProfileBanner: React.FC<ProfileBannerProps> = ({ uid, onClose }) => {
  const { toggleTheme } = useThemeContext();
  const innerDivRef = useRef<HTMLDivElement>(null);
  const [user, setUser] = useState({ firstName: '', lastName: '' });
  const router = useRouter();

  async function handleLogout() {
    try {
      await signOut(getAuth(firebaseApp));
      await fetch("/api/logout");
      router.push("/login");
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (innerDivRef.current && !innerDivRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEsc);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleEsc);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  useEffect(() => {
    getUserName();
  }, [])

  const getUserName = async () => {
    try {
      const fn = await getUserValue(uid, 'firstName');
      const ln = await getUserValue(uid, 'lastName');
      setUser({ firstName: fn, lastName: ln });
    } catch (error) {
      console.error(error)
    }
  }

  return createPortal(
    <div className="fixed top-0 left-0 w-[100vw] h-[100vh] bg-black bg-opacity-50 flex flex-col justify-center items-center z-50">
      <div ref={innerDivRef}
        className="bg-hsl-l95 dark:bg-hsl-l15 rounded-tl-lg rounded-bl-lg flex flex-col fixed right-0 top-0 bottom-0 px-4 py-8 mb:min-w-[350px]">


        {(user.firstName.length > 0) && (user.lastName.length > 0) ? (
          <div className="flex justify-between items-center">
            <p className="font-medium">{user.firstName} {user.lastName}</p>
            <div onClick={onClose} className="hover:bg-hsl-l90 hover:dark:bg-hsl-l20 rounded-sm cursor-pointer">
              <IconGeneral type="close" fillLightMode="hsl(0 0% 30%)" fillDarkMode="hsl(0 0% 70%)" />
            </div>
          </div>
        ) : (
          <p>Loading User</p>
        )}

        <div className="border-b border-hsl-l50 my-4"></div>

        <Link href="/" className=" hover:bg-hsl-l90 hover:dark:bg-hsl-l20 px-2 py-1 my-1 flex items-center gap-2 rounded-md">
          <IconGeneral type="profile" fillLightMode="hsl(0 0% 30%)" fillDarkMode="hsl(0 0% 70%)" />
          <p className="font-medium text-hsl-l30 dark:text-hsl-l70">Your Profile</p>
        </Link>

        <Link href="/" className=" hover:bg-hsl-l90 hover:dark:bg-hsl-l20 px-2 py-1 my-1 flex items-center gap-2 rounded-md">
          <IconGeneral type="book-post" fillLightMode="hsl(0 0% 30%)" fillDarkMode="hsl(0 0% 70%)" />
          <p className="font-medium text-hsl-l30 dark:text-hsl-l70">Your Post</p>
        </Link>

        <Link href="/" className=" hover:bg-hsl-l90 hover:dark:bg-hsl-l20 px-2 py-1 my-1 flex items-center gap-2 rounded-md">
          <IconGeneral type="settings" fillLightMode="hsl(0 0% 30%)" fillDarkMode="hsl(0 0% 70%)" />
          <p className="font-medium text-hsl-l30 dark:text-hsl-l70">Settings</p>
        </Link>

        <div onClick={toggleTheme} className="cursor-pointer hover:bg-hsl-l90 hover:dark:bg-hsl-l20 px-2 py-1 my-1 flex items-center gap-2 rounded-md">
          <IconGeneral type='dark-light-mode' fillLightMode="hsl(0 0% 30%)" fillDarkMode="hsl(0 0% 70%)" />
          <p className="font-medium text-hsl-l30 dark:text-hsl-l70">Toggle Darkmode</p>
        </div>


        <div className="border-b border-hsl-l50 my-4"></div>


        <a href="https://www.deakin.edu.au/student-life-and-services/support-services" target="_blank" rel="noopener noreferrer"
          className=" hover:bg-hsl-l90 hover:dark:bg-hsl-l20 px-2 py-1 my-1 flex items-center gap-2 rounded-md">
          <IconGeneral type="help" fillLightMode="hsl(0 0% 30%)" fillDarkMode="hsl(0 0% 70%)" />
          <p className="font-medium text-hsl-l30 dark:text-hsl-l70">Support Services</p>
        </a>

        <Link href="/" className=" hover:bg-hsl-l90 hover:dark:bg-hsl-l20 px-2 py-1 my-1 flex items-center gap-2 rounded-md">
          <IconGeneral type="report" fillLightMode="hsl(0 0% 30%)" fillDarkMode="hsl(0 0% 70%)" />
          <p className="font-medium text-hsl-l30 dark:text-hsl-l70">Report an Issue</p>
        </Link>

        <Link href="/" className=" hover:bg-hsl-l90 hover:dark:bg-hsl-l20 px-2 py-1 my-1 flex items-center gap-2 rounded-md">
          <IconGeneral type="feedback" fillLightMode="hsl(0 0% 30%)" fillDarkMode="hsl(0 0% 70%)" />
          <p className="font-medium text-hsl-l30 dark:text-hsl-l70">Provide Feedback</p>
        </Link>


        <div className="border-b border-hsl-l50 my-4"></div>


        <button type="button" onClick={handleLogout}
          className=" hover:bg-hsl-l90 hover:dark:bg-hsl-l20 px-2 py-1 my-1 flex items-center gap-2 rounded-md">
          <IconGeneral type="logout" fillLightMode="hsl(0 0% 30%)" fillDarkMode="hsl(0 0% 70%)" />
          <p className="font-medium text-hsl-l30 dark:text-hsl-l70">Sign Out</p>
        </button>

      </div>
    </div>,
    document.body
  );
};

export default ProfileBanner;