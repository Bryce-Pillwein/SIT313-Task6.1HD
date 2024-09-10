import { collection, query, orderBy, getDocs, where, limit } from "firebase/firestore";
import { db } from "@/firebaseConfig";
import { Post } from "@/types/Post";

/**
 * Get Posts By Author Id
 * @param userId - ID of the author whose posts you want to fetch
 * @param dbPath - Type of post (e.g., 'POST_ARTICLE' or 'POST_QUESTION')
 * @returns Array of post data or an empty array if no posts are found
 */
export default async function getPostByAuthorId(userId: string, dbPath: string): Promise<Post[]> {
  try {
    const postsRef = collection(db, dbPath);
    const postsQuery = query(
      postsRef,
      where("userId", "==", userId),
      orderBy("createdAt", "desc"), // Optional: order by creation date or any other field
      limit(10) // Limit to 10 posts
    );

    const querySnapshot = await getDocs(postsQuery);

    const posts = querySnapshot.docs.map(doc => doc.data() as Post);

    return posts;
  } catch (error) {
    throw error;
  }
}