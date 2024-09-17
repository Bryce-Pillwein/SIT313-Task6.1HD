// Edit Question Page tsx

"use client";

import { useEffect, useState } from "react";

import LayoutDefault from "@/components/layout/LayoutDefault";
import { useNotification } from "@/components/providers/NotificationProvider";
import { useAuth } from "@/components/providers/AuthProvider";
import { Post } from "@/types/Post";
import { getUserPosts } from "@/services";
import { useRouter } from "next/navigation";
import { PostProvider, usePostContext } from "@/components/providers/PostProvider";
import AddTags from "@/components/postCreation/AddTags";
import { EditorComponent } from "@/types/EditorComponent";
import EditorWrapper from "@/components/postEditors/EditorWrapper";
import PaddingBlock from "@/components/ui/PaddingBlock";


function EditPostPage() {
  const router = useRouter()
  const { user, loading } = useAuth();
  const { addNotification } = useNotification();
  const [isFetchingPosts, setIsFetchingPosts] = useState<boolean>(true);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [postsQ, setPostsQ] = useState<Post[]>([]);
  const [postsA, setPostsA] = useState<Post[]>([]);
  const [postsVisible, setPostVisible] = useState<Post[]>([]);
  const { content, setContent, updateContentTags, setComponents, handleTitleChange, updatePostContent } = usePostContext();



  /**
   * Fetch All Posts
   */
  useEffect(() => {
    if (user) {
      const getAllPosts = async () => {
        try {
          const responseQ = await getUserPosts();
          if ('success' in responseQ) {
            if (!responseQ.success) {
              addNotification(responseQ.message || 'Error fetching posts');
            }
            return;
          }

          const responseA = await getUserPosts();
          if ('success' in responseA) {
            if (!responseA.success) {
              addNotification(responseA.message || 'Error fetching posts');
            }
            return;
          }

          setPostsQ(responseQ.filter((post) => post.postType === 'question'));
          setPostVisible(responseQ.filter((post) => post.postType === 'question'));
          setPostsA(responseA.filter((post) => post.postType === 'article'));
        } catch (error) {
          console.error(error);
          addNotification('Error fetching question. Reload')
        } finally {
          setIsFetchingPosts(false);
        }
      }

      getAllPosts();
    }
  }, [user, addNotification])



  /**
   * Update Active Post
   * @param post Post data
   */
  const updateActivePost = async (post: Post) => {
    console.log(post);

    // Update the post content
    const postData = { postId: post.postId, postType: post.postType, title: post.title, tags: post.tags, image: null };
    setContent(postData);
    updateContentTags(post.tags);

    // Fetch post content if contentURLs are available
    if (post?.contentURLs) {
      try {
        const components: EditorComponent[] = await Promise.all(
          post.contentURLs.map(async (contentURL: { type: string; url: string }, index: number) => {
            const response = await fetch(contentURL.url);
            const content = await response.text();
            return {
              id: `${index}-${contentURL.type}`,
              type: contentURL.type as 'markdown' | 'code',
              fileType: contentURL.type,
              content,
            };
          })
        );

        setComponents(components); // Update the components state
      } catch (error) {
        console.error('Error fetching post content:', error);
      }
    }
  };


  /**
   * Update Post Content
   * @param event React Form Event
   * @returns
   */
  const updatePost = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      setIsUploading(true);

      if (!content) {
        addNotification('Error - No question selected');
        return;
      }

      if (content.title.trim().length <= 0) {
        addNotification('Title cannot be empty');
        return;
      }

      await updatePostContent();
      router.push(`/view-post/${content.postId}?type=${content.postType}`);
    } catch (error) {
      console.error(error);
      addNotification('Error adding post. Try again later')
    } finally {
      setIsUploading(false);
    }
  }

  // Failed to get posts
  if (!isFetchingPosts && !postsQ && !postsA) {
    return (
      <div className="min-h-[60vh] flex flex-col justify-center items-center">
        <p className="text-2xl text-hsl-l50 font-medium">Error Fetching Question.</p>
        <p className="text-2xl text-hsl-l50 font-medium">Please try again later.</p>
      </div>
    )
  }

  return (
    <LayoutDefault>
      {!isUploading ? (
        <main className="pb-8">

          <div className="grid grid-cols-5 gap-x-8 gap-y-4 mt-4 ">
            {/* POST CONTENT */}
            <div className="col-span-3 bg-hsl-l100 dark:bg-hsl-l15 rounded-lg shadow-sm w-full py-4 px-4">
              {content && (
                <div>
                  <label htmlFor="title" className="text-hsl-l50 text-sm">Title</label>
                  <input type="text" id="title" name="title" className='df-input w-full' required
                    value={content.title} onChange={handleTitleChange} autoComplete="off" />
                  <PaddingBlock pad={0.5} />
                  <AddTags />
                  <PaddingBlock pad={0.75} />
                  <EditorWrapper />

                  <div className=" col-span-3 flex justify-end mt-4 md:mt-16">
                    <button type="button" onClick={updatePost}
                      className="bg-hsl-l95 dark:bg-hsl-l20 text-hsl-l50 font-medium px-4 py-2 border-none outline-none rounded-md hover:bg-mb-pink hover:dark:bg-mb-yellow hover:text-hsl-l100"
                    >Submit</button>
                  </div>
                </div>
              )}
            </div>


            {/* USERS POSTS LISTS */}
            <div className="col-span-2 bg-hsl-l100 dark:bg-hsl-l15 rounded-lg shadow-sm w-full py-4 px-4">
              {isFetchingPosts ? (
                <p className="text-center text-hsl-l50 font-medium">Fetching Posts...</p>
              ) : (
                <>
                  <div className="flex justify-around items-center mt-2">
                    <button onClick={() => setPostVisible(postsQ)}
                      className={`px-6 py-1 rounded-sm hover:bg-mb-pink-active hover:text-hsl-l100 hover:dark:bg-mb-yellow-active hover:dark:text-hsl-l5
                        ${postsVisible === postsQ ? 'bg-mb-pink text-hsl-l100 dark:bg-mb-yellow dark:text-hsl-l5' : 'bg-hsl-l95 dark:bg-hsl-l20'}`}
                    >Questions</button>
                    <button onClick={() => setPostVisible(postsA)}
                      className={`px-6 py-1 rounded-sm  hover:bg-mb-pink-active hover:text-hsl-l100 hover:dark:bg-mb-yellow-active hover:dark:text-hsl-l5
                    ${postsVisible === postsA ? 'bg-mb-pink text-hsl-l100 dark:bg-mb-yellow dark:text-hsl-l5' : 'bg-hsl-l95 dark:bg-hsl-l20'}`}
                    >Articles</button>
                  </div>

                  <div className="flex flex-col mt-4 gap-y-4 min-h-[50vh] max-h-[70vh] overflow-y-auto custom-scrollbar">
                    {postsVisible?.map((post, idx) => (
                      <div key={idx} onClick={() => updateActivePost(post)}
                        className="w-full py-2 px-2 rounded-md bg-hsl-l95 dark:bg-hsl-l20 hover:bg-hsl-90 hover:dark:bg-hsl-l25 cursor-pointer">
                        <p className="text-sm">{post.title}</p>
                      </div>
                    ))}
                  </div>
                </>
              )}

            </div>
          </div>


        </main>
      ) : (
        <div className="flex justify-center items-center min-h-[50vh]">
          <h1 className="text-hsl-l50 text-4xl font-medium">Uploading Post...</h1>
        </div>
      )}
    </LayoutDefault >
  );
}

export default function EditPostPageWithProvider() {
  return (
    <PostProvider>
      <EditPostPage />
    </PostProvider>
  )
}