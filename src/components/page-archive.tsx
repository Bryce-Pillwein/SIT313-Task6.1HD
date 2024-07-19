// // Home Page tsx

// "use client";

// import { useState } from "react";
// import Link from "next/link";
// // Components
// import Subscribe from "@/components/Subscribe";
// import FeatureBanner from "@/components/FeatureBanner";
// import PaddingBlock from "@/components/ui/PaddingBlock";
// import LayoutDefault from "@/components/layout/LayoutDefault";
// // Data
// import featured from '@/database/featured.json';


// import { getTokens } from "next-firebase-auth-edge";
// import { cookies } from "next/headers";
// import { notFound } from "next/navigation";
// import { clientConfig, serverConfig } from "../../config";

// export default function Home() {
//   const [articles] = useState(featured.articles);
//   const [tutorials] = useState(featured.tutorials);


//   const getToken = async () => {
//     const tokens = await getTokens(cookies(), {
//       apiKey: clientConfig.apiKey,
//       cookieName: serverConfig.cookieName,
//       cookieSignatureKeys: serverConfig.cookieSignatureKeys,
//       serviceAccount: serverConfig.serviceAccount,
//     });
//     return tokens;
//   }

//   const tokens = getToken();


//   if (!tokens) {
//     notFound();
//   }

//   return (
//     <LayoutDefault>
//       {/* Main Page Content */}
//       <main>
//         <img src="https://picsum.photos/1440/350?grayscale" className="mx-auto" />

//         <PaddingBlock pad={2} />

//         {/* Featured Articles */}
//         <h2 className="text-2xl text-center mb-4 font-semibold">Feature Articles</h2>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           {articles.map((art, idx) => (
//             <FeatureBanner data={art} key={idx} />
//           ))}
//         </div>

//         <div className="flex justify-center my-4">
//           <Link href="/" className="btn">See all Articles</Link>
//         </div>

//         <PaddingBlock pad={2} />

//         {/* Featured Tutorials */}
//         <h2 className="text-2xl text-center mb-4 font-semibold">Featured Tutorials</h2>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           {tutorials.map((tut, idx) => (
//             <FeatureBanner data={tut} key={idx} />
//           ))}
//         </div>
//         <div className="flex justify-center my-4">
//           <Link href="/" className="btn ">See all Tutorials</Link>
//         </div>
//       </main>

//       <PaddingBlock pad={2} />

//       {/* Subscribe Banner */}
//       <Subscribe />

//     </LayoutDefault>
//   );
// }
