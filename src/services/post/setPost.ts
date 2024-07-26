import { addDoc, arrayUnion, collection, doc, getDoc, serverTimestamp, setDoc, Timestamp, updateDoc } from "firebase/firestore";
import { db, auth, storage } from "@/firebaseConfig";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import getUserValue from "../user/getUserValue";
import { Post } from "@/types/Post";
import { PostUpload } from "@/types/PostUpload";
import { Status } from "@/types/Status";

/**
 * Format Date as dd Month yyyy
 * @param date Date
 * @returns Formatted date string
 */
const formatDate = (date: Date): string => {
  return date.toLocaleDateString('en-AU', { day: '2-digit', month: 'short', year: 'numeric' });
};

/**
 * Set Post
 * @param postContent 
 * @param postType 
 * @returns Status
 */
export default async function setPost(postContent: PostUpload, postType: string): Promise<Status> {
  try {
    // Enforce authenticated user
    if (!auth.currentUser) {
      return { success: false, message: 'No user detected. Login to post' };
    }

    const userId = auth.currentUser.uid;

    // Upload the image file to Firebase Storage if it exists
    let imageUrl = null;
    if (postContent.image) {
      const storageRef = ref(storage, `images/${Date.now()}-${postContent.image.name}`);
      await uploadBytes(storageRef, postContent.image);
      imageUrl = await getDownloadURL(storageRef);
    } else {
      return { success: false, message: 'Please upload an Image' };
    }

    // Upload Markdown Text
    const blob = new Blob([postContent.markdownText], { type: 'text/markdown' });
    const fileRef = ref(storage, `markdownFiles/${Date.now()}-${postContent.title}.md`);
    await uploadBytes(fileRef, blob);
    const markdownUrl = await getDownloadURL(fileRef);

    // Get User first and Last Name
    const userFN = await getUserValue(userId, 'firstName');
    const userLN = await getUserValue(userId, 'lastName');

    // Create Post
    const post: Post = {
      postId: 'NullPlaceHolder',
      userId: userId,
      authorFirstName: userFN,
      authorLastName: userLN,
      createdAt: serverTimestamp() as Timestamp,
      date: formatDate(new Date()),
      title: postContent.title,
      imageURL: imageUrl,
      markdownURL: markdownUrl,
      tags: postContent.tags
    };

    // Add the post document to the collection
    const postRef = await addDoc(collection(db, postType), post);

    // Update the post document with the generated postId
    await setDoc(doc(db, postType, postRef.id), {
      ...post,
      postId: postRef.id,
    });

    // Check if the user's posts document exists
    const userPostsRef = doc(db, `USERS_${postType}/${userId}`);
    const userPostsDoc = await getDoc(userPostsRef);

    // Update UserPost/ID Array
    if (userPostsDoc.exists()) {
      await updateDoc(userPostsRef, {
        postIds: arrayUnion(postRef.id),
      });
    } else {
      await setDoc(userPostsRef, {
        postIds: [postRef.id],
      });
    }

    return { success: true, message: null };
  } catch (error) {
    throw error;
  }
}
