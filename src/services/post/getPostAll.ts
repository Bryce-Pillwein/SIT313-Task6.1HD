import { collection, query, orderBy, where, getDocs } from "firebase/firestore";
import { db } from "@/firebaseConfig";

/**
 * Get all posts or filter by post type (questions / articles).
 * @param type Optional type of posts to filter (e.g., "question" or "article").
 * @returns Array of posts or null if none found.
 */
export default async function getPostAll(type?: string): Promise<any[] | null> {
  try {
    const postsRef = collection(db, 'POST');
    let q;

    // Filter by postType field, otherwise return all posts
    if (type) {
      q = query(postsRef, where('postType', '==', type), orderBy('createdAt', 'desc'));
    } else {
      q = query(postsRef, orderBy('createdAt', 'desc'));
    }

    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return null;
    }

    const posts = querySnapshot.docs.map(doc => doc.data());

    return posts;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
}