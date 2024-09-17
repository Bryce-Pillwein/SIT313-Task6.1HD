// Post Interactions tsx

"use client"

import { addReaction, getUserReactionsToPost, removeReaction } from "@/services";
import IconInteraction from "../icons/IconInteraction";
import { useEffect, useState } from "react";
import { useAuth } from "../providers/AuthProvider";
import { useNotification } from "../providers/NotificationProvider";


interface PostInteractionsProps {
  layout: string;
  postId: string;
}

const PostInteractions: React.FC<PostInteractionsProps> = ({ layout, postId }) => {
  const { user, loading } = useAuth();
  const { addNotification } = useNotification();
  const [reactions, setReactions] = useState({ like: false, dislike: false, heart: false })
  const size = layout === 'vert' ? 26 : 32;

  /**
   * Get Existing Reactions
   */
  useEffect(() => {
    if (user?.uid) {
      const getReactions = async () => {
        try {
          const reacts = await getUserReactionsToPost(postId, user.uid);
          setReactions(reacts);
        } catch (error) {
          console.error(error);
        }
      }
      getReactions();
    }
  }, [user, postId]);

  /**
   * Handle Reaction
   * @param reaction 
   */
  const handleReaction = async (reaction: 'like' | 'dislike' | 'heart') => {
    try {
      if (reactions[reaction]) {
        // If the reaction is already active, remove it
        await removeReaction(postId, reaction);
        setReactions(prevReactions => ({
          ...prevReactions,
          [reaction]: false
        }));
      } else {
        // If the reaction is not active, add it
        await addReaction(postId, reaction);
        setReactions(prevReactions => ({
          ...prevReactions,
          [reaction]: true
        }));
      }
    } catch (error) {
      console.error(error);
    }
  };

  /**
   * Handle Flag
   */
  const handleFlag = () => {
    addNotification('Post flagged for review');
  }

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
          className={` hover:fill-cyan-400 hover:dark:fill-cyan-600
        ${reactions.like ? 'fill-cyan-500' : 'fill-hsl-l80 dark:fill-hsl-l20'}`} />
      </div>
      <div onClick={() => handleReaction('dislike')}>
        <IconInteraction type="dislike" size={size}
          className={` hover:fill-orange-400 hover:dark:fill-orange-600
        ${reactions.dislike ? 'fill-orange-500' : 'fill-hsl-l80 dark:fill-hsl-l20'}`} />
      </div>
      <div onClick={() => handleReaction('heart')}>
        <IconInteraction type="heart" size={size}
          className={`hover:fill-pink-500 hover:dark:fill-pink-600
        ${reactions.heart ? 'fill-pink-500' : 'fill-hsl-l80 dark:fill-hsl-l20'}`} />
      </div>
      <div onClick={handleFlag}>
        <IconInteraction type="flag" size={size}
          className={`fill-hsl-l80 dark:fill-hsl-l20 hover:fill-red-500 hover:dark:fill-red-700`} />
      </div>
    </div>
  );
};

export default PostInteractions;