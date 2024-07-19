// FeatureBanner tsx

import Link from "next/link";
import IconGeneral from "./icons/IconGeneral";

interface FeatureBannerProps {
  data: { [key: string]: string | number };
}

const FeatureBanner: React.FC<FeatureBannerProps> = ({ data }) => {

  // Generate random banner image
  const randomNumber = Math.floor(Math.random() * 99) + 1;
  const imageLink = `https://picsum.photos/id/${randomNumber}/500/300`;

  return (
    <Link href="/" className="">
      <img src={imageLink} className="mx-auto" />
      <div className="flex items-center gap-4 my-2 justify-between">
        {/* Author */}
        <div className="flex gap-2 items-center">
          <div className="h-5 w-5 bg-hsl-l85 dark:bg-hsl-l20 rounded-[50%] flex justify-center items-center">
            <IconGeneral type='profile' />
          </div>
          <p>{data.author}</p>
        </div>
        {/* Rating */}
        <div className="flex">
          <p>{data.rating}</p>
          <IconGeneral type='rating' />
        </div>
      </div>
      <h3 className="text-xl text-balance">{data.name}</h3>
      <p className="text-sub-12 text-justify ">{data.description}</p>
    </Link>
  )
};

export default FeatureBanner;