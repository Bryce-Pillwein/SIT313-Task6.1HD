// Not Found Page tsx

import LayoutDefault from "@/components/layout/LayoutDefault";
import Link from "next/link";


export default function NotFoundPage() {

  return (
    <LayoutDefault>
      <main className="min-h-[100vh] flex flex-col justify-center items-end">
        <h1>Page Not Found</h1>

        <Link href="/">Go Home</Link>
      </main>
    </LayoutDefault>
  );
}