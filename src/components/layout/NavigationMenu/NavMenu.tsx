// Nav Menu tsx 

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import IconGeneral from "../../icons/IconGeneral";

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

interface Location {
  center: number;
  bottom: number;
}

const NavMenu = () => {
  const [isNavMenuOpen, setIsNavMenuOpen] = useState<boolean>(false);
  const [location, setLocation] = useState<Location>({ center: 0, bottom: 0 });
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  const displayNavMenu = (e: React.MouseEvent<HTMLParagraphElement, MouseEvent>, linkName: string) => {
    const tempBtn = e.currentTarget.getBoundingClientRect();
    const center = (tempBtn.left + tempBtn.right) / 2;
    const bottom = tempBtn.bottom;
    setHoveredLink(linkName);
    openNavMenu({ center, bottom });
  };

  const openNavMenu = (coordinates: Location) => {
    setLocation(coordinates);
    setIsNavMenuOpen(true);
  };

  const closeNavMenu = () => {
    setHoveredLink(null);
    setIsNavMenuOpen(false);
  };


  return (
    <nav onMouseLeave={closeNavMenu}>
      <div className="flex items-center">
        <p className="nav-link px-8 py-4 font-bold font-nunito text-lg cursor-pointer"
          onMouseOver={(e) => displayNavMenu(e, 'Post')}>Post</p>
        <p className="nav-link px-8 py-4 font-bold font-nunito text-lg cursor-pointer"
          onMouseOver={(e) => displayNavMenu(e, 'View')}>View</p>
        <p className="nav-link px-8 py-4 font-bold font-nunito text-lg cursor-pointer"
          onMouseOver={(e) => displayNavMenu(e, 'Resources')}>Resources</p>
      </div>


      <motion.section
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{
          opacity: isNavMenuOpen ? 1 : 0,
          scale: isNavMenuOpen ? 1 : 0.95,
          left: location.center,
          top: location.bottom,
          x: '-50%',
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
          scale: { duration: 0.5 },
        }}
        className="absolute z-10"
        style={{ width: "auto", height: "auto", minWidth: 'max-content' }}
      >

        <div className="arrow"></div>
        <div className="bg-hsl-l95 dark:bg-hsl-l20 p-1 rounded-lg flex flex-col gap-1 min-w-min flex-shrink-0">

          {hoveredLink === 'Post' && (
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
          )}

          {hoveredLink === 'View' && (
            <>
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
                <div className="grid grid-cols-2 gap-x-16 gap-y-4">
                  {linksMembership.map((link) => (
                    <Link href={link.href} key={link.href} className="group flex items-center gap-4 px-4">
                      <IconGeneral type={link.type} fillDarkMode="hsl(0 0% 60%)" fillLightMode="hsl(0 0% 40%)" />
                      <p className="text-sm font-medium group-hover:text-mb-pink group-hover:dark:text-mb-yellow">{link.label}</p>
                    </Link>
                  ))}
                </div>
              </div>
            </>
          )}

          {hoveredLink === 'Resources' && (
            <>
              <div className="bg-hsl-l100 dark:bg-hsl-l13 rounded-md relative z-20 px-4 py-4 flex flex-col gap-8">
                <p className="text-hsl-l50 font-medium text-sm -mb-2">RESOURCES</p>
                <div className="grid grid-cols-2 gap-x-16 gap-y-4">
                  {linksResource.map((link) => (
                    <Link href={link.href} key={link.href} className="group flex items-center gap-4 px-4">
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
            </>
          )}
        </div>
      </motion.section>
    </nav>
  );
};

export default NavMenu;
