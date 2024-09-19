import { db, auth, storage } from "@/firebaseConfig";
import { Post } from "@/types/Post";
import { PostUpload } from "@/types/PostUpload";
import { Status } from "@/types/Status";
import { collection, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import { ref, deleteObject, uploadBytes, getDownloadURL } from "firebase/storage";

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

// export default async function updatePost(postContent: PostUpload): Promise<Status> {
//   try {
//     // Enforce authenticated user
//     if (!auth.currentUser) {
//       return { success: false, message: 'No user detected. Login to post' };
//     }
//     const userId = auth.currentUser.uid;

//     // Ensure postId is present
//     if (!postContent.postId) {
//       return { success: false, message: 'Invalid post ID' };
//     }

//     // Create Updated Post Data
//     const updatedPost: Partial<Post> = {
//       title: postContent.title,
//       tags: postContent.tags,
//     };

//     // Get existing post and delete old components
//     const postDocRef = doc(db, 'POST', postContent.postId);
//     const postDoc = await getDoc(postDocRef);

//     if (postDoc.exists()) {
//       const existingPost = postDoc.data() as Post;

//       // Delete existing components from storage
//       if (existingPost.contentURLs) {
//         await Promise.all(
//           existingPost.contentURLs.map(async (contentURL) => {
//             const fileRef = ref(storage, contentURL.url);
//             await deleteObject(fileRef);
//           })
//         );
//       }

//       // Upload new components
//       const componentUrls = await Promise.all(
//         postContent.components.map(async (component, index) => {
//           const language = languageOptions[component.fileType || 'markdown'];
//           const fileType = language.mimeType;
//           const fileExtension = language.extension;
//           const blob = new Blob([component.content], { type: fileType });
//           const fileRef = ref(storage, `POST/${postContent.postId}/${postContent.postId}_${index}.${fileExtension}`);
//           await uploadBytes(fileRef, blob);
//           const downloadURL = await getDownloadURL(fileRef);

//           return {
//             url: downloadURL,
//             type: component.fileType || fileType,
//           };
//         })
//       );

//       // Update the post document with new data
//       await updateDoc(postDocRef, {
//         ...updatedPost,
//         contentURLs: componentUrls,
//       });

//       return { success: true, message: null };
//     } else {
//       return { success: false, message: 'Post not found' };
//     }
//   } catch (error) {
//     console.error('Error updating post:', error);
//     return { success: false, message: 'Error updating post. Try again later.' };
//   }
// }



// export default async function updatePost() {
//   const postsRef = collection(db, "POST");
//   const querySnapshot = await getDocs(postsRef);

//   // Collect all update promises
//   const updatePromises = querySnapshot.docs.map(async (docSnapshot) => {
//     const postData = docSnapshot.data();
//     const postRef = doc(db, "POST", docSnapshot.id);

//     // Update the post with the new searchFields
//     return updateDoc(postRef, {
//       searchFields: {
//         title_lowercase: postData.title.toLowerCase(),
//         authorFirstName_lowercase: postData.authorFirstName.toLowerCase(),
//         authorLastName_lowercase: postData.authorLastName.toLowerCase(),
//         tags_lowercase: postData.tags.map((tag: string) => tag.toLowerCase()),
//         date_lowercase: postData.date.toLowerCase() // Convert or modify date format if necessary
//       }
//     });
//   });

//   // Wait for all updates to complete
//   await Promise.all(updatePromises);
// }