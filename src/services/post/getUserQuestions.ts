import { db, auth } from "@/firebaseConfig";
import { Post } from "@/types/Post";
import { Status } from "@/types/Status";
import { getDoc, doc } from "firebase/firestore";
import getPost from "./getPost";

/**
 * Get User Questions
 * @returns array of user questions or a status message
 */
export default async function getUserQuestions(): Promise<Post[] | Status> {
  try {
    if (!auth.currentUser) {
      return { success: false, message: 'No user detected. Login to post' };
    }

    // Get User ID
    const uid = auth.currentUser.uid;

    // Get the document reference
    const docRef = doc(db, 'USERS_POST_QUESTION', uid);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return { success: false, message: 'No Question post exists for user.' };
    }

    // Get the array of post IDs from the user document
    const questionIds: string[] = docSnap.data().postIds;

    // Retrieve each post using the post IDs
    const questions: Post[] = [];
    for (const id of questionIds) {
      const response = await getPost(id, 'POST_QUESTION');
      if ('postId' in response) {
        questions.push(response as Post);
      } else {
        console.error(`Failed to fetch question with id: ${id}`);
        return { success: false, message: response.message };
      }
    }

    return questions;
  } catch (error) {
    throw error;
  }
}
