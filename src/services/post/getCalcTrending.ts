import { collection, query, orderBy, limit, getDocs, doc, getDoc, Timestamp } from "firebase/firestore";
import { db } from "@/firebaseConfig";
import { Post } from "@/types/Post";

interface ReactionData {
  timestamp: Timestamp;
  type: string;
  userIds: string[];
}


/**
 * Helper to count user interactions (hearts, likes, dislikes) from a subcollection.
 */
const getReactionCount = async (postRef: any, reactionType: string): Promise<number> => {
  try {
    const reactionDoc = await getDoc(doc(collection(postRef, 'reactions'), reactionType));
    if (reactionDoc.exists()) {
      const reactionData = reactionDoc.data();
      return reactionData.userIds ? reactionData.userIds.length : 0;
    }
  } catch (error) {
    console.error(`Error fetching ${reactionType} count:`, error);
  }
  return 0;
};

/**
 * Set and get trending posts from POST_QUESTION and POST_ARTICLE collections.
 */
export default async function getCalcTrending(): Promise<Post[]> {
  try {
    // Fetch posts from POST_QUESTION and POST_ARTICLE collections
    const postsQuestionQuery = query(collection(db, 'POST_QUESTION'), orderBy('createdAt', 'desc'), limit(100));
    const postsArticleQuery = query(collection(db, 'POST_ARTICLE'), orderBy('createdAt', 'desc'), limit(100));

    const [postsQuestionSnapshot, postsArticleSnapshot] = await Promise.all([
      getDocs(postsQuestionQuery),
      getDocs(postsArticleQuery),
    ]);

    const postsWithScores: Array<any> = [];

    // Helper to process each post snapshot
    const processPostSnapshot = async (snapshot: any) => {
      for (const postDoc of snapshot.docs) {
        const postData = postDoc.data();
        const postRef = postDoc.ref;

        // Fetch comments count
        const commentsSnapshot = await getDocs(collection(postRef, 'comments'));
        const commentsCount = commentsSnapshot.size;

        // Fetch reactions (hearts, likes, dislikes) in parallel
        const [heartsCount, likesCount, dislikesCount] = await Promise.all([
          getReactionCount(postRef, 'heart'),
          getReactionCount(postRef, 'like'),
          getReactionCount(postRef, 'dislike'),
        ]);

        // Calculate score based on interactions
        const score = (likesCount * 1) - (dislikesCount * 0.5) + (heartsCount * 2) + commentsCount;

        // Add post data and score to array
        postsWithScores.push({ ...postData, score });
      }
    };

    // Process posts from both question and article snapshots
    await Promise.all([processPostSnapshot(postsQuestionSnapshot), processPostSnapshot(postsArticleSnapshot)]);

    // Sort posts by score and return top 10 trending posts
    return postsWithScores.sort((a, b) => b.score - a.score).slice(0, 9);
  } catch (error) {
    throw error;
  }
}