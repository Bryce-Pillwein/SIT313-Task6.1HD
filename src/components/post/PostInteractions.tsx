// Post Interactions tsx

"use client"

import { addReaction, getUserReactionsToPost, removeReaction } from "@/services";
import IconInteraction from "../icons/IconInteraction";
import { useEffect, useState } from "react";
import { useAuth } from "../providers/AuthProvider";


interface PostInteractionsProps {
  layout: string;
  postId: string;
  postType: string;
}

const PostInteractions: React.FC<PostInteractionsProps> = ({ layout, postId, postType }) => {
  const { user, loading } = useAuth();
  const [reactions, setReactions] = useState({ like: false, dislike: false, heart: false })
  const size = layout === 'vert' ? 26 : 32;

  /**
   * Get Existing Reactions
   */
  useEffect(() => {
    if (user) {
      const getReactions = async () => {
        try {
          const reacts = await getUserReactionsToPost(postId, postType, user.uid);
          setReactions(reacts);
        } catch (error) {
          console.error(error);
        }
      }
      getReactions();
    }
  }, [user]);

  /**
   * Handle Reaction
   * @param reaction 
   */
  const handleReaction = async (reaction: 'like' | 'dislike' | 'heart') => {
    try {
      if (reactions[reaction]) {
        // If the reaction is already active, remove it
        await removeReaction(postId, postType, reaction);
        setReactions(prevReactions => ({
          ...prevReactions,
          [reaction]: false
        }));
      } else {
        // If the reaction is not active, add it
        await addReaction(postId, postType, reaction);
        setReactions(prevReactions => ({
          ...prevReactions,
          [reaction]: true
        }));
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      className={`flex   gap-y-4 h-min rounded-lg   
       ${layout === 'vert'
          ?
          'sticky top-4 bg-hsl-l100 dark:bg-hsl-l15 border border-hsl-l90 dark:border-hsl-l25 h-min flex-col px-2 py-5'
          :
          'justify-evenly'}`}>

      <div onClick={() => handleReaction('like')}>
        <IconInteraction type="like" size={size}
          className={`fill-hsl-l80 dark:fill-hsl-l20 hover:fill-cyan-400 hover:dark:fill-cyan-600
        ${reactions.like && 'fill-cyan-500'}`} />
      </div>
      <div onClick={() => handleReaction('dislike')}>
        <IconInteraction type="dislike" size={size}
          className={`fill-hsl-l80 dark:fill-hsl-l20 hover:fill-orange-400 hover:dark:fill-orange-600
        ${reactions.dislike && 'fill-orange-500'}`} />
      </div>
      <div onClick={() => handleReaction('heart')}>
        <IconInteraction type="heart" size={size}
          className={`fill-hsl-l80 dark:fill-hsl-l20 hover:fill-pink-500 hover:dark:fill-pink-600
        ${reactions.heart && 'fill-pink-500'}`} />
      </div>
      <div onClick={() => { }}>
        <IconInteraction type="flag" size={size}
          className={`fill-hsl-l80 dark:fill-hsl-l20 hover:fill-red-500 hover:dark:fill-red-700`} />
      </div>
    </div>
  );
};

export default PostInteractions;