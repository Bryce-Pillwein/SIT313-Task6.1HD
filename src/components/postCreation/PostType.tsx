// Post Type tsx

import { usePostContext } from "../providers/PostProvider";

const PostType = () => {
  const { content, updatePostType } = usePostContext();

  return (
    <div className="flex justify-between items-center">
      <p className="text-hsl-l50 text-sm">Post Type</p>
      <div className="flex gap-4 items-center">
        {/* Question Type */}
        <div onClick={() => updatePostType('question')}
          className={`group cursor-pointer border border-hsl-l90 dark:border-hsl-l25 bg-hsl-l95 dark:bg-hsl-l20 hover:bg-mb-pink hover:dark:bg-mb-yellow rounded-md px-2 py-1  ${content.postType === 'question' && ' border-mb-pink dark:border-mb-yellow'}`}>
          <p className={`group-hover:text-hsl-l98 text-sm ${content.postType === 'question' ? 'text-hsl-l20 dark:text-hsl-l80' : 'text-hsl-l50'}`}>Question</p>
        </div>
        {/* Article Type */}
        <div onClick={() => updatePostType('article')}
          className={`group cursor-pointer border border-hsl-l90 dark:border-hsl-l25 bg-hsl-l95 dark:bg-hsl-l20 hover:bg-mb-pink hover:dark:bg-mb-yellow rounded-md px-2 py-1  ${content.postType === 'article' && ' border-mb-pink dark:border-mb-yellow'}`}>
          <p className={`group-hover:text-hsl-l98 text-sm ${content.postType === 'article' ? 'text-hsl-l20 dark:text-hsl-l80' : 'text-hsl-l50'}`}>Article</p>
        </div>
      </div>
    </div>
  );
}

export default PostType;