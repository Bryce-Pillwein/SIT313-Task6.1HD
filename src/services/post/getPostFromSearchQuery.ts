import { db } from "@/firebaseConfig";
import { Post } from "@/types/Post";
import { collection, getDocs, query, where } from "firebase/firestore";

/**
 * Get Post From Search Query. 
 * Uses firestore query
 * @param searchTerm 
 * @param searchType 
 * @returns array of results
 */
export default async function getPostFromSearchQuery(searchTerm: string, searchType: string) {
  try {
    const postsRef = collection(db, "POST");
    let q;

    // Convert searchTerm to lowercase for consistent comparison
    const lowerSearchTerm = searchTerm.toLowerCase();

    // Dynamically set query based on search type
    switch (searchType) {
      case "Title":
        q = query(postsRef, where("searchFields.title_lowercase", ">=", lowerSearchTerm), where("searchFields.title_lowercase", "<=", lowerSearchTerm + "\uf8ff"));
        break;
      case "Author":
        q = query(postsRef, where("searchFields.authorFirstName_lowercase", ">=", lowerSearchTerm), where("searchFields.authorFirstName_lowercase", "<=", lowerSearchTerm + "\uf8ff"));
        break;
      case "Tag":
        q = query(postsRef, where("searchFields.tags_lowercase", "array-contains", lowerSearchTerm));
        break;
      case "Date":
        q = query(postsRef, where("searchFields.date_lowercase", ">=", lowerSearchTerm));
        break;
      default:
        throw new Error("Invalid search type");
    }

    const querySnapshot = await getDocs(q);

    // Check if no documents were found
    if (querySnapshot.empty) {
      return [];
    }

    const fetchedPosts = querySnapshot.docs.map(doc => doc.data() as Post);

    return fetchedPosts;
  } catch (error) {
    throw error;
  }
}
