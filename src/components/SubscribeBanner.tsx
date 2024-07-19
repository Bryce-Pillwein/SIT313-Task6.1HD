// Subscribe tsx

"use client";

import { useState } from "react";
import { useNotification } from "./providers/NotificationProvider";

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
    <form className="w-full flex flex-wrap flex-col mb:flex-row items-center justify-end my-8 gap-2" onSubmit={sendWelcomeEmail}>
      <p className="text-hsl-l70">Sign up for our daily insider!</p>

      <input type="name" name="name" className="inputField max-w-[150px]" placeholder="Name"
        value={userName} onChange={e => setUserName(e.target.value)} />

      <input type="email" name="email" className="inputField max-w-[150px]" placeholder="Email"
        value={email} onChange={e => setEmail(e.target.value)} />

      <button className="btn" type="submit">Subscribe</button>
    </form>
  )
};

export default SubscribeBanner;
