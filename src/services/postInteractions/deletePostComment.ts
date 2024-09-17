import { db } from "@/firebaseConfig";
import { doc, deleteDoc } from "firebase/firestore";
import { Status } from "@/types/Status";

/**
 * Delete Post Comment
 * @param postId post ID
 * @param commentId comment ID
 * @returns status
 */
export default async function deletePostComment(postId: string, commentId: string) {
  try {
    const commentDocRef = doc(db, `$POST/${postId}/comments`, commentId);
    await deleteDoc(commentDocRef);
  } catch (error) {
    throw error;
  }
}
