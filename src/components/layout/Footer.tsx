// Footer tsx

import Link from "next/link";
import IconSocial from "../icons/IconSocial";

const Footer = () => {

  return (
    <footer className="bg-hsl-l90 dark:bg-hsl-l15 py-4 sm:app-container w-full text-hsl-l20 dark:text-hsl-l80 mt-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-4">
        <div className="flex flex-col items-center">
          <h3 className="text-lg">Explore</h3>
          <Link href="/">Home</Link>
          <Link href="/">Questions</Link>
          <Link href="/">Articles</Link>
          <Link href="/">Tutorials</Link>

        </div>
        <div className="flex flex-col items-center">
          <h3 className="text-lg">Support</h3>
          <Link href="/">FAQs</Link>
          <Link href="/">Help</Link>
          <Link href="/">Contact Us</Link>
        </div>
        <div className="flex flex-col items-center">
          <h3 className="text-lg">Socials</h3>
          <div className="flex gap-4 items-center">
            <Link href='/'>
              <IconSocial type='facebook' size={28} />
            </Link>
            <Link href="/" >
              <IconSocial type='twitter' />
            </Link>
            <Link href="/" >
              <IconSocial type='instagram' />
            </Link>
          </div>

        </div>
      </div>

      <p className="text-center mt-4">Dev@Deakin 2022</p>
      <div className="flex justify-around">
        <Link href='/' className="text-xs">Privacy Policy</Link>
        <Link href='/' className="text-xs">Terms</Link>
        <Link href='/' className="text-xs">Code of Conduct</Link>
      </div>
    </footer>
  )
};

export default Footer;