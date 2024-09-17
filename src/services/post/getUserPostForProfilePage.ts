import { doc, getDoc, Timestamp } from 'firebase/firestore';
import { db } from "@/firebaseConfig";
import getPost from './getPost';
import { Post } from '@/types/Post';

/**
 * Get User Post Ids from unified 'POST' and 'USERS_POST' collections
 * @param uid - The user ID
 * @returns An array of posts or an error status
 */
export default async function getUserPostForProfilePage(uid: string): Promise<Post[]> {
  try {
    // Get the post IDs from USERS_POST collection
    const docRef = doc(db, 'USERS_POST', uid);
    const docSnap = await getDoc(docRef);

    let postIds: string[] = [];
    if (docSnap.exists()) {
      const data = docSnap.data();
      postIds = data?.postIds || [];
    }

    // Fetch the posts using the post IDs from the unified POST collection
    const posts = await Promise.all(
      postIds.map(async (id) => {
        const result = await getPost(id);
        if ('success' in result && !result.success) {
          console.error(result.message);
          return null; // Return null for unsuccessful posts
        }
        return result as Post;
      })
    );

    // Filter out null posts
    const validPosts = posts.filter((post) => post !== null) as Post[];

    // Sort the posts by createdAt (descending order)
    validPosts.sort((a, b) => {
      const createdAtA = (a.createdAt as Timestamp).toDate();
      const createdAtB = (b.createdAt as Timestamp).toDate();
      return createdAtB.getTime() - createdAtA.getTime();
    });

    return validPosts;
  } catch (error) {
    console.error("Error fetching user posts:", error);
    throw error;
  }
}
