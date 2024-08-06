import { collection, doc, getDoc } from "firebase/firestore";
import { db } from "@/firebaseConfig";
import { Post } from "@/types/xPost";
import { Status } from "@/types/xStatus";


/**
 * Get Post
 * @param postId 
 * @param postPath 
 * @returns 
 */
export default async function getPost(postId: string, postPath: string): Promise<Post | Status> {
  try {
    const postRef = doc(collection(db, postPath), postId);
    const postDoc = await getDoc(postRef);

    if (!postDoc.exists()) {
      return { success: false, message: 'Unable To Find Post' };
    }

    return postDoc.data() as Post; // Return the post data
  } catch (error) {
    throw error;
  }
}