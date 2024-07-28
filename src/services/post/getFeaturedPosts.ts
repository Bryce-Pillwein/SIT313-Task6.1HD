import { db, auth } from "@/firebaseConfig";
import { Post } from "@/types/Post";
import { Status } from "@/types/Status";
import { getDoc, doc } from "firebase/firestore";
import getPost from "./getPost";

/**
 * Get Featured Post
 * @returns array of featured post (questions or articles)
 */
export default async function getFeaturedPosts(type: string): Promise<Post[] | Status> {
  try {
    // Get the document reference
    const docRef = doc(db, 'FEATURED', type);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return { success: false, message: 'Error fetching post data' };
    }

    // Get the array of post IDs from the document
    const postIds: string[] = docSnap.data().postIds;

    // Retrieve each post using the post IDs
    const dbPath = type === 'QUESTIONS' ? 'POST_QUESTION' : 'POST_ARTICLE'
    const posts: Post[] = [];

    for (const id of postIds) {
      const response = await getPost(id, dbPath);
      if ('postId' in response) {
        posts.push(response as Post);
      } else {
        console.error(`Failed to fetch posts with id: ${id}`);
        return { success: false, message: response.message };
      }
    }

    return posts;
  } catch (error) {
    throw error;
  }
}
