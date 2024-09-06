import { db, auth } from "@/firebaseConfig";
import { getDoc, doc } from "firebase/firestore";
import { Post } from "@/types/Post";
import { Status } from "@/types/Status";
import getPost from "./getPost";


/**
 * Get User Posts
 * @param type post type
 * @returns 
 */
export default async function getUserPosts(type: string): Promise<Post[] | Status> {
  try {
    const userPostRef = type === 'question' ? 'USERS_POST_QUESTION' : 'USERS_POST_ARTICLE'
    const postRef = type === 'question' ? 'POST_QUESTION' : 'POST_ARTICLE'

    // Check user authentication
    if (!auth.currentUser) {
      return { success: false, message: 'No user detected. Login to post' };
    }
    const uid = auth.currentUser.uid;

    // Get the document reference
    const docRef = doc(db, userPostRef, uid);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return [];
    }

    // Get the array of post IDs from the user document
    const postIds: string[] = docSnap.data().postIds;

    // Retrieve each post using the post IDs
    const posts: Post[] = [];
    for (const id of postIds) {
      const response = await getPost(id, postRef);
      if ('postId' in response) {
        posts.push(response as Post);
      } else {
        console.error(`Failed to fetch question with id: ${id}`);
        return { success: false, message: 'Failed to fetch post. Refresh' };
      }
    }

    return posts;
  } catch (error) {
    throw error;
  }

}