// Card Question tsx

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
// Componenets
import IconGeneral from "../icons/IconGeneral";
// Types
import { Post } from "@/types/Post";
import dynamic from "next/dynamic";

import PostDetailedModal from "./PostDetailedModal";
// Lazy Load Component
// const DynamicPostDetailedModal = dynamic(() => import("./PostDetailedModal"), {
//   loading: () => null,
// })

interface PostCardProp {
  pd: Post; // Post Data
  hideQuestion?: (postId: string) => void;
}

const PostCard: React.FC<PostCardProp> = ({ pd, hideQuestion }) => {
  const [isDetailedQVisible, setIsDetailedQVisible] = useState<boolean>(false);

  const showDetailedQuestion = () => {
    setIsDetailedQVisible(true);
  };

  const hideDetailedQuestion = () => {
    setIsDetailedQVisible(false);
  };

  return (
    <div className="group bg-hsl-l100 dark:bg-hsl-l15 rounded-lg shadow-md overflow-hidden w-full max-w-full mx-auto relative">
      <Link href={`/question/${pd.postId}`}>

        {/* IMAGE */}
        <div className="relative pb-[56.25%]"> {/* 16:9 Aspect Ratio */}
          <Image src={pd.imageURL} alt="Question Banner Image" sizes="100%"
            fill={true} style={{ objectFit: "cover" }} priority
            className="absolute inset-0 w-full h-full" />
        </div>

        <div className="p-4 flex flex-col">
          <h2 className="text-lg font-bold truncate">{pd.title}</h2>
          <div className="flex justify-between items-center">
            <p className="text-sm text-hsl-l50">{pd.authorFirstName} {pd.authorLastName}</p>
            <p className="text-sm text-hsl-l50">{pd.date}</p>
          </div>

          <div className="flex flex-wrap justify-end items-center gap-1 mt-2">
            {pd.tags?.map((tag, idx) => (
              <p key={idx} className="bg-hsl-l95 dark:bg-hsl-l20 px-2 py text-hsl-l50 text-xxs rounded-lg">{tag}</p>
            ))}
          </div>
        </div>

      </Link>

      <div className="absolute right-4 top-4 flex gap-2">
        {hideQuestion && (
          <div onClick={() => hideQuestion(pd.postId)}
            className=" opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer bg-hsl-l5 bg-opacity-75 rounded-full p-1 hover:bg-opacity-85">
            <IconGeneral type="visibility-off" fill='hsl(0 0% 85%)' size={26} />
          </div>
        )}
        <div onClick={showDetailedQuestion}
          className="cursor-pointer  bg-hsl-l5 bg-opacity-75 rounded-full p-1 hover:bg-opacity-85">
          <IconGeneral type="menu-more-vert" fill='hsl(0 0% 85%)' size={26} />
        </div>
      </div>

      {isDetailedQVisible && (
        <PostDetailedModal pd={pd} onClose={hideDetailedQuestion} />
      )}
    </div>
  );
}

export default PostCard;