import { collection, getDocs, orderBy, query, Timestamp } from "firebase/firestore";
import { db } from "@/firebaseConfig";


/**
 * Get All Questions
 * @returns sorted array of questions (by date) or null
 */
export default async function getAllQuestions(): Promise<any[] | null> {
  try {
    const questionsRef = collection(db, 'POST_QUESTION');
    const q = query(questionsRef, orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return null;
    }

    const questions = querySnapshot.docs.map(doc => {
      const data = doc.data();
      // Format date if it exists
      const formattedData = {
        ...data,
        date: data.createdAt ? data.createdAt.toDate() : null
      };
      return formattedData;
    });

    return questions;
  } catch (error) {
    throw error;
  }
}


/**
 *   DEPRECIATED - DELETE IF NOT USED
 * 
 * 
 * Format a Firestore Timestamp to dd/mm/yyyy
 * @param timestamp Firestore Timestamp
 * @returns Formatted date as string
 */
const formatDate = (timestamp: Timestamp): string => {
  const date = timestamp.toDate(); // Convert Firestore Timestamp to JavaScript Date
  const day = String(date.getDate()).padStart(2, '0'); // Get day and pad with zero if needed
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Get month (0-indexed) and pad with zero
  const year = date.getFullYear(); // Get year

  return `${day}/${month}/${year}`; // Format date as dd/mm/yyyy
};