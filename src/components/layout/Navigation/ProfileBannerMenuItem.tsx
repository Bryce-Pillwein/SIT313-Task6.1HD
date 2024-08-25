import Link from 'next/link';
import IconGeneral from '../../icons/IconGeneral';
import { MouseEvent } from 'react';

interface ProfileBannerMenuItemProps {
  href?: string;
  iconType: string;
  text: string;
  onClick?: (e: MouseEvent<HTMLDivElement>) => void;
  isExternal?: boolean;
}

const ProfileBannerMenuItem: React.FC<ProfileBannerMenuItemProps> = ({ href, iconType, text, onClick, isExternal = false }) => (
  <div onClick={onClick}
    className="hover:bg-hsl-l90 hover:dark:bg-hsl-l20 px-2 py-1 my-1 flex items-center gap-2 rounded-md cursor-pointer">

    <IconGeneral type={iconType} className='fill-hsl-l30 dark:fill-hsl-70' />
    <p className="font-medium text-hsl-l30 dark:text-hsl-l70">{text} </p>

    {isExternal && href && (
      <a href={href} target="_blank" rel="noopener noreferrer" />
    )}

  </div>
);

export default ProfileBannerMenuItem;