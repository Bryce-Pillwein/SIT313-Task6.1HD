import { collection, doc, getDoc } from "firebase/firestore";
import { db } from "@/firebaseConfig";
import { Post } from "@/types/Post";
import { Status } from "@/types/Status";


/**
 * Get Post
 * @param postId 
 * @returns 
 */
export default async function getPost(postId: string): Promise<Post | Status> {
  try {
    const postRef = doc(collection(db, 'POST'), postId);
    const postDoc = await getDoc(postRef);

    if (!postDoc.exists()) {
      return { success: false, message: 'Unable To Find Post' };
    }

    return postDoc.data() as Post;
  } catch (error) {
    throw error;
  }
}