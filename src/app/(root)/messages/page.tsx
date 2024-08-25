// Messages Page tsx

"use client";

import CreateChatModal from "@/components/chats/CreateChatModal";
import IconGeneral from "@/components/icons/IconGeneral";
import Header from "@/components/layout/Header";
import { useState } from "react";


export default function MessagesPage() {
  const [modalCreateNewVisible, setModalCreateNewVisible] = useState<boolean>(false);

  return (
    <main className="h-[100vh] flex flex-col">
      <Header />

      <div className="grid grid-cols-4 gap-x-4 flex-grow flex-shrink-0  px-8 py-4">

        {/* Message Threads */}
        <div className="col-span-1 flex-grow flex-shrink-0 bg-hsl-l100 dark:bg-hsl-l15 dark:bg-hsl-20 rounded-xl p-4">
          <div className="flex justify-between items-center">
            <h1 className="font-montserrat font-bold text-2xl">Chats</h1>
            <button onClick={() => setModalCreateNewVisible(!modalCreateNewVisible)}
              className="group bg-hsl-l80 dark:bg-hsl-l20  rounded-full p-2">
              <IconGeneral type="create-message" size={24} className="fill-hsl-l20 dark:fill-hsl-l80 group-hover:fill-mb-pink group-hover:dark:fill-mb-yellow" />
            </button>
          </div>

          <div className="flex-grow flex-shrink-0">
            {[1, 2, 3, 4].map((thread, idx) => (
              <div key={idx}>
                <p>{thread}</p>
              </div>
            ))}

          </div>
        </div>

        {/* Message Area */}
        <div className="col-span-3 bg-blue-500 flex-grow flex-shrink-0 rounded-xl p-4">

        </div>
      </div>

      {modalCreateNewVisible && (
        <CreateChatModal onClose={() => setModalCreateNewVisible(!modalCreateNewVisible)} />
      )}
    </main>
  );
}