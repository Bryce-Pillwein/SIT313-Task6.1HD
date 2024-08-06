import { addDoc, collection, doc, getDoc, serverTimestamp, Timestamp, updateDoc } from "firebase/firestore";
import { db, auth } from "@/firebaseConfig";
import getUserValue from "../user/getUserValue";
import formatFSDate from "../util/formatFSDate";
import { Status } from "@/types/xStatus";
import { PostComment } from "@/types/PostComment";

export default async function setPostComment(postId: string, dbPath: string, commentValue: string): Promise<Status> {
  try {
    // Enforce authenticated user
    if (!auth.currentUser) {
      return { success: false, message: 'No user detected. Login to post' };
    }

    const userId = auth.currentUser.uid;

    // Get User first and Last Name
    const userFN = await getUserValue(userId, 'firstName');
    const userLN = await getUserValue(userId, 'lastName');

    const comment: PostComment = {
      commentId: 'NullPlaceHolder',
      uid: auth.currentUser.uid,
      firstName: userFN,
      lastName: userLN,
      createdAt: serverTimestamp() as Timestamp,
      date: formatFSDate(new Date()),
      comment: commentValue
    }

    // Check if the post exists
    const postRef = doc(db, dbPath, postId);
    const postDoc = await getDoc(postRef);
    if (!postDoc.exists()) {
      return { success: false, message: 'Unable to find post' };
    }

    // Add comment to the sub-collection
    const commentsCollectionRef = collection(db, `${dbPath}/${postId}/comments`);
    const commentRef = await addDoc(commentsCollectionRef, comment);

    // Update comment with its ID
    await updateDoc(commentRef, { commentId: commentRef.id });

    return { success: true, message: null }
  } catch (error) {
    throw error;
  }
}