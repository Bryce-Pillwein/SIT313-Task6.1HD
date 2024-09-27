import { db, auth } from "@/firebaseConfig";
import { Status } from "@/types/Status";
import { addDoc, collection } from "firebase/firestore";

/**
 * Set Enquiry
 * @param name name of user
 * @param email email of user
 * @param message message
 * @returns status of response
 */
export default async function setEnquiry(name: string, email: string, message: string, type?: string): Promise<Status> {
  try {
    // Check user authentication
    if (!auth.currentUser) {
      return { success: false, message: 'No user detected. Log in' };
    }

    const enquiry = {
      userId: auth.currentUser.uid,
      name: name,
      email: email,
      message: message,
      type: type || 'enquiry'
    }

    // Add the enquiry to the 'REPORTS' collection in Firestore
    const collectionRef = collection(db, 'REPORTS');
    await addDoc(collectionRef, enquiry);

    return { success: true, message: null };
  } catch (error) {
    throw error;
  }
}