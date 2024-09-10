import { doc, setDoc } from "firebase/firestore";
import { db } from "@/firebaseConfig";

/**
 * Set trending post IDs in the 'TRENDING' document in Firestore.
 * @param postIds An array of post IDs to be set as trending.
 */
export default async function setTrendingPostIds(postIds: string[]) {
  try {
    const trendingRef = doc(db, 'TRENDING', 'current');
    await setDoc(trendingRef, { postIds });
  } catch (error) {
    throw error;
  }
}