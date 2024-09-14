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


    // Fetch posts data from POST_ARTICLE and POST_QUESTION collections
    const postsCollection = collection(db, 'POST_ARTICLE');
    const questionsCollection = collection(db, 'POST_QUESTION');

    const postsQuery = query(postsCollection, where('postId', 'in', postIds));
    const questionsQuery = query(questionsCollection, where('postId', 'in', postIds));

    const [postsSnapshot, questionsSnapshot] = await Promise.all([
      getDocs(postsQuery),
      getDocs(questionsQuery)
    ]);

    // Directly cast the data to Post type
    const posts: Post[] = postsSnapshot.docs.map(doc => doc.data() as Post);
    const questions: Post[] = questionsSnapshot.docs.map(doc => doc.data() as Post);

    return [...posts, ...questions];

  } catch (error) {
    throw error;
  }
}