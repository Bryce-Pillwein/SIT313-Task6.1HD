// Not Found Page tsx

import LogoTextRotate from "@/components/ui/LogoTextRotate";
import Link from "next/link";

export default function NotFoundPage() {

  return (
    <main className="min-h-[100%] flex flex-col app-container justify-center items-center">
      <LogoTextRotate />
      <h1 className="font-sdisplay text-4xl mt-16">Page Not Found</h1>
      <Link href="/" className="font-semibold px-4 py-2 bg-mb-pink dark:bg-mb-yellow rounded-lg mt-8 text-white dark:text-black hover:bg-mb-pink-active hover:dark:bg-mb-yellow-active">Go Home</Link>
    </main>
  );
}