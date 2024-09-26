import { addDoc, collection, doc, serverTimestamp, setDoc, Timestamp } from "firebase/firestore";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { db, storage, auth } from "@/firebaseConfig";
import { Status } from "@/types/Status";
import getUserValue from "../user/getUserValue";
import formatFSDate from "../util/formatFSDate";

/**
 * Uploads the guide details, video, and description to Firebase.
 * @param title - Title of the guide.
 * @param videoFile - Video file to be uploaded.
 * @param description - Description of the guide in markdown format.
 * @returns Promise<void>
 */
export default async function setGuide(title: string, videoFile: File, description: string): Promise<Status> {
  try {

    // Enforce authenticated user
    if (!auth.currentUser) {
      return { success: false, message: 'No user detected. Login to post' };
    }

    const userId = auth.currentUser.uid;

    // Get User first and Last Name
    const userFN = await getUserValue(userId, 'firstName');
    const userLN = await getUserValue(userId, 'lastName');

    // Add the post document to the collection
    const postRef = await addDoc(collection(db, 'GUIDE'), {
      postId: 'NullPlaceHolder', // Placeholder until we have the post ID
      title: title,
      userId: userId,
      authorFirstName: userFN,
      authorLastName: userLN,
      createdAt: serverTimestamp() as Timestamp,
      date: formatFSDate(new Date()),
      videoURL: '',
      descriptionURL: '',
      searchFields: {
        title_lowercase: title.toLowerCase(),
        authorFirstName_lowercase: userFN.toLowerCase(),
        authorLastName_lowercase: userLN.toLowerCase(),
        date_lowercase: formatFSDate(new Date()).toLowerCase()
      }
    });

    // Create a reference for the video file in Firebase Storage
    const videoRef = ref(storage, `GUIDES/${postRef.id}/video`);
    await uploadBytes(videoRef, videoFile);
    const videoURL = await getDownloadURL(videoRef);

    // Create a markdown file as a Blob
    const descriptionBlob = new Blob([description], { type: "text/markdown" });
    const descriptionRef = ref(storage, `GUIDES/${postRef.id}/description.md`);
    await uploadBytes(descriptionRef, descriptionBlob);
    const descriptionURL = await getDownloadURL(descriptionRef);

    // Update the post document with the correct URLs
    await setDoc(postRef, { videoURL, descriptionURL, postId: postRef.id }, { merge: true });

    return { success: true, message: null };

  } catch (error) {
    throw error;
  }
}
