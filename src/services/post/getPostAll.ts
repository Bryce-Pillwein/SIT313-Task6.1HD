import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "@/firebaseConfig";


/**
 * Get Post All
 * @param type type of posts to get (questions / articles)
 * @returns 
 */
export default async function getPostAll(type: string): Promise<any[] | null> {
  try {
    const postsRef = collection(db, type);
    const q = query(postsRef, orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return null;
    }

    const posts = querySnapshot.docs.map(doc => doc.data());

    return posts;
  } catch (error) {
    throw error;
  }
}