// Payment Success Page tsx

import LayoutDefault from "@/components/layout/LayoutDefault";
import Link from "next/link";

export default function PaymentSuccessPage() {

  return (
    <LayoutDefault>
      <main className="flex h-[80vh] flex-col justify-center items-center">
        <h1 className="text-4xl font-semibold">Payment Successful!</h1>
        <p className="text-hsl-l50">Enjoy your membership</p>
        <Link href="/" className="font-semibold px-4 py-2 bg-mb-pink dark:bg-mb-yellow rounded-lg mt-8 text-white dark:text-black hover:bg-mb-pink-active hover:dark:bg-mb-yellow-active">Go Home</Link>
      </main>
    </LayoutDefault>
  );
}
