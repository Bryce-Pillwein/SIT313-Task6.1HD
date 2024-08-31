import { collection, doc, getDocs, deleteDoc } from "firebase/firestore";
import { db } from "@/firebaseConfig";

/**
 * Delete Chat Thread
 * @param chatId The ID of the chat to delete
 */
export default async function deleteChatThread(chatId: string) {
  try {
    const chatDocRef = doc(db, 'CHATS', chatId);
    const messagesRef = collection(db, 'CHATS', chatId, 'messages');

    // Fetch all message documents
    const messageDocs = await getDocs(messagesRef);

    // Delete each message document
    const deletePromises = messageDocs.docs.map(doc => deleteDoc(doc.ref));
    await Promise.all(deletePromises);

    // Delete the chat document
    await deleteDoc(chatDocRef);

  } catch (error) {
    throw error;
  }
}
