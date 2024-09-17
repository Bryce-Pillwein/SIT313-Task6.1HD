import { collection, query, orderBy, getDocs, where, limit } from "firebase/firestore";
import { db } from "@/firebaseConfig";
import { Post } from "@/types/Post";

/**
 * Get Posts By Author Id
 * @param userId - ID of the author whose posts you want to fetch
 * @returns Array of post data or an empty array if no posts are found
 */
export default async function getPostByAuthorId(userId: string): Promise<Post[]> {
  try {
    const postsRef = collection(db, 'POST');
    const postsQuery = query(
      postsRef,
      where("userId", "==", userId),
      orderBy("createdAt", "desc"),
      limit(10) // Limit to 10 posts
    );

    const querySnapshot = await getDocs(postsQuery);

    const posts = querySnapshot.docs.map(doc => doc.data() as Post);

    return posts;
  } catch (error) {
    throw error;
  }
}