// Footer tsx

import Link from "next/link";
// Components
import IconSocial from "../icons/IconSocial";
import SocialLinks from "../SocialLinks";
import LogoTextRotate from "../ui/LogoTextRotate";
import SubscribeBanner from "../SubscribeBanner";

const Footer = () => {

  return (
    <footer className="w-full mt-auto">
      <div className="bg-hsl-l15 text-hsl-l70 mt-16 pt-16">

        {/* Rotating Text & Logo */}
        <div className="flex justify-center items-center mb-16">
          <div className="border-b border-mb-yellow w-full md:w-[30%]"></div>
          <LogoTextRotate />
          <div className="border-b border-mb-yellow w-full md:w-[30%]"></div>
        </div>


        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 gap-x-2 sm:app-container px-4 sm:px-0">

          <div className="">
            <h3 className="text-6xl font-sdisplay text-hsl-l98 tracking-tight">Follow Along!</h3>
            <SubscribeBanner />

            <h3 className="text-3xl font-sdisplay mb-4 mt-16 text-hsl-l80">Follow Us</h3>
            <SocialLinks />
          </div>

          <div className="flex md:justify-end">
            <div className="flex flex-col ">
              <h3 className="text-3xl font-sdisplay text-hsl-l80">Explore</h3>
              <ul className="footer-list-links">
                <li><Link href="/" >HOME</Link></li>
                <li><Link href="/questions" >QUESTIONS</Link></li>
                <li><Link href="/articles" >ARTICLES</Link></li>
                <li><Link href="/post" >MAKE A POST</Link></li>
                <li><Link href="/" >EDIT A POST</Link></li>
                <li><Link href="/" >MEMBERSHIP</Link></li>
              </ul>

              <h3 className="text-3xl font-sdisplay text-hsl-l80 mt-16">Contact Us</h3>
              <p className="font-mono">devs@deakin.edu.au</p>
              <p className="font-mono">+61 3 9918 9188</p>
            </div>
          </div>

          <div className="flex md:justify-end">
            <div className="flex flex-col ">
              <h3 className="text-3xl font-sdisplay text-hsl-l80 mt-16 md:mt-0">Support</h3>
              <ul className="footer-list-links">
                <li><Link href="/" className="font-mono">FAQs</Link></li>
                <li><a rel="noopener noreferrer" target="_blank" href="https://www.deakin.edu.au/help-hub"
                  className="font-mono">HELP HUB</a></li>
                <li><Link href="/" className="font-mono">MEMBERSHIP PAYMENTS</Link></li>
              </ul>

              <h3 className="text-3xl font-sdisplay text-hsl-l80 mt-16">Legal</h3>
              <ul className="footer-list-links">
                <li><Link href="/" className="font-mono">TERMS & CONDITIONS</Link></li>
                <li><Link href="/" className="font-mono">PRIVACY POLICY</Link></li>
                <li><Link href="/" className="font-mono">CODE OF CONDUCT</Link></li>
              </ul>

            </div>
          </div>
        </div>

        <div className="sm:app-container px-4 sm:px-0">
          <p className="text-xs text-hsl-l30 font-mono mt-4">Copyright 2024 Dev@Deakin</p>
          <p className="text-xs text-hsl-l30 font-mono">Website by Bryce Pillwein</p>
        </div>

        <div id="sliding-banner" className="mt-8"></div>

      </div>
    </footer>
  )
};

export default Footer;