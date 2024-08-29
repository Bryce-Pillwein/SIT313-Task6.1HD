// Profile Picture tsx

import Image from "next/image";
import IconDevProfile from "../icons/IconDevProfile";
import { useAuth } from "../providers/AuthProvider";
import { useEffect, useState } from "react";
import { getUserValue } from "@/services";

interface ProfilePictureProps {
  size: string;
  uid?: string;
}

const ProfilePicture: React.FC<ProfilePictureProps> = ({ size, uid }) => {
  const { user, loading } = useAuth();
  const [profileImageURL, setProfileImageURL] = useState<string | null>(null);

  /**
   * Get User Profile Image (if exists)
   */
  useEffect(() => {
    const id = uid ? uid : user ? user.uid : null;

    if (id) {
      const getPhotoUrl = async () => {
        const photoURL = await getUserValue(id, 'photoURL');
        photoURL ? setProfileImageURL(photoURL) : setProfileImageURL(null);
      }
      getPhotoUrl();
    }
  }, [uid, user]);

  return (
    <div className="flex-shrink-0" style={{ maxWidth: `${size}px`, maxHeight: `${size}px` }} >
      {!profileImageURL ? (
        <IconDevProfile />
      ) : (
        <Image src={profileImageURL} alt="Profile Image" sizes="100%"
          fill={true} style={{ objectFit: "cover" }} priority
          className="absolute inset-0 w-full h-full rounded-tl-xl rounded-tr-xl" />
      )}
    </div>
  );
};

export default ProfilePicture;