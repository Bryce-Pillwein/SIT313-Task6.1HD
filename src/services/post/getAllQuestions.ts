import { db } from "@/firebaseConfig";
import { collection, getDocs, Timestamp } from "firebase/firestore";

/**
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

/**
 * Get All Questions
 * @returns array of questions or null
 */
export default async function getAllQuestions(): Promise<any[] | null> {
  try {
    const questionsRef = collection(db, 'POST_QUESTION');
    const querySnapshot = await getDocs(questionsRef);

    if (querySnapshot.empty) {
      return null;
    }

    // Map through documents and format date
    const questions = querySnapshot.docs.map(doc => {
      const data = doc.data();
      // Format date if it exists
      const formattedData = {
        ...data,
        date: data.date ? formatDate(data.date as Timestamp) : null
      };
      return formattedData;
    });

    return questions;
  } catch (error) {
    throw error;
  }
}
