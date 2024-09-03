import { doc, getDoc, Timestamp } from 'firebase/firestore';
import { db } from "@/firebaseConfig";
import getPost from './getPost';
import { Post } from '@/types/Post';

/**
 * Get User Post Ids
 * @param uid - The user ID
 * @returns An array of post IDs or an error status
 */
export default async function getUserPostForProfilePage(uid: string): Promise<Post[]> {
  try {
    // Get the Questions Ids
    const docRefQuestion = doc(db, 'USERS_POST_QUESTION', uid);
    const docSnapQuestion = await getDoc(docRefQuestion);

    let questionIds: string[] = [];
    if (docSnapQuestion.exists()) {
      const data = docSnapQuestion.data();
      questionIds = data?.postIds || [];
    }

    // Fetch the question posts using the IDs
    const questions = await Promise.all(
      questionIds.map(async (id) => {
        const result = await getPost(id, 'POST_QUESTION');
        if ('success' in result && !result.success) {
          console.error(result.message);
          return null;
        }
        return result as Post;
      })
    );

    // Get the Article Ids
    const docRefArticle = doc(db, 'USERS_POST_ARTICLE', uid);
    const docSnapArticle = await getDoc(docRefArticle);

    let articleIds: string[] = [];
    if (docSnapArticle.exists()) {
      const data = docSnapArticle.data();
      articleIds = data?.postIds || [];
    }

    // Fetch the article posts using the IDs
    const articles = await Promise.all(
      articleIds.map(async (id) => {
        const result = await getPost(id, 'POST_ARTICLE');
        if ('success' in result && !result.success) {
          console.error(result.message); // Log the error message
          return null; // Return null for unsuccessful posts
        }
        return result as Post;
      })
    );

    // Combine question and article posts, filter out nulls
    const posts = [...questions, ...articles].filter((post) => post !== null) as Post[];

    // Sort the posts by createdAt (descending order)
    posts.sort((a, b) => {
      const createdAtA = (a.createdAt as Timestamp).toDate();
      const createdAtB = (b.createdAt as Timestamp).toDate();
      return createdAtB.getTime() - createdAtA.getTime();
    });

    return posts;
  } catch (error) {
    throw error;
  }
}
