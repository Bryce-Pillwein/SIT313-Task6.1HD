// Post Type tsx
interface PostTypeProps {
  isPostType: -1 | 1 | 2;
  setPostType: (pt: -1 | 1 | 2) => void;
}

const PostType: React.FC<PostTypeProps> = ({ isPostType, setPostType }) => {

  return (
    <div className="flex justify-between items-center">
      <p className="text-hsl-l50 text-sm">Post Type</p>
      <div className="flex gap-4 items-center">
        {/* Question Type */}
        <div onClick={() => setPostType(1)}
          className={`cursor-pointer border border-hsl-l90 bg-hsl-l95 rounded-md px-2 py-1  ${isPostType === 1 && ' border-mb-pink dark:border-mb-yellow'}`}>
          <p className={`text-sm ${isPostType === 1 ? 'text-hsl-l20 dark:text-hsl-l80' : 'text-hsl-l50'}`}>Question</p>
        </div>
        {/* Article Type */}
        <div onClick={() => setPostType(2)}
          className={`cursor-pointer border border-hsl-l90 bg-hsl-l95 rounded-md px-2 py-1  ${isPostType === 2 && ' border-mb-pink dark:border-mb-yellow'}`}>
          <p className={`text-sm ${isPostType === 2 ? 'text-hsl-l20 dark:text-hsl-l80' : 'text-hsl-l50'}`}>Article</p>
        </div>
      </div>
    </div>
  );
}

export default PostType;