import { addDoc, collection, Timestamp, updateDoc } from "firebase/firestore";
import { db, auth } from "@/firebaseConfig";
import { User } from "@/types/User";
import getUserValue from "../user/getUserValue";
import { Status } from "@/types/Status";


/**
 * Create New Chat
 * @param users list of users to send a message to
 * @param message message string
 */
export default async function setNewChat(users: User[], message: string): Promise<Status> {
  try {
    // Check if the current user is authenticated
    if (!auth.currentUser) {
      return { success: false, message: 'No user detected. Login to Send Message' };
    }

    // Get Sender Details
    const senderId = auth.currentUser.uid;
    const senderFirstName = await getUserValue(senderId, 'firstName');
    const senderLastName = await getUserValue(senderId, 'lastName');
    const senderFullName = await getUserValue(senderId, 'fullName');

    // Combine the sender with the other participants
    const participants = [
      {
        uid: senderId,
        firstName: senderFirstName,
        lastName: senderLastName,
        fullName: senderFullName,
      },
      ...users.map(user => ({
        uid: user.uid,
        firstName: user.firstName,
        lastName: user.lastName,
        fullName: user.fullName,
      })),
    ];

    // Participant id array for databse querys
    const participantIds = participants.map(p => p.uid);

    // Prepare the initial message data
    const initialMessage = {
      senderId: senderId,
      message: message,
      sentAt: Timestamp.now(),
    };

    // Create a new chat document with participants, initial message, and last message
    const chatData = {
      participantIds: participantIds,
      participants: participants,
      createdAt: Timestamp.now(),
      lastMessage: initialMessage,
    };

    // Add New Chat Document
    const chatsRef = collection(db, 'CHATS');
    const newChatRef = await addDoc(chatsRef, chatData);
    const chatId = newChatRef.id;

    // Add ChatId
    await updateDoc(newChatRef, { chatId });

    // Add initial message to the messages subcollection
    await addDoc(collection(newChatRef, 'messages'), initialMessage);

    return { success: true, message: null };
  } catch (error) {
    throw error;
  }
}