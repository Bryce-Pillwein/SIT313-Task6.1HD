// Messages Page tsx

"use client";

import ChatBanner from "@/components/chats/ChatBanner";
import ChatMessageArea from "@/components/chats/ChatMessageArea";
import CreateChatModal from "@/components/chats/CreateChatModal";
import IconGeneral from "@/components/icons/IconGeneral";
import Header from "@/components/layout/Header";
import { useAuth } from "@/components/providers/AuthProvider";
import { useNotification } from "@/components/providers/NotificationProvider";
import { getUserChatThreads } from "@/services";
import { Chat } from "@/types/Chat";
import { useEffect, useState } from "react";


export default function MessagesPage() {
  const { user, loading } = useAuth();
  const { addNotification } = useNotification();
  const [modalCreateNewVisible, setModalCreateNewVisible] = useState<boolean>(false);
  const [chats, setChats] = useState<Chat[]>([]);
  const [displayedChat, setDisplayedChat] = useState<Chat>();

  useEffect(() => {
    if (user) {
      getChats(user.uid);
    }
  }, [user]);

  /**
   * Get Chats
   * @returns chat threads
   */
  const getChats = async (uid: string) => {
    try {
      const response = await getUserChatThreads(uid);
      if (!response) {
        addNotification('Error creating chat');
        return;
      }
      setChats(response);
    } catch (error) {
      console.error('Error fetching users:', error);
      addNotification('Error fetching chats');
    }
  }


  /**
   * Handle Chat Click
   * @param chat 
   */
  const handleChatClick = (chat: Chat) => {
    setDisplayedChat(chat);
  };

  return (
    <main className="h-[100vh] flex flex-col">
      {/* <Header /> */}

      <div className="h-full grid grid-cols-4 gap-x-4 flex-grow flex-shrink-0 px-8 py-4">

        {/* Message Threads */}
        <div className="col-span-1 flex-grow flex-shrink-0 bg-hsl-l100 dark:bg-hsl-l15 rounded-xl py-4 px-1">
          <div className="flex justify-between items-center px-4 mb-2">
            <h1 className="font-montserrat font-bold text-2xl">Chats</h1>
            <button onClick={() => setModalCreateNewVisible(!modalCreateNewVisible)}
              className="group bg-hsl-l80 dark:bg-hsl-l20 hover:bg-mb-pink hover:dark:bg-mb-yellow rounded-full p-2">
              <IconGeneral type="create-message" size={24} className="fill-hsl-l30 dark:fill-hsl-l70 group-hover:fill-white" />
            </button>
          </div>

          {chats.length > 0 ? (
            chats.map((chat, idx) => (
              <div key={idx} className="overflow-y-auto">
                <ChatBanner chat={chat} uid={user!.uid} displayChat={handleChatClick} />
              </div>
            ))
          ) : (
            <p>No chats available</p>
          )}
        </div>

        {/* Message Area */}
        <div className="col-span-3 h-full max-h-full overflow-hidden bg-hsl-l100 dark:bg-hsl-l15 rounded-xl p-4">
          {displayedChat && (
            <ChatMessageArea chat={displayedChat} uid={user!.uid} />
          )}
        </div>
      </div>

      {
        modalCreateNewVisible && (
          <CreateChatModal onClose={() => setModalCreateNewVisible(!modalCreateNewVisible)} refresh={() => getChats(user!.uid)} />
        )
      }
    </main >
  );
}