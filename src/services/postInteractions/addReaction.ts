import { doc, setDoc, serverTimestamp, getDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { db, auth } from "@/firebaseConfig";

type ReactionType = 'like' | 'dislike' | 'heart';

export default async function addReaction(postId: string, postType: string, reactionType: ReactionType) {
  try {
    // Enforce authenticated user
    if (!auth.currentUser) {
      return false;
    }

    const userId = auth.currentUser.uid;
    const postPath = postType === 'question' ? 'POST_QUESTION' : 'POST_ARTICLE';
    const reactionRef = doc(db, postPath, postId, 'reactions', reactionType);
    const reactionDoc = await getDoc(reactionRef);

    if (reactionDoc.exists()) {
      const data = reactionDoc.data();
      if (data.userIds && data.userIds.includes(userId)) {
        // User already reacted, remove the reaction
        await updateDoc(reactionRef, {
          userIds: arrayRemove(userId)
        });
        return false;
      }
    }

    // User has not reacted, add the reaction
    await setDoc(reactionRef, {
      userIds: arrayUnion(userId), // Use arrayUnion to avoid duplicates
      type: reactionType,
      timestamp: serverTimestamp()
    }, { merge: true }); // Use merge to preserve existing data

    return true;
  } catch (error) {
    console.error("Error adding reaction: ", error);
    throw error;
  }
}
