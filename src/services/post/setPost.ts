// Set Post ts

import { addDoc, arrayUnion, collection, doc, getDoc, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import { db, auth, storage } from "@/firebaseConfig";
import { Post } from "@/types/post";
import { Status } from "@/types/status";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import getUserValue from "../user/getUserValue";

/**
 * Set Post
 * @param postContent 
 * @returns Status
 */
export default async function setPost(postContent: Post, postType: string): Promise<Status> {
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
      return { success: false, message: 'Please upload an Image' };
    }


    // Get User first and Last Name
    const userFN = await getUserValue(userId, 'firstName');
    const userLN = await getUserValue(userId, 'lastName');

    // Add image URL to the post
    const postWithImageAndUser = {
      ...postContent,
      authorFirstName: userFN,
      authorLastName: userLN,
      date: serverTimestamp(),
      image: imageUrl,
      userId: userId,
      type: postType
    };

    // Add the post document to the /POST collection
    const postRef = await addDoc(collection(db, postType), postWithImageAndUser);

    // Update the post document with the generated postId
    await setDoc(doc(db, postType, postRef.id), {
      ...postWithImageAndUser,
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