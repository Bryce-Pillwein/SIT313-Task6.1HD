// Nav Menu tsx 

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import IconGeneral from "../../icons/IconGeneral";
import ReactDOM from 'react-dom';

const linksPost = [
  { href: "/create-post", type: "create-post", label: "Create", desc: "Create a new post" },
  { href: "/edit-post", type: "edit", label: "Edit", desc: "Edit an existing post" },
]

const linksView = [
  { href: "/view-questions", type: "view-questions", label: "Questions", desc: "See what others are asking" },
  { href: "/view-articles", type: "view-articles", label: "Articles", desc: "Read up to date articles" }
];

const linksMembership = [
  { href: "/pricing-plans", type: "plans", label: "Pricing Plans" },
  { href: "/manage-billing", type: "billing", label: "Manage Billing" }
];

const linksResource = [
  { href: "/guide", type: "guide", label: "Guides" },
  { href: "/support", type: "support", label: "Support" },
  { href: "/contact", type: "mail", label: "Contact" },
  { href: "/faq", type: "faq", label: "FAQs" },
  { href: "/report", type: "report", label: "Report" },
];
const NavMenuMobile = () => {
  const [isNavMenuOpen, setIsNavMenuOpen] = useState<boolean>(false);

  const NavMenuContent = (
    <div className="fixed top-0 left-0 w-[100vw] h-[100vh] bg-black bg-opacity-50 flex flex-col justify-center items-center z-50">

      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: isNavMenuOpen ? 1 : 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="absolute z-10"
      >

        <nav className="bg-hsl-l95 dark:bg-hsl-l20 fixed left-0 top-0 bottom-0 p-1 rounded-tr-lg rounded-br-lg flex flex-col gap-1 h-[100vh] overflow-y-scroll">

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
                <IconGeneral type={link.type} fillDarkMode="hsl(0 0% 70%)" fillLightMode="hsl(0 0% 30%)" />
                <div>
                  <p className="text-sm font-medium group-hover:text-mb-pink group-hover:dark:text-mb-yellow">{link.label}</p>
                  <p className="text-xs text-hsl-l50 group-hover:text-hsl-l5 group-hover:dark:text-hsl-l95">{link.desc}</p>
                </div>
                <div className="block group-hover:hidden ml-auto">
                  <IconGeneral type="arrow-right" size={16} fillDarkMode="hsl(0 0% 13%)" fillLightMode="hsl(0 0% 100%)" />
                </div>
                <div className="hidden group-hover:inline-block ml-auto">
                  <IconGeneral type="arrow-right" size={16} fillDarkMode="#FFE900" fillLightMode="#FF3EB5" />
                </div>
              </Link>
            ))}
          </div>

          <div className="bg-hsl-l100 dark:bg-hsl-l13 rounded-md relative z-20 px-4 py-4 flex flex-col gap-8">
            <p className="text-hsl-l50 font-medium text-sm -mb-2">QUESTIONS & ARTICLES</p>
            {linksView.map((link) => (
              <Link href={link.href} key={link.href} className="group flex items-center gap-4 ">
                <IconGeneral type={link.type} fillDarkMode="hsl(0 0% 70%)" fillLightMode="hsl(0 0% 30%)" />
                <div>
                  <p className="text-sm font-medium group-hover:text-mb-pink group-hover:dark:text-mb-yellow">{link.label}</p>
                  <p className="text-xs text-hsl-l50 group-hover:text-hsl-l5 group-hover:dark:text-hsl-l95">{link.desc}</p>
                </div>
                <div className="block group-hover:hidden ml-auto">
                  <IconGeneral type="arrow-right" size={16} fillDarkMode="hsl(0 0% 13%)" fillLightMode="hsl(0 0% 100%)" />
                </div>
                <div className="hidden group-hover:inline-block ml-auto">
                  <IconGeneral type="arrow-right" size={16} fillDarkMode="#FFE900" fillLightMode="#FF3EB5" />
                </div>
              </Link>
            ))}
          </div>

          <div className="bg-hsl-l100 dark:bg-hsl-l13 rounded-md relative z-20 px-4 py-4 flex flex-col gap-8">
            <p className="text-hsl-l50 font-medium text-sm -mb-2">MEMBERSHIP</p>
            {linksMembership.map((link) => (
              <Link href={link.href} key={link.href} className="group flex items-center gap-4">
                <IconGeneral type={link.type} fillDarkMode="hsl(0 0% 60%)" fillLightMode="hsl(0 0% 40%)" />
                <p className="text-sm font-medium group-hover:text-mb-pink group-hover:dark:text-mb-yellow">{link.label}</p>
              </Link>
            ))}
          </div>

          <div className="bg-hsl-l100 dark:bg-hsl-l13 rounded-md relative z-20 px-4 py-4 flex flex-col gap-8">
            <p className="text-hsl-l50 font-medium text-sm -mb-2">RESOURCES</p>
            <div className="grid grid-cols-2 gap-x-16 gap-y-4">
              {linksResource.map((link) => (
                <Link href={link.href} key={link.href} className="group flex items-center gap-4">
                  <IconGeneral type={link.type} fillDarkMode="hsl(0 0% 60%)" fillLightMode="hsl(0 0% 40%)" />
                  <p className="text-sm font-medium group-hover:text-mb-pink group-hover:dark:text-mb-yellow">{link.label}</p>
                </Link>
              ))}
            </div>
          </div>

          <div className="bg-hsl-l100 dark:bg-hsl-l13 rounded-md relative z-20 px-4 py-4 flex flex-col gap-4">
            <p className="text-hsl-l50 font-medium text-sm -mb-2">DEAKIN</p>
            <div className="grid grid-cols-2 gap-x-16 gap-y-4">
              <a rel="noopener noreferrer" target="_blank" href="https://www.deakin.edu.au/help-hub" className="group flex items-center gap-4 px-4">
                <IconGeneral type="help" fillDarkMode="hsl(0 0% 60%)" fillLightMode="hsl(0 0% 40%)" />
                <p className="text-sm font-medium group-hover:text-mb-pink group-hover:dark:text-mb-yellow">Help Hub</p>
              </a>
            </div>
          </div>
        </nav>
      </motion.section>
    </div>
  );


  return (
    <div>
      <div onClick={() => setIsNavMenuOpen(!isNavMenuOpen)}>
        <IconGeneral type="menu-open" />
      </div>

      {isNavMenuOpen && ReactDOM.createPortal(
        NavMenuContent,
        document.body
      )}
    </div>
  );
};

export default NavMenuMobile;
