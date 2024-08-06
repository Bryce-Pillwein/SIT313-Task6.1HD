import { db } from "@/firebaseConfig";
import { doc, deleteDoc } from "firebase/firestore";
import { Status } from "@/types/xStatus";

/**
 * Delete Post Comment
 * @param postId post ID
 * @param dbPath firestore database path POST_QUESTION | POST_ARTICLE
 * @param commentId comment ID
 * @returns status
 */
export default async function deletePostComment(postId: string, dbPath: string, commentId: string) {
  try {
    const commentDocRef = doc(db, `${dbPath}/${postId}/comments`, commentId);
    await deleteDoc(commentDocRef);
  } catch (error) {
    throw error;
  }
}
