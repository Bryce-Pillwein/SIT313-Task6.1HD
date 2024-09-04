import { collection, getDocs, query, where, orderBy, startAt, endAt } from "firebase/firestore";
import { db } from "@/firebaseConfig";

/**
 * Get Contributions grouped by day.
 * @returns An object where the keys are dates (YYYY-MM-DD) and the values are the number of contributions on that date.
 */
export default async function getContributions(uid: string) {
  const now = new Date();
  const startDate = new Date(now.getFullYear(), 0, 1); // January 1st of current year
  const endDate = new Date(now.getFullYear(), 11, 31); // December 31st of current year

  const collections = ["POST_QUESTION", "POST_ARTICLE"];
  const allDates: Date[] = [];

  // Query Firestore for both collections
  for (const collectionName of collections) {
    const postsCollection = collection(db, collectionName);
    const q = query(
      postsCollection,
      where("userId", "==", uid),
      orderBy("createdAt"),
      startAt(startDate),
      endAt(endDate)
    );

    const snapshot = await getDocs(q);

    snapshot.forEach(doc => {
      const data = doc.data();
      if (data.createdAt) {
        allDates.push(data.createdAt.toDate());
      }
    });
  }

  // Group the dates by day and count the occurrences
  const counts: { [key: string]: number } = {};
  allDates.forEach(date => {
    const day = date.toISOString().split('T')[0]; // Format as YYYY-MM-DD
    counts[day] = (counts[day] || 0) + 1;
  });

  // Convert the counts object into an array of { date, count } objects
  const result = Object.entries(counts).map(([date, count]) => ({
    date: date.replace(/-/g, '/'), // Replace '-' with '/' to match the desired format YYYY/MM/DD
    count,
  }));


  return result;
};
