import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "@/firebaseConfig";
import Guide from "@/types/Guide";
import getViewsCount from "./getViewCount";

/**
 * Get All Guides
 * 
 * Retrieves all the guides from the "GUIDE" collection.
 * @returns guides
 */
export default async function getAllGuides(): Promise<Guide[]> {
  try {
    const guidesRef = collection(db, "GUIDE");
    const guidesQuery = query(guidesRef, orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(guidesQuery);

    // Use Promise.all to wait for all view count retrievals
    const guidesWithViews = await Promise.all(querySnapshot.docs.map(async (doc) => {
      const guide = doc.data() as Guide;

      // Retrieve view count from the subcollection
      const viewsCount = await getViewsCount(doc.id);

      // Return the guide with the view count added
      return {
        ...guide,
        viewsCount,
      };
    }));

    return guidesWithViews;
  } catch (error) {
    throw error;
  }
}