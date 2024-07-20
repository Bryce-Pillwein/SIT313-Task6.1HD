// Set Post ts

import { addDoc, arrayUnion, collection, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db, auth, storage } from "@/firebaseConfig";
import { Post } from "@/types/post";
import { Status } from "@/types/status";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

/**
 * Set Post
 * @param postContent 
 * @returns Status
 */
export default async function setPost(postContent: Post): Promise<Status> {
  try {
    // Enforced authenticated user
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
      return { success: true, message: 'Please upload an Image' };
    }

    // Add image URL to the post
    const postWithImageAndUser = {
      ...postContent,
      image: imageUrl,
      userId: userId,
    };

    // Add the post document to the /POST collection
    const postRef = await addDoc(collection(db, 'POST'), postWithImageAndUser);

    // Update the post document with the generated postId
    await setDoc(doc(db, 'POST', postRef.id), {
      ...postWithImageAndUser,
      postId: postRef.id,
    });

    // Check if the user's posts document exists
    const userPostsRef = doc(db, `USERS_POSTS/${userId}`);
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