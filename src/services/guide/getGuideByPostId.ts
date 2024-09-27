import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebaseConfig";
import Guide from "@/types/Guide";
import getViewsCount from "./getViewCount";
import { Status } from "@/types/Status";


/**
 * Retrieves a single guide based on the provided postId.
 * @param postId - The ID of the guide to be retrieved.
 * @returns Promise<Guide | null>
 */
export default async function getGuideByPostId(postId: string): Promise<Guide | Status> {
  try {
    const guideRef = doc(db, "GUIDE", postId);
    const guideSnapshot = await getDoc(guideRef);

    if (guideSnapshot.exists()) {
      const guide = guideSnapshot.data() as Guide;

      // Retrieve view count from the subcollection
      const viewsCount = await getViewsCount(postId);

      // Return the guide with the view count added
      return {
        ...guide,
        viewsCount,
      };
    } else {
      return { success: false, message: 'Guide does not exist' };
    }
  } catch (error) {
    throw error;
  }
}