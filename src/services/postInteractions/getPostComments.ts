import { collection, query, orderBy, getDocs } from "firebase/firestore";
import { db } from "@/firebaseConfig";
import { PostComment } from "@/types/PostComment";

/**
 * Get Post Comments
 * @param postId post ID
 * @param dbPath firestore path 'POST_QUESTION' | 'POST_ARTICLE'
 * @returns 
 */
export default async function getPostComments(postId: string, dbPath: string): Promise<PostComment[]> {
  try {
    const commentsCollectionRef = collection(db, `${dbPath}/${postId}/comments`);
    const commentsQuery = query(commentsCollectionRef, orderBy('createdAt', 'asc'));
    const querySnapshot = await getDocs(commentsQuery);

    const comments: PostComment[] = [];
    querySnapshot.forEach((doc) => {
      comments.push(doc.data() as PostComment);
    });

    return comments;
  } catch (error) {
    throw error;
  }
}
