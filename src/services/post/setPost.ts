import { addDoc, arrayUnion, collection, doc, getDoc, serverTimestamp, setDoc, Timestamp, updateDoc } from "firebase/firestore";
import { db, auth, storage } from "@/firebaseConfig";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import getUserValue from "../user/getUserValue";
import { Post } from "@/types/Post";
import { PostUpload } from "@/types/PostUpload";
import { Status } from "@/types/Status";
import formatFSDate from "../util/formatFSDate";

// File Language types
interface LanguageOption {
  mimeType: string;
  extension: string;
}

// Language Options for Files
const languageOptions: Record<string, LanguageOption> = {
  c: { mimeType: 'text/x-csrc', extension: 'c' },
  cpp: { mimeType: 'text/x-c++src', extension: 'cpp' },
  csharp: { mimeType: 'text/x-csharp', extension: 'cs' },
  css: { mimeType: 'text/css', extension: 'css' },
  html: { mimeType: 'text/html', extension: 'html' },
  java: { mimeType: 'text/x-java', extension: 'java' },
  javascript: { mimeType: 'application/javascript', extension: 'js' },
  json: { mimeType: 'application/json', extension: 'json' },
  markdown: { mimeType: 'text/markdown', extension: 'md' },
  python: { mimeType: 'text/x-python', extension: 'py' },
  sql: { mimeType: 'text/x-sql', extension: 'sql' },
  typescript: { mimeType: 'application/typescript', extension: 'ts' },
  tsx: { mimeType: 'text/tsx', extension: 'tsx' },
  vue: { mimeType: 'text/x-vue', extension: 'vue' },
};

/**
 * Set Post
 * @param postContent 
 * @param dbPath 
 * @returns Status
 */
export default async function setPost(postContent: PostUpload): Promise<Status> {
  try {
    // Enforce authenticated user
    if (!auth.currentUser) {
      return { success: false, message: 'No user detected. Login to post' };
    }

    const userId = auth.currentUser.uid;

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
      date: formatFSDate(new Date()),
      title: postContent.title,
      imageURL: 'NullPlaceHolder',
      contentURLs: [],
      tags: postContent.tags,
      postType: postContent.postType
    };

    // Add the post document to the collection
    const postRef = await addDoc(collection(db, 'POST'), post);

    // Upload Image
    const storageRef = ref(storage, `images/${postRef.id}`);
    await uploadBytes(storageRef, postContent.image!);
    const imageUrl = await getDownloadURL(storageRef);

    // Upload Components
    const componentUrls = await Promise.all(
      postContent.components.map(async (component, index) => {
        const language = languageOptions[component.fileType || 'markdown'];
        const fileType = language.mimeType;
        const fileExtension = language.extension;
        const blob = new Blob([component.content], { type: fileType });
        const fileRef = ref(storage, `POST/${postRef.id}/${postRef.id}_${index}.${fileExtension}`);
        await uploadBytes(fileRef, blob);
        const downloadURL = await getDownloadURL(fileRef);

        // Return the URL and file type
        return {
          url: downloadURL,
          type: component.fileType || fileType,
        };
      })
    );

    // Update the post document with the generated postId, Image & Component URLs
    await setDoc(doc(db, 'POST', postRef.id), {
      ...post,
      imageURL: imageUrl,
      contentURLs: componentUrls,
      postId: postRef.id,
    });

    // Check if the user's posts document exists
    const userPostsRef = doc(db, `USERS_POST/${userId}`);
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


