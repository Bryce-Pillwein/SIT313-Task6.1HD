import { collection, query, where, orderBy, getDocs } from "firebase/firestore";
import { db } from "@/firebaseConfig";
import { Chat } from "@/types/Chat";  // Assuming you save the Chat type in this path

/**
 * Get User Chat Threads
 * @returns Array of chats ordered by the most recent message
 */
export default async function getUserChatThreads(uid: string): Promise<Chat[] | null> {
  try {
    const chatsRef = collection(db, "CHATS");

    // Create a query to find all chats where the user is a participant and order them by lastMessage.sentAt
    const q = query(
      chatsRef,
      where("participantIds", "array-contains", uid),
      orderBy("lastMessage.sentAt", "desc")
    );

    const querySnapshot = await getDocs(q);

    // Map the query results
    const chats: Chat[] = querySnapshot.docs.map(doc => doc.data() as Chat);


    return chats;
  } catch (error) {
    console.error("Error fetching chats:", error);
    throw error;
  }
}
