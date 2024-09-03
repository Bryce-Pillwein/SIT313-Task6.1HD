// Post Comment Section tsx

import { useEffect, useRef, useState } from "react";
import IconGeneral from "../icons/IconGeneral";
import { useNotification } from "../providers/NotificationProvider";
import ProfilePicture from "../ui/ProfilePicture";
import { deletePostComment, getPostComments, reportPostComment, setPostComment } from "@/services";
import { PostComment } from "@/types/PostComment";
import { useAuth } from "../providers/AuthProvider";

interface PostCommentSectionProps {
  postId: string;
  dbPath: string;
  updateCommentTotal: (commentNumber: number) => void;
}

const PostCommentSection: React.FC<PostCommentSectionProps> = ({ postId, dbPath, updateCommentTotal }) => {
  const { user, loading } = useAuth();
  const { addNotification } = useNotification();
  const [comments, setComments] = useState<PostComment[]>([]);
  const [input, setInput] = useState<string>('');
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const dropdownRefs = useRef<(HTMLDivElement | null)[]>([]);

  /**
   * Load Existing Comments
   */
  useEffect(() => {
    if (postId && dbPath) {
      const fetchCommentData = async () => {
        const commentSection = await getPostComments(postId, dbPath);
        setComments(commentSection);
        updateCommentTotal(commentSection.length);
      }
      fetchCommentData();
    }
  }, [postId, dbPath, updateCommentTotal])

  /**
    * Handle Click Outside Dropdown
    */
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!dropdownRefs.current.some(ref => ref && ref.contains(event.target as Node))) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  /**
   * Handle Post Comment
   */
  const handlePostComment = async () => {
    const inputValue = input.trim();

    if (inputValue.length <= 0) {
      return;
    }

    try {
      const status = await setPostComment(postId, dbPath, inputValue);
      if (!status.success) {
        addNotification(status.message!);
        return;
      }

      // Fetch new comments after posting
      /*  For our small web app, re-fetching data is not as issue.
          However, we could instead just update the DOM (append our post to array) instead
          of re-qeurying the databse */
      const commentSection = await getPostComments(postId, dbPath);
      setComments(commentSection);
      setInput('');
    } catch (error) {
      console.error(error);
      addNotification('Error Posting Comment');
    }
  };

  /**
   * Toggle Dropdown
   */
  const toggleDropdown = (idx: number) => {
    setOpenDropdown(openDropdown === idx ? null : idx);
  };

  /**
   * Handle Delete Comment
   * @param commentId 
   * @returns 
   */
  const handleDeleteComment = async (commentId: string) => {
    try {
      await deletePostComment(postId, dbPath, commentId);
      // Remove deleted comment from the state
      setComments(comments.filter(comment => comment.commentId !== commentId));
      addNotification('Deleted Comment');
    } catch (error) {
      console.error('Error deleting comment:', error);
      addNotification('Error Deleting Comment');
    }
  };

  /**
   * Handle Report Comment
   * @param commentId id of comment
   * @returns 
   */
  const handleReportComment = async (commentId: string) => {
    try {
      const status = await reportPostComment(commentId);
      if (!status.success) {
        addNotification(status.message!);
        return;
      }

      addNotification('Report Submitted');
    } catch (error) {
      console.error('Error reporting comment:', error);
      addNotification('Error reporting comment');
    }
  };

  return (
    <div>
      <h3 className="text-xl font-medium mb-4">Comments</h3>

      {/* Input Comment Text Area */}
      <div className="flex gap-2">
        <ProfilePicture size='50' />
        <textarea id='comment-section' autoComplete="off"
          className="input-resize-content df-input w-full min-h-[3lh] max-h-[7lh] "
          value={input} onChange={(event) => setInput(event.target.value)} />
      </div>

      {/* Post Comment Send Button */}
      <div className="flex justify-end items-center mt-2">
        <button type="button" onClick={handlePostComment}
          className="flex items-center gap-1 py-1 px-2 text-sm bg-[#1da1f2] hover:bg-[#119bf0] dark:bg-[#283f4d] dark:hover:bg-[#2e4959] rounded-lg text-white">
          Send
          <IconGeneral type="send" className="fill-white" />
        </button>
      </div>

      {/* Existing Comments  */}
      {comments.map((comment, idx) => (
        <div key={idx} className="flex gap-2 my-8">
          <ProfilePicture size="30" />
          <div className="w-full border border-hsl-l90 dark:border-hsl-l20 rounded px-2 py-1">
            <div className="flex justify-between items-center">
              <p className="text-hsl-l50 text-sm">{comment.firstName} {comment.lastName} &#x2022; {comment.date}</p>

              {/* Dropdown Post Menu */}
              <div className="relative">
                <button type="button" className="hover:bg-hsl-l95 hover:dark:bg-hsl-l20 rounded-full"
                  onClick={() => toggleDropdown(idx)} >
                  <IconGeneral type="menu-more-horiz" size={28} className="fill-hsl-l70 dark:fill-hsl-l30" />
                </button>

                {/* Dropdown Menu */}
                {openDropdown === idx && (
                  <div className="absolute right-0 min-w-24 bg-hsl-l98 dark:bg-hsl-l25 border border-hsl-l85 dark:border-hsl-l30 rounded shadow-lg z-50"
                    ref={ref => { if (ref) dropdownRefs.current[idx] = ref; }}>
                    {/* Delete Comment */}
                    {user?.uid === comment.uid && (
                      <div className="px-4 py-2 text-sm hover:bg-hsl-l100 dark:hover:bg-hsl-l30 cursor-pointer rounded pointer-events-auto"
                        onClick={() => handleDeleteComment(comment.commentId)}>Delete</div>
                    )}
                    {/* Report Comment */}
                    <div className="px-4 py-2 text-sm hover:bg-hsl-l100 dark:hover:bg-hsl-l30 cursor-pointer rounded"
                      onClick={() => { handleReportComment(comment.commentId) }}>Report</div>
                  </div>
                )}
              </div>
            </div>

            <p>{comment.comment}</p>
          </div>
        </div>
      ))}


    </div>
  );
}

export default PostCommentSection;