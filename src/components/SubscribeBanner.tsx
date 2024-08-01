// Subscribe tsx

"use client";

import { useState } from "react";
import { useNotification } from "./providers/NotificationProvider";
import IconGeneral from "./icons/IconGeneral";

const SubscribeBanner = () => {
  const { addNotification } = useNotification();
  const [userName, setUserName] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  /**
   * Send Welcome Email
   * @param event Form Event Submit
   */
  const sendWelcomeEmail = async (event: React.FormEvent) => {
    event.preventDefault();

    // Validate input
    if (!userName || !email) {
      addNotification('Enter name and email');
      return;
    }

    try {
      // Send Email API
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userName, email }),
      });

      const data = await response.json();
      console.log(data);
      addNotification('Welcome! Email added');
    } catch (error) {
      addNotification('Error. Try again');
      console.error(error);
    } finally {
      // Reset Values
      setUserName('');
      setEmail('');
    }

  };



  return (
    <form className="w-full flex flex-wrap flex-col items-center my-8 gap-2" onSubmit={sendWelcomeEmail}>


      <div className="w-full flex justify-between py-2 px-2">
        <input type="name" name="name" placeholder="Write Your Name"
          className="w-full border-none outline-none bg-inherit placeholder-hsl-l70 font-mono"
          value={userName} onChange={e => setUserName(e.target.value)}
          required autoComplete="name" />
      </div>

      <div className="w-full border-b border-solid border-mb-yellow flex justify-between py-2 px-2 font-mono">
        <input type="email" name="email" placeholder="Write Your Email"
          className="w-full border-none outline-none bg-inherit placeholder-hsl-l70"
          value={email} onChange={e => setEmail(e.target.value)}
          required autoComplete="email" />
        <button type="submit">
          <IconGeneral type="arrow-right" fill={"#FFE900"} />
        </button>
      </div>

    </form>
  )
};

export default SubscribeBanner;
