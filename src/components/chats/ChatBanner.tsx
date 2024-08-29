// Chat Banner tsx
import { Chat } from "@/types/Chat";
import ProfilePicture from "../ui/ProfilePicture";
import { useEffect, useState } from "react";

interface ChatBannerProps {
  chat: Chat;
  uid: string;
  displayChat: (chat: Chat) => void;
}

const ChatBanner: React.FC<ChatBannerProps> = ({ chat, uid, displayChat }) => {
  const [participantNames, setParticipantNames] = useState<string>('');
  const [nonUserParticipantId, setNonUserParticipantId] = useState<string | undefined>('');
  const [lastMessageTime, setLastMessageTime] = useState<string>('');

  /**
   * Get Participants names and profile id
   */
  useEffect(() => {
    const nonUserParticipant = chat.participants.find(participant => participant.uid !== uid);
    if (nonUserParticipant) {
      setParticipantNames(
        chat.participants
          .filter(participant => participant.uid !== uid)
          .map(participant => `${participant.firstName} ${participant.lastName}`)
          .join(', ')
      );
      setNonUserParticipantId(nonUserParticipant.uid);
    } else {
      setParticipantNames('');
      setNonUserParticipantId(undefined);
    }
  }, [chat, uid]);

  /**
   * Calculate time since last message
   */
  useEffect(() => {
    const calculateTimeAgo = () => {
      const now = new Date();
      const messageDate = new Date(chat.lastMessage.sentAt.seconds * 1000);
      const diffInMs = now.getTime() - messageDate.getTime();
      const diffInSeconds = Math.floor(diffInMs / 1000);
      const diffInMinutes = Math.floor(diffInSeconds / 60);
      const diffInHours = Math.floor(diffInMinutes / 60);
      const diffInDays = Math.floor(diffInHours / 24);
      const diffInWeeks = Math.floor(diffInDays / 7);
      const diffInYears = Math.floor(diffInDays / 365);

      let timeAgo = '';

      if (diffInSeconds < 60) {
        timeAgo = `${diffInSeconds}s`;
      } else if (diffInMinutes < 60) {
        timeAgo = `${diffInMinutes}m`;
      } else if (diffInHours < 24) {
        timeAgo = `${diffInHours}h`;
      } else if (diffInDays < 7) {
        timeAgo = `${diffInDays}d`;
      } else if (diffInWeeks < 52) {
        timeAgo = `${diffInWeeks}w`;
      } else {
        timeAgo = `${diffInYears}y`;
      }

      setLastMessageTime(timeAgo);
    };

    calculateTimeAgo();
  }, [chat.lastMessage.sentAt.seconds]);

  return (
    <div onClick={() => displayChat(chat)}
      className="hover:bg-hsl-l95 hover:dark:bg-hsl-l20 flex items-center gap-x-4 p-4 rounded-md cursor-pointer">
      <ProfilePicture size="50" uid={nonUserParticipantId} />
      <div className="">
        <p className="truncate ">{participantNames}</p>
        <div className="flex items-center gap-x-1">
          <p className="truncate text-hsl-l50 text-sm">{chat.lastMessage.message}</p>
          <p className="text-hsl-l50 text-sm">&bull;</p>
          <p className="text-hsl-l50 text-sm">{lastMessageTime}</p>
        </div>
      </div>
    </div>
  );
};

export default ChatBanner;
