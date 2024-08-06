import { doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "@/firebaseConfig";
import { Status } from "@/types/Status";

/**
 * Set Subscriber
 * @param name User Name
 * @param email User Email
 * @returns Status Response
 */
export default async function setSubscriber(name: string, email: string): Promise<Status> {
  try {
    const docRef = doc(db, `SUBSCRIBERS/ACTIVE`);
    const docSnap = await getDoc(docRef);

    // Check if the document exists and if the user already exists in the subscribers array
    if (docSnap.exists()) {
      const data = docSnap.data();
      const subscribers = data.subscribers || [];

      const userExists = subscribers.some((subscriber: { name: string; email: string }) => subscriber.email === email);

      if (userExists) {
        return { success: false, message: 'You are already subscribed!' };
      }
    } else {
      // If document does not exist, create it with an empty subscribers array
      await updateDoc(docRef, { subscribers: arrayUnion() });
    }

    // Add new subscriber
    await updateDoc(docRef, {
      subscribers: arrayUnion({ name, email })
    });

    return { success: true, message: 'Email Added' };
  } catch (error) {
    throw error;
  }
}
