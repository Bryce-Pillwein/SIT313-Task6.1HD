// Chat Message Area tsx
import { Chat } from "@/types/Chat";
import ProfilePicture from "../ui/ProfilePicture";
import { useEffect, useMemo, useRef, useState } from "react";
import IconDevProfile from "../icons/IconDevProfile";
import { useNotification } from "../providers/NotificationProvider";
import { collection, query, orderBy, limit, onSnapshot, Timestamp } from "firebase/firestore";
import { db } from "@/firebaseConfig";
import IconGeneral from "../icons/IconGeneral";
import { setNewMessage } from "@/services";

interface ChatMessageAreaProps {
  chat: Chat;
  uid: string;
}

const ChatMessageArea: React.FC<ChatMessageAreaProps> = ({ chat, uid }) => {
  const { addNotification } = useNotification();
  const [message, setMessage] = useState<string>('');
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const fetchedMessageIds = useRef(new Set());
  const messagesEndRef = useRef<HTMLDivElement | null>(null); // Ref for auto-scrolling

  const participantNameMap = useMemo(() => {
    return chat.participants.reduce((map, participant) => {
      map[participant.uid] = `${participant.firstName} ${participant.lastName}`;
      return map;
    }, {} as { [id: string]: string });
  }, [chat.participants]);



  useEffect(() => {
    if (!chat.chatId) return;

    setLoading(true);

    const messagesRef = collection(db, "CHATS", chat.chatId, "messages");
    const q = query(messagesRef, orderBy("sentAt", "asc"), limit(50));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newMessages = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      const uniqueNewMessages = newMessages.filter(message => !fetchedMessageIds.current.has(message.id));
      uniqueNewMessages.forEach(message => fetchedMessageIds.current.add(message.id));

      setMessages((prevMessages) => [...prevMessages, ...uniqueNewMessages]);
      setLoading(false);

      // Scroll to bottom when new messages arrive
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
      }
    }, (error) => {
      console.error("Error fetching messages:", error);
      addNotification('Error fetching messages');
      setLoading(false);
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, [chat.chatId, addNotification]);

  const handleSendMessage = async () => {
    try {
      const messageId = await setNewMessage(chat.chatId, uid, message);
      setMessage('');
    } catch (error) {
      console.error("Error sending messages:", error);
      addNotification('Error sending messages');
    }
  };

  return (
    <div className="flex flex-col h-full max-h-full ">
      <div className="flex items-center flex-shrink-0 gap-x-4 pb-2">
        {chat.participants.length >= 3 ? (
          <IconDevProfile />
        ) : (
          <ProfilePicture size="40" uid={chat.participants[1].uid} />
        )}
        <p className="truncate">
          {chat.participants
            .filter((participant) => participant.uid !== uid)
            .map((participant) => `${participant.firstName} ${participant.lastName}`)
            .join(', ')}
        </p>
      </div>


      <div className="flex-grow overflow-y-scroll p-4 bg-hsl-l30">
        {messages.map((message, idx) => {
          const isCurrentUser = message.senderId === uid;
          const showTimestamp =
            idx === 0 ||
            new Date(messages[idx].sentAt.seconds * 1000).getTime() -
            new Date(messages[idx - 1].sentAt.seconds * 1000).getTime() >
            60000; // 60 seconds gap

          return (
            <div key={idx}>
              {showTimestamp && (
                <div className="text-center text-hsl-l50 text-xs mt-4">
                  {new Date(message.sentAt.seconds * 1000).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </div>
              )}
              <div className={`flex mb-1 ${isCurrentUser ? 'justify-end' : 'justify-start'}`} >
                <div className={`max-w-xs rounded-lg py-1 px-2 ${isCurrentUser ? 'bg-blue-500 text-white' : 'bg-hsl-l70'}`} >
                  <p className="">{message.message}</p>
                </div>
              </div>
            </div>
          );
        })}

        {loading && (
          <p className="text-center text-gray-500 text-sm mt-4">
            Loading more messages...
          </p>
        )}

        <div ref={messagesEndRef} />
      </div>

      <div className="flex flex-shrink-0 gap-x-4 items-center py-4 bg-inherit">
        <input type="text" value={message} placeholder="Message"
          className="df-input w-full"
          onChange={(e) => setMessage(e.target.value)} />
        <button type="button" onClick={handleSendMessage}
          className="flex items-center gap-1 py-1 px-2 text-sm bg-[#1da1f2] hover:bg-[#119bf0] dark:bg-[#283f4d] dark:hover:bg-[#2e4959] rounded-lg text-white">
          Send
          <IconGeneral type="send" className="fill-white" />
        </button>
      </div>
    </div>
  );
};

export default ChatMessageArea;

