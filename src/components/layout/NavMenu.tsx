// Nav Menu tsx 

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";



const variants = {
  open: {
    y: 0, opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 }
    }
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 }
    }
  }
};

const variantsUL = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 }
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 }
  }
};

interface Location {
  center: number;
  bottom: number;
}


const NavMenu = () => {
  const container = useRef<HTMLDivElement>(null);
  const containerRefMotion = useRef(null);

  const [isNavMenuOpen, setIsNavMenuOpen] = useState<boolean>(false);
  const [location, setLocation] = useState<Location>({ center: 0, bottom: 0 });
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);


  const displayNavMenu = (e: React.MouseEvent<HTMLParagraphElement, MouseEvent>, linkName: string) => {
    console.log(e.target);
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

  useEffect(() => {
    const navMenu = container.current;
    if (navMenu && isNavMenuOpen) {
      const { center, bottom } = location;
      navMenu.style.left = `${center}px`;
      navMenu.style.top = `${bottom}px`;
    }
  }, [location, isNavMenuOpen]);





  return (
    <nav onMouseLeave={closeNavMenu}>
      <div className="flex items-center">
        <p className="nav-link px-8 py-4 font-bold font-nunito text-lg"
          onMouseOver={(e) => displayNavMenu(e, 'Post')}>Post</p>
        <p className="nav-link px-8 py-4 font-bold font-nunito text-lg"
          onMouseOver={(e) => displayNavMenu(e, 'Questions')}>View</p>
        <Link href="pricing-plans" className="nav-link px-8 py-4 font-bold font-nunito text-lg">Pricing</Link>
      </div>

      <section ref={container}
        className={`nav-menu absolute left-2/4 -translate-x-2/4 z-10 top-0 mt-1 ${isNavMenuOpen ? 'opacity-100' : 'opacity-0'}`}>
        <div className="arrow"></div>

        <motion.nav initial={false} animate={isNavMenuOpen ? "open" : "closed"} ref={containerRefMotion}>
          <motion.ul variants={variantsUL} className="bg-white shadow-lg rounded-lg p-4 min-w-[100px] text-center flex flex-col gap-4">
            {itemIds.map(i => (
              <motion.li variants={variants} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} key={i}>
                <p className="text-base" >Link {i}</p>
              </motion.li>
            ))}
          </motion.ul>
        </motion.nav>

      </section>
    </nav>


  );
};

export default NavMenu;

const sidebar = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
    transition: {
      type: "spring",
      stiffness: 20,
      restDelta: 2
    }
  }),
  closed: {
    clipPath: "circle(30px at 40px 40px)",
    transition: {
      delay: 0.5,
      type: "spring",
      stiffness: 400,
      damping: 40
    }
  }
};


const itemIds = [0, 1, 2, 3, 4];
