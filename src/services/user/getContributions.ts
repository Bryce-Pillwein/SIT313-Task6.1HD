import { collection, getDocs, query, where, orderBy, startAt, endAt } from "firebase/firestore";
import { db } from "@/firebaseConfig";

/**
 * Get Contributions grouped by day from the unified 'POST' collection.
 * @param uid The user ID to filter contributions
 * @returns An array of objects where each object contains a date (formatted as YYYY/MM/DD) and the count of contributions on that date.
 */
export default async function getContributions(uid: string) {
  const now = new Date();
  const startDate = new Date(now.getFullYear(), 0, 1); // January 1st of the current year
  const endDate = new Date(now.getFullYear(), 11, 31); // December 31st of the current year

  const allDates: Date[] = [];

  const postsCollection = collection(db, 'POST');
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

  // Group the dates by day and count the occurrences
  const counts: { [key: string]: number } = {};
  allDates.forEach(date => {
    const day = date.toISOString().split('T')[0]; // Format as YYYY-MM-DD
    counts[day] = (counts[day] || 0) + 1;
  });

  // Convert the counts object into an array of { date, count } objects
  const result = Object.entries(counts).map(([date, count]) => ({
    date: date.replace(/-/g, '/'), // Replace '-' with '/' to match the format YYYY/MM/DD
    count,
  }));

  return result;
}
