// components/Notification.tsx

import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface NotificationProps {
  message: string;
  duration?: number;
  onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({ message, duration = 5000, onClose }) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    setIsVisible(true);

    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => {
        onClose();
      }, 300); // Duration of animation
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return createPortal(
    <div className={`notification ${isVisible ? 'show' : null}`}>
      {message}
    </div>,
    document.body
  );
};

export default Notification;
