// Post Banner tsx

import Link from "next/link";
// Componenets
import IconGeneral from "../icons/IconGeneral";
// Types
import { Post } from "@/types/Post";

interface PostBannerProps {
  pd: Post; // Post Data
}

const PostBanner: React.FC<PostBannerProps> = ({ pd }) => {

  return (
    <div className="bg-hsl-l100 dark:bg-hsl-l15 rounded-lg shadow-md overflow-hidden w-full max-w-full mx-auto">
      <Link href={`/question/${pd.postId}`}>
        <div className="flex justify-between items-center p-4">
          <div>
            <h2 className="font-bold truncate">{pd.title}</h2>
            <div className="flex items-center gap-x-2">
              <p className="text-sm text-hsl-l50">{pd.authorFirstName} {pd.authorLastName} &#x2022; {pd.date} &#x2022;</p>
              {pd.tags?.map((tag, idx) => (
                <p key={idx} className=" text-hsl-l50 text-xs">{tag}</p>
              ))}
            </div>
          </div>

          <div className="flex justify-center items-center text-sm">
            See Post
            <IconGeneral type="arrow-right" size={18} />
          </div>
        </div>
      </Link>
    </div>
  );
}

export default PostBanner;