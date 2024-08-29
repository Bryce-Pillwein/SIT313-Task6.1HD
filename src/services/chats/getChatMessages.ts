import { collection, query, orderBy, limit, getDocs, startAfter, DocumentSnapshot, Timestamp } from "firebase/firestore";
import { db } from "@/firebaseConfig";

/**
 * Get Chat Messages
 * @param chatId 
 * @param limitMessages 
 * @returns 
 */
export default async function getChatMessages(chatId: string, lastVisibleTimestamp?: Timestamp, limitMessages: number = 50) {
  try {
    const messagesRef = collection(db, "CHATS", chatId, "messages");

    // Create a query to get messages, ordered by timestamp, and limit the number of results
    const q = query(
      messagesRef,
      orderBy("sentAt", "asc"),
      ...(lastVisibleTimestamp ? [startAfter(lastVisibleTimestamp)] : []), // Use startAfter only if lastVisibleTimestamp is defined
      limit(limitMessages)
    );

    const querySnapshot = await getDocs(q);

    // Map the query results to an array of message data
    const messages = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    // Debug: Log query results
    console.log('Query Snapshot:', querySnapshot);

    // Get the last visible timestamp for the next fetch
    const newLastVisibleTimestamp = querySnapshot.docs.length > 0
      ? querySnapshot.docs[querySnapshot.docs.length - 1].data().sentAt
      : undefined;

    return { messages, lastVisibleTimestamp: newLastVisibleTimestamp };
  } catch (error) {
    console.error("Error fetching chat messages:", error);
    throw error;
  }
}
