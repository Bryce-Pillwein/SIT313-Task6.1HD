import { Timestamp } from "firebase/firestore";


export interface Post {
  postId: string;
  userId: string;
  authorFirstName: string;
  authorLastName: string;
  createdAt: Timestamp;
  date: any;
  title: string;
  imageURL: string;
  contentURLs: { type: 'markdown' | 'code'; url: string }[];
  tags: string[];
  postType: string;
  searchFields?: {
    title_lowercase: string;
    authorFirstName_lowercase: string;
    authorLastName_lowercase: string;
    tags_lowercase: string[];
    date_lowercase: string;
  };
}