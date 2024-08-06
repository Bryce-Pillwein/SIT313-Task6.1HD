import { db, storage } from "@/firebaseConfig";
import { Post } from "@/types/xPost";
import { Status } from "@/types/xStatus";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { ref, deleteObject, uploadBytes, getDownloadURL } from "firebase/storage";

interface newPostData {
  title: string;
  markdownText: string;
}

/**
 * Update Post
 * @param existingPost 
 * @param newPost 
 * @param type 
 * @returns 
 */
export default async function updatePost(existingPost: Post, newPost: newPostData, type: string): Promise<Status> {
  try {
    const docRef = doc(db, type, existingPost.postId);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return { success: false, message: 'Unable to find post' };
    }

    const fileRef = ref(storage, `markdownFiles/${existingPost.postId}.md`);
    await deleteObject(fileRef); // Delete existing

    // Upload the new markdown file
    const newBlob = new Blob([newPost.markdownText], { type: 'text/markdown' });
    await uploadBytes(fileRef, newBlob);
    const newMarkdownUrl = await getDownloadURL(fileRef);

    // Update the post document
    await setDoc(docRef, {
      ...existingPost,
      title: newPost.title,
      markdownURL: newMarkdownUrl
    }, { merge: true });

    return { success: true, message: null };
  } catch (error) {
    throw error;
  }
}
