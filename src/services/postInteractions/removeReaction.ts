import { collection, doc, setDoc, serverTimestamp, updateDoc, arrayRemove } from "firebase/firestore";
import { db, auth } from "@/firebaseConfig";

type ReactionType = 'like' | 'dislike' | 'heart';

export default async function removeReaction(postId: string, reactionType: ReactionType) {
  try {
    // Enforce authenticated user
    if (!auth.currentUser) return false;

    const userId = auth.currentUser.uid;
    const reactionRef = doc(db, 'POST', postId, 'reactions');
    await updateDoc(reactionRef, {
      userIds: arrayRemove(userId)
    });
  } catch (error) {
    throw error;
  }
}
