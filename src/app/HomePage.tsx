// Home Page tsx

"use client";

import { useRouter } from "next/navigation";
import { getAuth, signOut } from "firebase/auth";
import { firebaseApp } from "../firebaseConfig";
import { useState } from "react";
import LayoutDefault from "@/components/layout/LayoutDefault";
import PaddingBlock from "@/components/ui/PaddingBlock";
import SubscribeBanner from "@/components/SubscribeBanner";
import FeatureBanner from "@/components/FeatureBanner";
import Link from "next/link";

interface HomePageProps {
  uid?: string;
}

export default function HomePage({ uid }: HomePageProps) {
  // const [articles] = useState(featured.articles);
  // const [tutorials] = useState(featured.tutorials);
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

  return (
    <LayoutDefault>
      <img src="https://picsum.photos/1440/350?grayscale" className="mx-auto" />

      <PaddingBlock pad={2} />

      {/* Featured Articles */}
      <h2 className="text-2xl text-center mb-4 font-semibold">Feature Articles</h2>
      {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {articles.map((art, idx) => (
          <FeatureBanner data={art} key={idx} />
        ))}
      </div> */}
      <div className="flex justify-center my-4">
        <Link href="/" className="btn">See all Articles</Link>
      </div>

      <PaddingBlock pad={2} />

      {/* Featured Tutorials */}
      <h2 className="text-2xl text-center mb-4 font-semibold">Featured Tutorials</h2>
      {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {tutorials.map((tut, idx) => (
          <FeatureBanner data={tut} key={idx} />
        ))}
      </div> */}
      <div className="flex justify-center my-4">
        <Link href="/" className="btn ">See all Tutorials</Link>
      </div>


      <p className="mb-8">
        Only <strong>{uid}</strong> holds the magic key to this kingdom!
      </p>
      <button onClick={handleLogout} className="text-white bg-gray-600 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-primary-800" >
        Logout
      </button>


      <PaddingBlock pad={2} />

      {/* Subscribe Banner */}
      <SubscribeBanner />
    </LayoutDefault>
  );
}
