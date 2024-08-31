// Nav Menu tsx 

"use client"

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import IconGeneral from "../../icons/IconGeneral";
import ReactDOM from 'react-dom';
import { linksPost, linksView, linksMembership, linksResource } from "./NavigationLinks";
import IconNavigation from "@/components/icons/IconNavigation";

const NavMenuMobile = () => {
  const [isNavMenuOpen, setIsNavMenuOpen] = useState<boolean>(false);
  const [isClient, setIsClient] = useState(false);

  /**
   * Enforce client document availible for profile banner
   */
  useEffect(() => {
    setIsClient(true);
  }, []);


  const renderMobileNav = () => (
    <AnimatePresence>
      {isNavMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed top-0 left-0 w-[100vw] h-[100vh] bg-black bg-opacity-50 flex flex-col justify-center items-center z-50"
        >
          <motion.nav
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="bg-hsl-l95 dark:bg-hsl-l20 fixed top-0 left-0 bottom-0 p-1 rounded-tr-lg rounded-br-lg flex flex-col gap-1 h-full z-50 overflow-y-scroll"
          >
            <div className="flex justify-between items-center px-4 py-2">
              <p className="text-hsl-l50 font-medium text-sm">Devs Deakin Menu</p>
              <div onClick={() => setIsNavMenuOpen(!isNavMenuOpen)}>
                <IconGeneral type="close" />
              </div>
            </div>

            <div className="bg-hsl-l100 dark:bg-hsl-l13 rounded-md relative z-20 px-4 py-4 flex flex-col gap-8">
              <p className="text-hsl-l50 font-medium text-sm -mb-2">QUESTIONS & ARTICLES</p>
              {linksPost.map((link) => (
                <Link href={link.href} key={link.href} className="group flex items-center gap-4 ">
                  <IconNavigation type={link.type} className="group-hover:fill-mb-pink group-hover:dark:fill-mb-yellow" />
                  <div>
                    <p className="text-sm font-medium group-hover:text-mb-pink group-hover:dark:text-mb-yellow">{link.label}</p>
                    <p className="text-xs text-hsl-l50 group-hover:text-hsl-l5 group-hover:dark:text-hsl-l95">{link.desc}</p>
                  </div>
                  <div className="block group-hover:hidden ml-auto">
                    <IconGeneral type="arrow-right" size={16} className="fill-hsl-l100 dark:fill-hsl-l13" />
                  </div>
                  <div className="hidden group-hover:inline-block ml-auto">
                    <IconGeneral type="arrow-right" size={16} className="fill-mb-pink dark:fill-mb-yellow" />
                  </div>
                </Link>
              ))}
            </div>

            <div className="bg-hsl-l100 dark:bg-hsl-l13 rounded-md relative z-20 px-4 py-4 flex flex-col gap-8">
              <p className="text-hsl-l50 font-medium text-sm -mb-2">QUESTIONS & ARTICLES</p>
              {linksView.map((link) => (
                <Link href={link.href} key={link.href} className="group flex items-center gap-4 ">
                  <IconNavigation type={link.type} className="group-hover:fill-mb-pink group-hover:dark:fill-mb-yellow" />
                  <div>
                    <p className="text-sm font-medium group-hover:text-mb-pink group-hover:dark:text-mb-yellow">{link.label}</p>
                    <p className="text-xs text-hsl-l50 group-hover:text-hsl-l5 group-hover:dark:text-hsl-l95">{link.desc}</p>
                  </div>
                  <div className="block group-hover:hidden ml-auto">
                    <IconGeneral type="arrow-right" size={16} className="fill-hsl-l100 dark:fill-hsl-l13" />
                  </div>
                  <div className="hidden group-hover:inline-block ml-auto">
                    <IconGeneral type="arrow-right" size={16} className="fill-mb-pink dark:fill-mb-yellow" />
                  </div>
                </Link>
              ))}
            </div>

            <div className="bg-hsl-l100 dark:bg-hsl-l13 rounded-md relative z-20 px-4 py-4 flex flex-col gap-8">
              <p className="text-hsl-l50 font-medium text-sm -mb-2">MEMBERSHIP</p>
              {linksMembership.map((link) => (
                <Link href={link.href} key={link.href} className="group flex items-center gap-4">
                  <IconNavigation type={link.type} className="group-hover:fill-mb-pink group-hover:dark:fill-mb-yellow" />
                  <p className="text-sm font-medium group-hover:text-mb-pink group-hover:dark:text-mb-yellow">{link.label}</p>
                </Link>
              ))}
            </div>

            <div className="bg-hsl-l100 dark:bg-hsl-l13 rounded-md relative z-20 px-4 py-4 flex flex-col gap-8">
              <p className="text-hsl-l50 font-medium text-sm -mb-2">RESOURCES</p>
              <div className="grid grid-cols-2 gap-x-16 gap-y-4">
                {linksResource.map((link) => (
                  <Link href={link.href} key={link.href} className="group flex items-center gap-4">
                    <IconNavigation type={link.type} className="group-hover:fill-mb-pink group-hover:dark:fill-mb-yellow" />
                    <p className="text-sm font-medium group-hover:text-mb-pink group-hover:dark:text-mb-yellow">{link.label}</p>
                  </Link>
                ))}
              </div>
            </div>

            <div className="bg-hsl-l100 dark:bg-hsl-l13 rounded-md relative z-20 px-4 py-4 flex flex-col gap-4">
              <p className="text-hsl-l50 font-medium text-sm -mb-2">DEAKIN</p>
              <div className="grid grid-cols-2 gap-x-16 gap-y-4">
                <a rel="noopener noreferrer" target="_blank" href="https://www.deakin.edu.au/help-hub" className="group flex items-center gap-4">
                  <IconNavigation type="help" className="group-hover:fill-mb-pink group-hover:dark:fill-mb-yellow" />
                  <p className="text-sm font-medium group-hover:text-mb-pink group-hover:dark:text-mb-yellow">Help Hub</p>
                </a>
              </div>
            </div>
          </motion.nav>
        </motion.div>
      )}
    </AnimatePresence>
  );


  return (
    <div>
      <div onClick={() => setIsNavMenuOpen(!isNavMenuOpen)}
        className="border rounded-sm border-hsl-l50">
        <IconGeneral type="menu-open" className="fill-hsl-l30 dark:fill-hsl-l70" />
      </div>

      {isClient && ReactDOM.createPortal(renderMobileNav(), document.body)}
    </div>
  );
};

export default NavMenuMobile;
