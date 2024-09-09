import { collection, doc, setDoc, serverTimestamp, updateDoc, arrayRemove } from "firebase/firestore";
import { db, auth } from "@/firebaseConfig";

type ReactionType = 'like' | 'dislike' | 'heart';

export default async function removeReaction(postId: string, postType: string, reactionType: ReactionType) {
  try {
    // Enforce authenticated user
    if (!auth.currentUser || postType) {
      return false;
    }

    const userId = auth.currentUser.uid;
    const postPath = postType === 'question' ? 'POST_QUESTION' : 'POST_ARTICLE';
    const reactionRef = doc(db, postPath, postId, 'reactions');
    await updateDoc(reactionRef, {
      userIds: arrayRemove(userId)
    });
  } catch (error) {
    throw error;
  }
}
