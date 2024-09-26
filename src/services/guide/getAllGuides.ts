import { collection, getDocs, query, DocumentData } from "firebase/firestore";
import { db } from "@/firebaseConfig";
import Guide from "@/types/Guide";

/**
 * Get All Guides
 * 
 * Retrieves all the guides from the "GUIDE" collection.
 * @returns guides
 */
export default async function getAllGuides(): Promise<Guide[]> {
  try {
    const guidesRef = collection(db, "GUIDE");
    const guidesQuery = query(guidesRef);
    const querySnapshot = await getDocs(guidesQuery);
    const guides: Guide[] = querySnapshot.docs.map(doc => doc.data() as Guide);

    return guides;
  } catch (error) {
    throw error
  }
}
