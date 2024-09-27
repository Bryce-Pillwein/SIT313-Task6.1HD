// Report Page tsx

"use client";

import { useState } from "react";
import { useNotification } from "@/components/providers/NotificationProvider";
import { setEnquiry } from "@/services";
import LayoutDefault from "@/components/layout/LayoutDefault";


export default function ReportPage() {
  const { addNotification } = useNotification();
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string>('');


  /**
   * Handle Send 
   */
  const handleSendEnquiry = async () => {
    try {
      if (name.trim().length <= 0 || message.trim().length <= 0) {
        addNotification('Fields cannot be empty');
        return;
      }
      const response = await setEnquiry(name, email, message, 'report');
      if (!response.success) {
        addNotification(response.message!);
        return;
      }
      addNotification('Message sent!');
    } catch (error) {
      console.error(error);
      addNotification('Error sending message. Try again');
    }
  };

  return (
    <LayoutDefault>
      <main className="mt-8">
        <h1 className="text-3xl font-bold my-4">Report Issue</h1>

        <div className="flex justify-center items-center mt-4 bg-hsl-l100 dark:bg-hsl-l15 shadow py-8 px-4 md:px-8 rounded-lg">
          <form onSubmit={handleSendEnquiry} className="w-full max-w-[100%] sm:max-w-[70%] md:max-w-[50%]">

            <label htmlFor="name" className="text-hsl-l50 text-sm">Name</label>
            <input type="text" id="name" name="name" className='df-input w-full' required
              value={name} onChange={(e) => setName(e.target.value)} autoComplete="off" />

            <label htmlFor="title" className="text-hsl-l50 text-sm">Email</label>
            <input type="email" id="email" name="email" className='df-input w-full' required
              value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="off" />

            <label htmlFor="message" className="text-hsl-l50 text-sm">Issue</label>
            <textarea id="message" name="message" autoComplete="off"
              className='input-resize-content df-input w-full min-h-[5lh] max-h-[15lh]'
              value={message} onChange={(e) => setMessage(e.target.value)}></textarea>

            <div className="flex justify-end">
              <button type="submit" className=" bg-hsl-l95 dark:bg-hsl-l20 text-hsl-l50 
            font-medium px-4 py-2 border-none outline-none rounded-md hover:bg-mb-pink hover:dark:bg-mb-yellow hover:text-hsl-l100">
                Submit
              </button>
            </div>
          </form>
        </div>
      </main>
    </LayoutDefault>
  );
}