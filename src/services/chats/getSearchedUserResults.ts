import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/firebaseConfig";
import { User } from "@/types/User";

/**
 * Get Searched User
 * @param term The search term to match against users' first names.
 * @returns A promise that resolves to an array of users matching the search term.
 */
export default async function getSearchedUserResults(term: string): Promise<User[]> {
  try {
    if (!term.trim()) return [];

    const normalizedTerm = term.toLowerCase().replace(/\s+/g, '');

    const usersRef = collection(db, 'USERS');

    const q = query(usersRef, where('fullName', '>=', normalizedTerm), where('fullName', '<=', normalizedTerm + '\uf8ff'));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) return [];

    const fetchedUsers: User[] = querySnapshot.docs.map(doc => doc.data() as User);

    return fetchedUsers;
  } catch (error) {
    throw error;
  }
}