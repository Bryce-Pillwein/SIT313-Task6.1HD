import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "@/firebaseConfig";

/**
 * Get All Questions
 * @returns sorted array of questions (by date) or null
 */
export default async function getPostAll(type: string): Promise<any[] | null> {
  try {
    const questionsRef = collection(db, type);
    const q = query(questionsRef, orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return null;
    }

    const questions = querySnapshot.docs.map(doc => doc.data());

    return questions;
  } catch (error) {
    throw error;
  }
}