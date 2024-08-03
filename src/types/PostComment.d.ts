import { Timestamp } from "firebase/firestore";

/**
 * Post Comment - For commenting
 */
export interface PostComment {
  commentId: string;
  uid: string;
  firstName: string;
  lastName: string;
  createdAt: Timestamp;
  date: string;
  comment: string;
}