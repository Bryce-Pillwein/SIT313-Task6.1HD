// Chat Message Area tsx

import { useEffect, useRef, useState } from "react";
import ReactDOM from 'react-dom';
import Link from "next/link";
import { useNotification } from "../providers/NotificationProvider";
import ProfilePicture from "../ui/ProfilePicture";
import IconDevProfile from "../icons/IconDevProfile";
import IconGeneral from "../icons/IconGeneral";
import { setNewMessage } from "@/services";
import ChatMessages from "./ChatMessages";
import { Chat, Message } from "@/types/Chat";
import { collection, query, orderBy, limit, onSnapshot } from "firebase/firestore";
import { db } from "@/firebaseConfig";

interface ChatMessageAreaProps {
  chat: Chat;
  uid: string;
  handleDeleteChat: (chatId: string) => void;
}

const ChatMessageArea: React.FC<ChatMessageAreaProps> = ({ chat, uid, handleDeleteChat }) => {
  const { addNotification } = useNotification();
  const [message, setMessage] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);
  const fetchedMessageIds = useRef(new Set());
  const [isYesNoModalVis, setIsYesNoModalVis] = useState<boolean>(false);

  /**
   * Fetch Messages
   * Subscribes to firestore for updates
   */
  useEffect(() => {
    if (!chat.chatId) return;

    setMessages([]);
    fetchedMessageIds.current.clear();

    const messagesRef = collection(db, "CHATS", chat.chatId, "messages");
    const q = query(messagesRef, orderBy("sentAt", "asc"), limit(100));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newMessages = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data() as Omit<Message, 'id'>
      }));

      const uniqueNewMessages = newMessages.filter(message => !fetchedMessageIds.current.has(message.id));
      uniqueNewMessages.forEach(message => fetchedMessageIds.current.add(message.id));

      setMessages((prevMessages) => [...prevMessages, ...uniqueNewMessages]);

    }, (error) => {
      console.error("Error fetching messages:", error);
      addNotification('Error fetching messages');
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, [chat.chatId, addNotification]);

  /**
   * Handle Send Message
   */
  const handleSendMessage = async () => {
    try {
      const validMessage = message.trim();
      if (validMessage.length > 0) {
        const messageId = await setNewMessage(chat.chatId, uid, message);
        setMessage('');
      }
    } catch (error) {
      console.error("Error sending messages:", error);
      addNotification('Error sending messages');
    }
  };

  /**
   * Handle Key Down Enter
   * @param e 
   */
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter')
      handleSendMessage();
  };

  /**
   * Handle Delete Chat
   */
  const handleDeleteChatEx = () => {
    handleDeleteChat(chat.chatId);
    setIsYesNoModalVis(false)
  }

  return (
    <div className="flex flex-col h-full max-h-full">

      {/* Chat Participants */}
      <div className="flex items-center justify-between flex-shrink-0 shadow-sm pb-2 p-4">
        <div className="flex items-center gap-x-4">
          {chat.participants.length >= 3 ? (
            <IconDevProfile />
          ) : (
            <ProfilePicture size="40" uid={chat.participants[1].uid} />
          )}
          <p className="truncate">
            {chat.participants
              .filter((participant) => participant.uid !== uid)
              .map((participant) => (
                <Link key={participant.uid} href={`/profile/${participant.uid}`}
                  className="hover:underline">
                  {`${participant.firstName} ${participant.lastName}`}
                </Link>
              ))}
          </p>
        </div>

        <div onClick={() => setIsYesNoModalVis(true)} title="Delete Conversation"
          className="group hover:bg-hsl-l90 hover:dark:bg-hsl-l20 px-2 py-2 rounded-lg cursor-pointer" >
          <IconGeneral type="delete" className="fill-hsl-l70 dark:fill-hsl-l30 group-hover:fill-red-700" />
        </div>
      </div>

      {/* Messages Render Area */}
      <ChatMessages messages={messages} uid={uid} />

      {/* Input Message Area */}
      <div className="flex flex-shrink-0 gap-x-4 items-center p-4 bg-inherit">
        <input type="text" value={message} placeholder="Message"
          className="df-input w-full"
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown} />
        <button type="button" onClick={handleSendMessage}
          className="flex items-center gap-1 py-1 px-2 text-sm bg-mb-pink hover:bg-mb-pink-active dark:bg-mb-yellow dark:hover:bg-mb-yellow-active rounded-lg">
          <p className="text-white dark:text-black">Send</p>
          <IconGeneral type="send" className="!fill-hsl-l100 dark:!fill-hsl-l5" />
        </button>
      </div>

      {/* Delete Conversation Check - Modal */}
      {isYesNoModalVis &&
        ReactDOM.createPortal(
          <div className="fixed inset-0 flex flex-col justify-center items-center bg-black bg-opacity-50 z-50">
            <div className="bg-hsl-l95 dark:bg-hsl-l15 rounded-lg p-6 max-w-sm mx-auto">

              <p className="text-lg mb-4">Are you sure you want to delete this conversation?</p>

              <div className="flex justify-center gap-4">
                <button onClick={handleDeleteChatEx} className="py-1 px-3 rounded bg-hsl-l70 dark:bg-hsl-l30 hover:bg-hsl-l80 dark:hover:bg-hsl-l20">
                  <p>Yes</p>
                </button>
                <button onClick={() => setIsYesNoModalVis(false)} className="py-1 px-3 rounded bg-hsl-l70 dark:bg-hsl-l30 hover:bg-hsl-l80 dark:hover:bg-hsl-l20 " >
                  <p>No</p>
                </button>
              </div>

            </div>
          </div>,
          document.body
        )
      }

    </div>
  );
};

export default ChatMessageArea;

