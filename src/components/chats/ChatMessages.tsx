// Chat Messages tsx

import { useLayoutEffect, useRef } from "react";
import { Message } from "@/types/Chat";


interface ChatMessagesProps {
  messages: Message[];
  uid: string;
}

const ChatMessages: React.FC<ChatMessagesProps> = ({ messages, uid }) => {
  const messagesEndRef = useRef<HTMLDivElement | null>(null); // Ref for auto-scrolling

  /**
   * Automate Scroll to Latest Message
   */
  useLayoutEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [messages]);

  /**
   * Formate Timestamp
   * @param date 
   * @returns 
   */
  const formatTimestamp = (date: Date): string => {
    return date.toLocaleDateString([], {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  /**
   * Format Time
   * @param date 
   * @returns 
   */
  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="flex-grow overflow-y-scroll custom-scrollbar p-4">
      {messages.map((message, idx) => {
        const isCurrentUser = message.senderId === uid;
        const currentMessageDate = new Date(message.sentAt.seconds * 1000);
        const previousMessageDate = idx > 0 ? new Date(messages[idx - 1].sentAt.seconds * 1000) : null;

        const isSameDay = previousMessageDate && currentMessageDate.toDateString() === previousMessageDate.toDateString();

        const showTimestamp = idx === 0 || !isSameDay || currentMessageDate.getTime() - previousMessageDate.getTime() > 60000;
        const formattedTimestamp = formatTimestamp(currentMessageDate);
        const formattedTime = formatTime(currentMessageDate);

        return (
          <div key={idx}>
            {showTimestamp && (
              <div className="text-center text-hsl-l50 text-xs mt-4">
                {currentMessageDate.toDateString() === new Date().toDateString() ? formattedTime : formattedTimestamp}
              </div>
            )}
            <div className={`flex mb-1 ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-xs rounded-lg py-1 px-2 ${isCurrentUser
                ? 'bg-mb-pink text-white dark:bg-mb-yellow dark:text-black'
                : 'bg-hsl-l70'}`}>
                <p>{message.message}</p>
              </div>
            </div>

            <div ref={messagesEndRef} />
          </div>
        );
      })}
    </div>
  );
};

export default ChatMessages;
