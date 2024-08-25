// Profile Banner tsx

import { getUserValue } from "@/services";
import { useEffect, useRef, useState } from "react";
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

  const linksProfile = [
    { href: "/", type: "profile", label: "Your Profile" },
    { href: "/", type: "book-post", label: "Your Post" },
    { href: "/", type: "settings", label: "Settings" }
  ]

  /**
   * Handle Logout
   */
  async function handleLogout() {
    try {
      await signOut(getAuth(firebaseApp));
      await fetch("/api/logout");
      router.push("/login");
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * Create event listerner for mouse clicks in modal menu
   */
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

  /**
   * Get User Name
   */
  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const [firstName, lastName] = await Promise.all([
          getUserValue(uid, 'firstName'),
          getUserValue(uid, 'lastName')
        ]);
        setUser({ firstName, lastName });
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserName();
  }, [uid]);






  return (
    <div ref={innerDivRef}>

      <div className="flex justify-between items-center">
        {(user.firstName.length > 0) && (user.lastName.length > 0) ? (
          <p className="font-medium">{user.firstName} {user.lastName}</p>
        ) : (
          <p>Loading User</p>
        )}
        <div onClick={onClose} className="hover:bg-hsl-l90 hover:dark:bg-hsl-l20 rounded-sm cursor-pointer">
          <IconGeneral type="close" className="fill-hsl-l30 dark:fill-hsl-l70" />
        </div>
      </div>

      <div className="border-b border-hsl-l50 my-4"></div>

      {linksProfile.map((link, idx) => (
        <Link href={link.href} key={idx} className=" hover:bg-hsl-l90 hover:dark:bg-hsl-l20 px-2 py-1 my-1 flex items-center gap-2 rounded-md">
          <IconGeneral type={link.type} className="fill-hsl-l30 dark:fill-hsl-l70" />
          <p className="font-medium text-hsl-l30 dark:text-hsl-l70">{link.label}</p>
        </Link>
      ))}

      <div onClick={toggleTheme} className="cursor-pointer hover:bg-hsl-l90 hover:dark:bg-hsl-l20 px-2 py-1 my-1 flex items-center gap-2 rounded-md">
        <IconGeneral type='dark-light-mode' className="fill-hsl-l30 dark:fill-hsl-l70" />
        <p className="font-medium text-hsl-l30 dark:text-hsl-l70">Toggle Darkmode</p>
      </div>


      <div className="border-b border-hsl-l50 my-4"></div>


      <a href="https://www.deakin.edu.au/student-life-and-services/support-services" target="_blank" rel="noopener noreferrer"
        className=" hover:bg-hsl-l90 hover:dark:bg-hsl-l20 px-2 py-1 my-1 flex items-center gap-2 rounded-md">
        <IconGeneral type="help" className="fill-hsl-l30 dark:fill-hsl-l70" />
        <p className="font-medium text-hsl-l30 dark:text-hsl-l70">Support Services</p>
      </a>

      <Link href="/" className=" hover:bg-hsl-l90 hover:dark:bg-hsl-l20 px-2 py-1 my-1 flex items-center gap-2 rounded-md">
        <IconGeneral type="report" className="fill-hsl-l30 dark:fill-hsl-l70" />
        <p className="font-medium text-hsl-l30 dark:text-hsl-l70">Report an Issue</p>
      </Link>

      <Link href="/" className=" hover:bg-hsl-l90 hover:dark:bg-hsl-l20 px-2 py-1 my-1 flex items-center gap-2 rounded-md">
        <IconGeneral type="feedback" className="fill-hsl-l30 dark:fill-hsl-l70" />
        <p className="font-medium text-hsl-l30 dark:text-hsl-l70">Provide Feedback</p>
      </Link>

      <div className="border-b border-hsl-l50 my-4"></div>

      <button type="button" onClick={handleLogout}
        className=" hover:bg-hsl-l90 hover:dark:bg-hsl-l20 px-2 py-1 my-1 flex items-center gap-2 rounded-md">
        <IconGeneral type="logout" className="fill-hsl-l30 dark:fill-hsl-l70" />
        <p className="font-medium text-hsl-l30 dark:text-hsl-l70">Sign Out</p>
      </button>
    </div>
  );
};

export default ProfileBanner;