import { db, auth } from "@/firebaseConfig";
import { collection, addDoc, serverTimestamp, Timestamp } from "firebase/firestore";
import { Status } from "@/types/Status";
import formatFSDate from "../util/formatFSDate";

export interface ReportData {
  userId: string;
  commentId: string;
  reportedAt: Timestamp;
  date: string;
}

/**
 * 
 * @param commentIds 
 * @returns 
 */
export default async function reportPostComment(commentId: string): Promise<Status> {
  try {
    // Enforce authenticated user
    if (!auth.currentUser) {
      return { success: false, message: 'No user detected. Login to report comments' };
    }

    const userId = auth.currentUser.uid;

    // Create report data
    const reportData: ReportData = {
      userId,
      commentId,
      reportedAt: serverTimestamp() as Timestamp,
      date: formatFSDate(new Date()),
    };

    // Reference to the reports collection
    const reportsCollectionRef = collection(db, 'REPORTS_COMMENTS');

    // Add the report to Firestore
    await addDoc(reportsCollectionRef, reportData);

    return { success: true, message: null };
  } catch (error) {
    throw error;
  }
}
