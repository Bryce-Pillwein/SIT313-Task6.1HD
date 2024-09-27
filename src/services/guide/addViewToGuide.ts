import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db, auth } from "@/firebaseConfig";

/**
 * Adds a view entry to the "views" subcollection of a specific guide.
 * @param postId - The ID of the guide to add a view to.
 * @returns Promise<void>
 */
export default async function addViewToGuide(postId: string, uid: string): Promise<void> {
  try {
    // Reference to the user's view document in the views subcollection
    const viewRef = doc(db, `GUIDE/${postId}/views`, uid);

    // Set the view document for the user
    await setDoc(viewRef, {
      userId: uid,
      viewedAt: serverTimestamp(),
    }, { merge: true }); // Merge to ensure no overwrites 

  } catch (error) {
    throw error;
  }
}
