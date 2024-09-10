import { db, } from "@/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

type ReactionType = 'like' | 'dislike' | 'heart';

interface UserReactions {
  like: boolean;
  dislike: boolean;
  heart: boolean;
}

export default async function getUserReactionsToPost(postId: string, postType: string, userId: string): Promise<UserReactions> {
  try {
    // Initialize the reaction object with default values
    const userReactions: UserReactions = {
      like: false,
      dislike: false,
      heart: false,
    };

    // Define the reaction types to check
    const reactionTypes: ReactionType[] = ['like', 'dislike', 'heart'];

    const postPath = postType === 'question' ? 'POST_QUESTION' : 'POST_ARTICLE';


    // Iterate over each reaction type and check if the user ID is present
    for (const type of reactionTypes) {
      const reactionRef = doc(db, postPath, postId, 'reactions', type);
      const reactionDoc = await getDoc(reactionRef);

      if (reactionDoc.exists()) {
        const data = reactionDoc.data();
        const userIds: string[] = data.userIds || [];
        // Check if userId is in the userIds array
        if (userIds.includes(userId)) {
          userReactions[type] = true;
        }
      }
    }

    return userReactions;
  } catch (error) {
    console.error("Error getting user reactions: ", error);
    return {
      like: false,
      dislike: false,
      heart: false
    };
  }
}
