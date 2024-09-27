import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebaseConfig";

/**
 * Retrieves the view count for a specific guide based on the postId.
 * @param postId - The ID of the guide to retrieve the view count for.
 * @returns Promise<number>
 */
export default async function getViewsCount(postId: string): Promise<number> {
  try {
    const viewsRef = collection(db, `GUIDE/${postId}/views`);
    const viewsSnapshot = await getDocs(viewsRef);
    return viewsSnapshot.size;
  } catch (error) {
    console.error(`Error fetching views for guide ${postId}:`, error);
    return 0; // Return 0 if error
  }
}