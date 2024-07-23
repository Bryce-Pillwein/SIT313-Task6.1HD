import { Timestamp } from "firebase/firestore";


export interface Post {
  postId: string;
  userId: string;
  authorFirstName: string;
  authorLastName: string;
  createdAt: Timestamp;
  date?: any;
  image: string;
  title: string;
  tags: string[];
  text: string;
  abstract?: string;
}