// Manage Billing Page tsx

"use client";

import LayoutDefault from "@/components/layout/LayoutDefault";
import { useAuth } from "@/components/providers/AuthProvider";
import { getUserValue } from "@/services";
import Link from "next/link";
import { useEffect, useState } from "react";



export default function ManageBillingPage() {
  const { user, loading } = useAuth();
  const [membership, setMembership] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;

    const getMembership = async () => {
      try {
        const plan = await getUserValue(user.uid, 'membership');
        setMembership(plan);
      } catch (error) {
        console.error(error);
      }
    };

    getMembership();
  }, [user])

  return (
    <LayoutDefault>
      <main className="min-h-[60vh] mt-8">
        <h1 className="text-4xl font-sdisplay font-medium">Manage Billing</h1>

        <div className="bg-hsl-l100 dark:bg-hsl-l15 px-4 py-4 my-4 rounded-lg shadow-md flex justify-between items-center">
          <div>
            <p className="text-hsl-l70 dark:text-hsl-l30 text-sm mb-2">Current Membership Plan</p>
            <p className="text-2xl">{membership?.toLocaleUpperCase()}</p>
          </div>

          <div>
            <Link href="/membership-plans"
              className="px-4 py-2 rounded-md bg-hsl-l90 dark:bg-hsl-l20 hover:bg-mb-pink hover:dark:bg-mb-yellow hover:text-white"
            >{membership === 'free' ? 'See Pricing Plans' : 'Update Plan'}</Link>
          </div>
        </div>


        <div className="grid grid-cols-2 gap-x-16">
          <div>
            <h1 className="text-4xl font-sdisplay font-medium mt-24">Billing Details</h1>
            <p className="text-hsl-l30 dark:text-hsl-l70 text-sm mt-1">
              All billing and subscription payments are securely processed and managed through Stripe,
              a trusted third-party payment provider. Please review and manage your billing details directly
              in your <Link href="/" className="underline">Stripe account</Link>. We do not store or handle any sensitive payment
              information on our servers, and we are not liable for any issues arising from Stripe&#39;s services.
              For any inquiries or disputes regarding billing, please refer to Stripe&#39;s support.
            </p>
          </div>
          <div className="flex flex-col justify-center items-center w-[80%]">
            <h1 className="text-2xl font-sdisplay font-medium mt-24">Something Wrong?</h1>
            <p className="text-hsl-l30 dark:text-hsl-l70 text-sm mt-1 mb-4 text-center">
              If you encounter any issues with your subscription, billing, or the services provided, please contact us immediately.
              Our support team is here to assist in resolving any problems as quickly as possible.</p>
            <Link href="/contact"
              className="text-sm px-3 py-1 rounded-md bg-hsl-l90 dark:bg-hsl-l20 hover:bg-mb-pink hover:dark:bg-mb-yellow hover:text-white"
            >Contact Us</Link>
          </div>
        </div>

      </main>
    </LayoutDefault>
  );
}