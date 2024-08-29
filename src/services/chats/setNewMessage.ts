import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "@/firebaseConfig";

interface Message {
  message: string;
  senderId: string;
  sentAt: Timestamp;
}

/**
 * Send a new message to a chat
 * @param chatId The ID of the chat
 * @param senderId The ID of the user sending the message
 * @param message The message content
 * @returns The ID of the newly created message document
 */
export default async function setNewMessage(chatId: string, senderId: string, message: string): Promise<string> {
  try {
    const messagesRef = collection(db, "CHATS", chatId, "messages");

    const newMessage: Message = {
      message,
      senderId,
      sentAt: Timestamp.now(),
    };

    const docRef = await addDoc(messagesRef, newMessage);

    return docRef.id;
  } catch (error) {
    console.error("Error sending message:", error);
    throw error;
  }
}
