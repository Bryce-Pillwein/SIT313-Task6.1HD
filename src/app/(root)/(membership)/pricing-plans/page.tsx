// Membership Page tsx

"use client";

import { useEffect, useState } from "react";
import LayoutDefault from "@/components/layout/LayoutDefault";
import { useThemeContext } from "@/components/providers/ThemeProvider";
import MembershipPlan from "@/components/stripe/MembershipPlan";

/**
 * Tick Mark Component
 * @returns UI Tick for this page
 */
const Tick: React.FC = () => {
  const { isDarkTheme } = useThemeContext();
  const [fill, setFill] = useState('hsl(0 0% 20%)');

  useEffect(() => {
    if (isDarkTheme) setFill('hsl(0 0% 80%)');
    else setFill('hsl(0 0% 20%)');
  }, [isDarkTheme]);

  return (
    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill={fill}>
      <path d="m424-408-86-86q-11-11-28-11t-28 11q-11 11-11 28t11 28l114 114q12 12 28 12t28-12l226-226q11-11 11-28t-11-28q-11-11-28-11t-28 11L424-408Zm56 328q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z" />
    </svg>
  );
}

export default function MembershipPage() {
  const simple = ["Create and View Post", "1 Code Block Per Post"];
  const starter = ["Create and View Post", "3 Code Blocks Per Post", "Access to Featured Post", "More Post Interactions", "Custom Code Theme"];
  const premium = ["Create and View Post", "Unlimited Code Blocks Per Post", "Access to Featured Post", "More Post Interactions", "Custom Code Theme", "Badges", "Partner Program"];

  return (
    <LayoutDefault>
      <main className="my-8">
        <h1 className=" font-sdisplay text-2xl text-center">Plans and Pricing</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-12 my-8 md:min-h-[40vh]">
          {/* Free Plan */}
          <div className="flex flex-col items-center px-4 py-8">
            <h2 className="text-4xl font-sdisplay mb-4">Free</h2>
            <h3 className="text-2xl font-sdisplay">Simple Plan</h3>
            <ul className="flex flex-col gap-y-4 mt-8 mb-12">
              {simple.map((item, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <Tick />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Starter Plan */}
          <div className="flex flex-col items-center px-4 py-8 bg-hsl-l100 dark:bg-hsl-l15 shadow rounded-lg">
            <h2 className="text-4xl font-sdisplay mb-4">$4.99 <span className="text-sm text-hsl-l50">/ Month</span></h2>
            <h3 className="text-2xl font-sdisplay">Starter Plan</h3>
            <ul className="flex flex-col gap-y-4 mt-8 mb-12">
              {starter.map((item, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <Tick />
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-auto">
              <MembershipPlan priceId="price_1PkkMyE4ag1b8pJ51NS0QDx8" />
            </div>
          </div>

          {/* Premium Plan */}
          <div className="flex flex-col items-center px-4 py-8">
            <h2 className="text-4xl font-sdisplay mb-4">$9.99 <span className="text-sm text-hsl-l50">/ Month</span></h2>
            <h3 className="text-2xl font-sdisplay">Premium Plan</h3>
            <ul className="flex flex-col gap-y-4 mt-8 mb-12">
              {premium.map((item, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <Tick />
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-auto">
              <MembershipPlan priceId="price_1PkkIiE4ag1b8pJ5409DBib2" />
            </div>
          </div>
        </div>


        <div className="flex justify-evenly items-center my-24 gap-x-8">
          <div className="border-b border-b-hsl-l30 dark:border-b-hsl-l70 w-[50%]"></div>
          <h2 className="text-base text-center font-sdisplay text-hsl-l30 dark:text-hsl-l70 min-w-max">More Details</h2>
          <div className="border-b border-b-hsl-l30 dark:border-b-hsl-l70 w-[50%]"></div>
        </div>


        {/* Starter More Details */}
        <div className="my-24 ">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-4xl font-sdisplay mb-4 ">Starter Plan</h3>
              <p className="font-sdisplay text-xl mb-2 ">$4.99/month</p>
            </div>
            <div >
              <MembershipPlan priceId="price_1PkkMyE4ag1b8pJ51NS0QDx8" />
            </div>
          </div>


          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:min-h-[30vh]">
            <div className="flex flex-col col-span-2">
              <p className="text-hsl-l50 text-sm">Inlcudes</p>
              <ul className="list-disc pl-10 flex flex-col gap-y-2 my-2 text-pretty text-sm">
                <li><strong>Create and View Posts:</strong> Share your thoughts, questions, and articles with the community.</li>
                <li><strong>3 Code Block per Post:</strong> Include up to three code blocks in your posts to provide more
                  comprehensive examples and tutorials.</li>
                <li><strong>Access to Featured Posts:</strong> Get exclusive access to featured posts curated by our team.</li>
                <li><strong>More Post Interactions: </strong> Engage more with the community through additional interaction
                  options and reactions.</li>
                <li><strong>Custom Code Theme: </strong> Choose a custom theme for code blocks in posts.</li>
              </ul>
            </div>

            <div className="flex flex-col col-span-1">
              <p className="text-hsl-l50 text-sm">Description</p>
              <p>The Starter Plan is designed for users who want more flexibility and features. This plan includes everything
                in the Free Plan, plus additional benefits.</p>
              <p className="text-hsl-l50 text-sm mt-8">Ideal For</p>
              <p>Intermediate users who need more code blocks and want to access premium content.</p>
            </div>
          </div>



        </div>

        {/* Premium More Details */}
        <div className="mt-24 ">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-4xl font-sdisplay mb-4 ">Premium Plan</h3>
              <p className="font-sdisplay text-xl mb-2 ">$9.99/month</p>
            </div>
            <div>
              <MembershipPlan priceId="price_1PkkIiE4ag1b8pJ5409DBib2" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:min-h-[30vh]">
            <div className="flex flex-col col-span-2">
              <p className="text-hsl-l50 text-sm">Inlcudes</p>
              <ul className="list-disc pl-10 flex flex-col gap-y-2 my-2 text-pretty text-sm">
                <li><strong>Create and View Posts:</strong> Share your thoughts, questions, and articles with the community.</li>
                <li><strong>Unlimited Code Blocks per Post:</strong> Include as many code blocks as needed in your posts to create
                  detailed tutorials and guides.</li>
                <li><strong>Access to Featured Posts:</strong> Get exclusive access to featured posts curated by our team.</li>
                <li><strong>More Post Interactions: </strong> Take full advantage of all interaction features on the platform.</li>
                <li><strong>Custom Code Theme: </strong> Choose a custom theme for code blocks in posts.</li>
                <li><strong>Badges: </strong> Earn special badges that highlight your contributions and expertise.</li>
                <li><strong>Partner Program:</strong> Join our partner program to collaborate on special projects and get
                  recognition within the community.</li>
              </ul>
            </div>

            <div className="flex flex-col col-span-1">
              <p className="text-hsl-l50 text-sm">Description</p>
              <p>The Premium Plan is our most comprehensive offering, perfect for advanced users and professionals. This plan
                includes everything in the Starter Plan, along with exclusive features:</p>
              <p className="text-hsl-l50 text-sm mt-8">Ideal For</p>
              <p>Advanced users, professionals, and those who want to make the most out of the platform&#39s features.</p>
            </div>
          </div>
        </div>

      </main>
    </LayoutDefault>
  );
}
