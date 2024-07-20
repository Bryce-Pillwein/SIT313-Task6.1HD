import { Timestamp } from "firebase/firestore";


export interface Question {
  abstract: string;
  authorFirstName: string;
  authorLastName: string;
  date: Timestamp;
  image: string;
  postId: string;
  tags: string[];
  text: string;
  title: string;
  type: string;
  userId: string;
}