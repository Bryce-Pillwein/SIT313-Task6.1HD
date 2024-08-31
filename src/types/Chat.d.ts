/**
 * Chat
 */

export interface Participant {
  uid: string;
  firstName: string;
  lastName: string;
  fullName: string;
}

export interface LastMessage {
  senderId: string;
  message: string;
  sentAt: {
    seconds: number;
    nanoseconds: number;
  };
}

interface Message {
  id?: string;
  message: string;
  senderId: string;
  sentAt: {
    seconds: number;
    nanoseconds: number;
  };
}

export interface Chat {
  chatId: string;
  participants: Participant[];
  lastMessage: LastMessage;
  createdAt: {
    seconds: number;
    nanoseconds: number;
  };
}
