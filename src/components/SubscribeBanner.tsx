// Subscribe Banner tsx

"use client";

import { useState } from "react";
import { useNotification } from "./providers/NotificationProvider";
import IconGeneral from "./icons/IconGeneral";
import { setSubscriber } from "@/services";

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

    const validName: string = userName.trim();
    const validEmail: string = email.trim();
    // Reset Values
    setUserName('');
    setEmail('');

    // Validate input
    if (!validName || validName.length <= 0 || !validEmail || validEmail.length <= 0) {
      addNotification('Enter name and email');
      return;
    }

    try {
      // Add Email to database
      const status = await setSubscriber(validName, validEmail);
      if (!status.success) {
        addNotification(status.message!);
        return;
      }

      // Send Email API
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: validName, email: validEmail }),
      });

      // Handle Response Error
      if (!response.ok) {
        const errorData = await response.json();
        addNotification('Error sending email. Try Again Later');
        console.error(errorData.message)
        return;
      }

      const data = await response.json();
      console.log("Response", data);
      addNotification('Welcome! Email added');
    } catch (error) {
      addNotification('Error. Try again');
      console.error(error);
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
          <IconGeneral type="arrow-right" className="fill-mb-yellow dark:fill-mb-yellow" />
        </button>
      </div>
    </form>
  )
};

export default SubscribeBanner;
