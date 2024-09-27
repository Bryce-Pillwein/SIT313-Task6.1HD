import { collection, query, where, getDocs, doc, deleteDoc } from "firebase/firestore";
import { db } from "@/firebaseConfig";

/**
 * Deletes a user's data from GUIDE, USERS, POST, and USERS_POST collections along with their subcollections.
 * @param userId - The ID of the user whose data needs to be deleted.
 * @returns Promise<void>
 */
export default async function deleteUserData(userId: string): Promise<void> {

  /* DONT ACTUALLY DELETE DATA */
  return;

  try {
    // 1. Delete all GUIDE documents and the 'views' subcollection
    const guidesQuery = query(collection(db, "GUIDE"), where("userId", "==", userId));
    const guidesSnapshot = await getDocs(guidesQuery);
    await Promise.all(guidesSnapshot.docs.map(async (guideDoc) => {
      const guideId = guideDoc.id;

      // Delete 'views' subcollection
      const viewsRef = collection(db, `GUIDE/${guideId}/views`);
      const viewsSnapshot = await getDocs(viewsRef);
      await Promise.all(viewsSnapshot.docs.map(viewDoc => deleteDoc(viewDoc.ref)));

      // Delete the GUIDE document
      await deleteDoc(doc(db, "GUIDE", guideId));
    }));

    // 2. Delete the user's document from USERS collection
    await deleteDoc(doc(db, "USERS", userId));

    // 3. Delete all documents in POST where the userId matches and subcollections 'comments' and 'reactions'
    const postsQuery = query(collection(db, "POST"), where("userId", "==", userId));
    const postsSnapshot = await getDocs(postsQuery);
    await Promise.all(postsSnapshot.docs.map(async (postDoc) => {
      // Delete 'comments' subcollection
      const commentsRef = collection(db, `POST/${postDoc.id}/comments`);
      const commentsSnapshot = await getDocs(commentsRef);
      await Promise.all(commentsSnapshot.docs.map(commentDoc => deleteDoc(commentDoc.ref)));

      // Delete 'reactions' subcollection
      const reactionsRef = collection(db, `POST/${postDoc.id}/reactions`);
      const reactionsSnapshot = await getDocs(reactionsRef);
      await Promise.all(reactionsSnapshot.docs.map(reactionDoc => deleteDoc(reactionDoc.ref)));

      // Delete the POST document
      await deleteDoc(postDoc.ref);
    }));

    // 4. Delete all documents in USERS_POST where document ID is the user ID and subcollections 'comments' and 'reactions'
    const userPostsQuery = query(collection(db, "USERS_POST"), where("__name__", "==", userId));
    const userPostsSnapshot = await getDocs(userPostsQuery);
    await Promise.all(userPostsSnapshot.docs.map(async (userPostDoc) => {
      // Delete 'comments' subcollection
      const commentsRef = collection(db, `USERS_POST/${userPostDoc.id}/comments`);
      const commentsSnapshot = await getDocs(commentsRef);
      await Promise.all(commentsSnapshot.docs.map(commentDoc => deleteDoc(commentDoc.ref)));

      // Delete 'reactions' subcollection
      const reactionsRef = collection(db, `USERS_POST/${userPostDoc.id}/reactions`);
      const reactionsSnapshot = await getDocs(reactionsRef);
      await Promise.all(reactionsSnapshot.docs.map(reactionDoc => deleteDoc(reactionDoc.ref)));

      // Delete the USERS_POST document
      await deleteDoc(userPostDoc.ref);
    }));

    console.log(`All data for user ${userId} has been deleted successfully.`);
  } catch (error) {
    console.error(`Error deleting data for user ${userId}:`, error);
    throw error; // Re-throw the error for handling at a higher level if needed
  }
}
