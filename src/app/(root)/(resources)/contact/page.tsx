// Contact Page tsx

"use client";

import { useEffect, useState } from "react";
import Header from "@/components/layout/Header";
import { useNotification } from "@/components/providers/NotificationProvider";
import { setEnquiry } from "@/services";

const campusLocations: { [key: string]: string } = {
  'Burwood': "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12602.201322028603!2d145.10537511204743!3d-37.84741170147097!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad640592c2ddceb%3A0x805bd52f251bd12!2sDeakin%20University%20Melbourne%20Burwood%20Campus!5e0!3m2!1sen!2sau!4v1725604903173!5m2!1sen!2sau",
  'Warrnambool': "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3127.1894916485567!2d142.53587867662603!3d-38.390867467241755!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6acd4c5b38bb79f5%3A0xee73f3c99797e9dc!2sDeakin%20University%20Warrnambool%20Campus!5e0!3m2!1sen!2sau!4v1725604244513!5m2!1sen!2sau",
  'Geelong': "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3137.824590162734!2d144.35888699646713!3d-38.144271524195524!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad416a799c65955%3A0xaad0dbc4be9bbd78!2sDeakin%20University%20Geelong%20Waterfront%20Campus!5e0!3m2!1sen!2sau!4v1725604819539!5m2!1sen!2sau",
  'WaurnPonds': "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d6271.006129055048!2d144.30011947196658!3d-38.19821572559514!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad413298609d90f%3A0xc0f7d39b2ebe86b2!2sDeakin%20University!5e0!3m2!1sen!2sau!4v1725604856938!5m2!1sen!2sau"
}

const locationData = [
  { loc: 'Burwood Campus', link: 'https://maps.app.goo.gl/riz3y3wawkr8d7PL7', label: '221 Burwood Highway<br />Burwood, Victoria 3125', id: 'Burwood' },
  { loc: 'Waurn Ponds Campus', link: 'https://maps.app.goo.gl/4kXg4neJYYhB47hn7', label: '75 Pigdons Road<br /> Waurn Ponds, Victoria 3216', id: 'WaurnPonds' },
  { loc: 'Geelong Campus', link: 'https://maps.app.goo.gl/Gof8T3b434Lgt1T76', label: '1 Gheringhap Street<br />Geelong, Victoria 3220', id: 'Geelong' },
  { loc: 'Warrnambool Campus', link: 'https://maps.app.goo.gl/udgnhPKoayfaaVJC7', label: 'Princes Highway<br />Warrnambool, Victoria 3280', id: 'Warrnambool' }
]


export default function ContactPage() {
  const { addNotification } = useNotification();
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [currentMapLocation, setCurrentMapLocation] = useState<string>('Burwood');

  /**
   * AI Chat Bot
   */
  useEffect(() => {
    // Load the chatbot
    const script = document.createElement('script');
    script.src = 'https://cdn.botpress.cloud/webchat/v1/inject.js';
    document.body.appendChild(script);

    script.onload = () => {
      // Load second script after the first one
      const script2 = document.createElement('script');
      script2.src = 'https://mediafiles.botpress.cloud/68557262-3f3f-46ee-a300-9d66a9ed2128/webchat/config.js';
      document.body.appendChild(script2);
    };

    // Cleanup function
    return () => {
      // Query all elements with the same id or class
      const widgetContainers = document.querySelectorAll('#bp-web-widget-container');
      widgetContainers.forEach((widget) => widget.remove());

      // Remove the injected scripts
      const injectedScript = document.getElementById('bp-web-widget-script');
      if (injectedScript) {
        injectedScript.remove();
      }

      const configScript = document.getElementById('bp-web-widget-config');
      if (configScript) {
        configScript.remove();
      }
    };
  }, []);

  /**
   * Handle Send Enquiry
   */
  const handleSendEnquiry = async () => {
    try {
      if (name.trim().length <= 0 || message.trim().length <= 0) {
        addNotification('Fields cannot be empty');
        return;
      }
      const response = await setEnquiry(name, email, message);
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
    <div>
      <Header />
      <main className="app-container grid grid-cols-2 py-20">
        {/* CTA Contact Message */}
        <div className="col-span-1">


          <h1 className="text-6xl font-sdisplay mb-16">Contact Us</h1>
          <p className="text-2xl">Have a <u>question</u>? See something we can <u>improve</u>? Don&#39;t hesitate to send us a <u>message!</u> </p>
          <p className="text-sm text-hsl-l70 dark:text-hsl-l30">Need a quick reply? Talk to Devbot in the bottom right corner for assistence</p>
        </div>

        {/* CTA Contact Form */}
        <form onSubmit={handleSendEnquiry}
          className="col-span-1 flex flex-col justify-center bg-hsl-l100 dark:bg-hsl-l15 w-full md:w-[80%] rounded-lg shadow-md mx-auto px-4 py-4">
          <h3 className="font-medium text-xl">General Enquiry</h3>
          <label htmlFor="name" className="text-hsl-l50 text-sm mt-4">Name</label>
          <input id="name" name="name" type="text" className="df-input" autoComplete="off" required
            value={name} onChange={(e) => setName(e.target.value)} />

          <label htmlFor="email" className="text-hsl-l50 text-sm mt-4">Email</label>
          <input id="email" name="email" type="email" className="df-input" autoComplete="off" required
            value={email} onChange={(e) => setEmail(e.target.value)} />

          <label htmlFor="message" className="text-hsl-l50 text-sm mt-4">Message</label>
          <textarea id="message" name="message" className="df-input input-resize-content" rows={3}
            value={message} onChange={(e) => setMessage(e.target.value)}></textarea>

          <div className="flex justify-end mt-6">
            <button type="submit"
              className=" bg-hsl-l95 dark:bg-hsl-l20 text-hsl-l50 font-medium px-5 py-2 rounded-md hover:bg-mb-pink hover:dark:bg-mb-yellow hover:text-hsl-l100">
              Send Message</button>
          </div>
        </form>
      </main>


      {/* Google Campus Map */}
      <div className="bg-[#163935] py-4">
        <div className="app-container flex gap-x-16">
          <iframe src={campusLocations[currentMapLocation]} width="500" height="350" style={{ border: 0 }}
            allowFullScreen={false} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>

          <div className="h-full">
            <h3 className="text-2xl text-white mb-4">Campus Locations</h3>
            <div className="grid grid-cols-2 grid-rows-2 gap-8">
              {locationData.map((campus, idx) => (
                <div key={idx} onClick={() => setCurrentMapLocation(campus.id)}
                  className={`cursor-pointer p-4 rounded-md shadow-sm
                  ${currentMapLocation === campus.id ? 'bg-mb-pink dark:bg-mb-yellow border-mb-yellow' : 'bg-[#245f58]'}`}>
                  <p className="text-center text-sm font-medium text-hsl-l100">{campus.loc}</p>
                  <address dangerouslySetInnerHTML={{ __html: campus.label }} className="text-sm text-center text-hsl-l90"></address>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="app-container py-20">
        <h2 className="text-3xl mb-4">Other Enquiries</h2>
        <div className="flex justify-between">
          <div>
            <h3 className="text-xl">General</h3>
            <p>Call: 03 9244 6333</p>
            <p>Email: devs@deakin.edu.au</p>
          </div>

          <div>
            <h3 className="text-xl">Security</h3>
            <p>Call: ext 222</p>
            <p>or 1800 062 579</p>
          </div>

          <div>
            <h3 className="text-xl">Research</h3>
            <p>Call: 03 5227 2673</p>
            <p>Email: research@deakin.edu.au</p>
          </div>
        </div>
      </div>
    </div>
  );
}