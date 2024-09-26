import { Timestamp } from "firebase/firestore";


export default interface Guide {
  postId: string;
  userId: string;
  title: string;
  authorFirstName: string;
  authorLastName: string;
  createdAt: Timestamp;
  date: string;
  descriptionURL: string;
  videoURL: string;
  searchFields?: {
    authorFirstName_lowercase: string;
    authorLastName_lowercase: string;
    date_lowercase: string;
    title_lowercase: string;
  }
}