// Post Type tsx

import { usePostContext } from "../providers/PostProvider";

const PostType = () => {
  const { content, updatePostType } = usePostContext();

  return (
    <div className="flex justify-between items-center">
      <p className="text-hsl-l50 text-sm">Post Type</p>
      <div className="flex gap-4 items-center">
        {/* Question Type */}
        <div onClick={() => updatePostType(1)}
          className={`cursor-pointer border border-hsl-l90 dark:border-hsl-l25 bg-hsl-l95 dark:bg-hsl-l20 rounded-md px-2 py-1  ${content.postType === 1 && ' border-mb-pink dark:border-mb-yellow'}`}>
          <p className={`text-sm ${content.postType === 1 ? 'text-hsl-l20 dark:text-hsl-l80' : 'text-hsl-l50'}`}>Question</p>
        </div>
        {/* Article Type */}
        <div onClick={() => updatePostType(2)}
          className={`cursor-pointer border border-hsl-l90 dark:border-hsl-l25 bg-hsl-l95 dark:bg-hsl-l20  rounded-md px-2 py-1  ${content.postType === 2 && ' border-mb-pink dark:border-mb-yellow'}`}>
          <p className={`text-sm ${content.postType === 2 ? 'text-hsl-l20 dark:text-hsl-l80' : 'text-hsl-l50'}`}>Article</p>
        </div>
      </div>
    </div>
  );
}

export default PostType;