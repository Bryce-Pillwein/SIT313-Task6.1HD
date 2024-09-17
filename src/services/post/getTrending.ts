import { db } from "@/firebaseConfig";
import { Post } from "@/types/Post";
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";

export default async function getTrending(): Promise<Post[] | null> {
  try {
    // Fetch trending post IDs
    const trendingDocRef = doc(db, 'TRENDING', 'current');
    const trendingDocSnap = await getDoc(trendingDocRef);
    if (!trendingDocSnap.exists()) return null;

    const trendingData = trendingDocSnap.data();
    const postIds: string[] = trendingData?.postIds || [];
    if (postIds.length === 0) return null;

    // Fetch posts data
    const postsCollection = collection(db, 'POST');
    const postsQuery = query(postsCollection, where('postId', 'in', postIds));

    const postsSnapshot = await getDocs(postsQuery);

    // Cast the data to Post type
    const posts: Post[] = postsSnapshot.docs.map(doc => doc.data() as Post);

    return posts.length ? posts : null;

  } catch (error) {
    console.error("Error fetching trending posts:", error);
    throw error;
  }
}
