// Edit Profile Page tsx

"use client";

import IconGeneral from "@/components/icons/IconGeneral";
import LayoutDefault from "@/components/layout/LayoutDefault";
import { useAuth } from "@/components/providers/AuthProvider";
import { useNotification } from "@/components/providers/NotificationProvider";
import { getUserValue, updateUserProfile } from "@/services";
import { Profile } from "@/types/Profile";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";

const initProfileData = {
  firstName: '', lastName: '', jobTitle: '', company: '',
  bio: '', skills: '', badges: [], bannerColor: '',
  location: { city: '', country: '' }, socials: { website: '', github: '' }
}

const bannerColors: any = {
  'Pink': '#FF3EB5',
  'Yellow': '#FFE900',
  'Red': '#F14548',
  'Green': '#00DA0F',
  'Cyan': '#00E5FF',
  'Blue': '#6163FF',
};

export default function EditProfilePage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const { addNotification } = useNotification()
  const [profile, setProfile] = useState<Profile>(initProfileData)
  const [isUpdating, setIsUpdating] = useState<boolean>(false);


  /**
 * Get Profile
 */
  useEffect(() => {
    const fetchProfileData = async () => {
      if (!user?.uid) return;
      try {
        // Fetch all the required profile data
        const [firstName, lastName, profileData] = await Promise.all([
          getUserValue(user.uid, 'firstName'),
          getUserValue(user.uid, 'lastName'),
          getUserValue(user.uid, 'profile')
        ]);

        const fullProfile: Profile = {
          firstName,
          lastName,
          ...profileData
        };

        setProfile(fullProfile);
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchProfileData();
  }, [user?.uid]);

  /**
   * Update Profile Data
   * @param event The submit event
   */
  const updateProfile = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevents the form from refreshing the page

    if (!user?.uid) return;

    if (profile.firstName.trim().length <= 0 || profile.lastName.trim().length <= 0) {
      addNotification('Enter valid name');
      return;
    }

    setIsUpdating(true);

    try {
      await updateUserProfile(user.uid, profile);
      addNotification('Profile updated successfully!');
      router.push(`/profile/${user.uid}`);
    } catch (error) {
      console.error('Error updating profile data:', error);
      addNotification('Failed to update profile. Please try again later.');
    } finally {
      setIsUpdating(false);
    }
  };

  /**
   * Handle Change
   * @param e 
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile({
      ...profile,
      [name]: value,
    });
  };

  /**
   * Handle Location Change
   * @param e 
   */
  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      location: {
        ...prevProfile.location,
        [name]: value,
      },
    }));
  };

  /**
   * Handle Social Links Change
   * @param e 
   */
  const handleSocialsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      socials: {
        ...prevProfile.socials,
        [name]: value,
      },
    }));
  };

  return (
    <LayoutDefault>
      <main className="bg-hsl-l100 dark:bg-hsl-l15 w-full md:w-[80%] rounded-lg shadow-md mx-auto px-4 py-8">
        <h1 className="text-2xl font-semibold text-center">Edit Profile</h1>

        {profile && !isUpdating && (
          <form onSubmit={updateProfile}
            className="flex flex-col w-full md:w-[80%] mx-auto">

            {/* Personal Information */}
            <div className="flex items-center mt-12 mb-4 gap-x-2">
              <IconGeneral type="profile" size={24} className="fill-hsl-l80 dark:!fill-hsl-l30" />
              <p className="text-sm text-hsl-l80 dark:text-hsl-l30 text-nowrap">Profile Information</p>
              <div className="h-[1px] w-full border-b border-b-hsl-l80 dark:border-b-hsl-l30"></div>
            </div>

            <div className="flex gap-x-4 flex-wrap w-full">
              <div className="flex flex-col flex-grow">
                <label htmlFor="firstName" className="text-sm text-hsl-l50">First Name</label>
                <input id="firstName" name="firstName" type="text" className="df-input" autoComplete="off" required
                  value={profile.firstName} onChange={handleChange} />
              </div>
              <div className="flex flex-col flex-grow">
                <label htmlFor="lastName" className="text-sm text-hsl-l50">Last Name</label>
                <input id="lastName" name="lastName" type="text" className="df-input" autoComplete="off" required
                  value={profile.lastName} onChange={handleChange} />
              </div>
            </div>

            <label htmlFor="bio" className="text-sm text-hsl-l50 mt-4">Bio</label>
            <textarea id="bio" name="bio" className="df-input input-resize-content"
              value={profile.bio} onChange={handleChange}></textarea>

            {/* Job Details */}
            <div className="flex items-center mt-12 mb-4 gap-x-2">
              <IconGeneral type="job" size={24} className="fill-hsl-l80 dark:!fill-hsl-l30" />
              <p className="text-sm text-hsl-l80 dark:text-hsl-l30 text-nowrap">Job</p>
              <div className="h-[1px] w-full border-b border-b-hsl-l80 dark:border-b-hsl-l30"></div>
            </div>

            <div className="flex gap-x-4 flex-wrap w-full">
              <div className="flex flex-col flex-grow">
                <label htmlFor="jobTitle" className="text-sm text-hsl-l50">Job Title</label>
                <input id="jobTitle" name="jobTitle" type="text" className="df-input" autoComplete="off"
                  value={profile.jobTitle} onChange={handleChange} />
              </div>
              <div className="flex flex-col flex-grow">
                <label htmlFor="company" className="text-sm text-hsl-l50">Company</label>
                <input id="company" name="company" type="text" className="df-input" autoComplete="off"
                  value={profile.company} onChange={handleChange} />
              </div>
            </div>

            {/* Location */}
            <div className="flex items-center mt-12 mb-4 gap-x-2">
              <IconGeneral type="location" size={24} className="fill-hsl-l80 dark:!fill-hsl-l30" />
              <p className="text-sm text-hsl-l80 dark:text-hsl-l30 text-nowrap">Location</p>
              <div className="h-[1px] w-full border-b border-b-hsl-l80 dark:border-b-hsl-l30"></div>
            </div>

            <div className="flex gap-x-4 flex-wrap w-full">
              <div className="flex flex-col flex-grow">
                <label htmlFor="city" className="text-sm text-hsl-l50">City</label>
                <input id="city" name="city" type="text" className="df-input" autoComplete="off"
                  value={profile.location.city} onChange={handleLocationChange} />
              </div>
              <div className="flex flex-col flex-grow">
                <label htmlFor="country" className="text-sm text-hsl-l50">Country</label>
                <input id="country" name="country" type="text" className="df-input" autoComplete="off"
                  value={profile.location.country} onChange={handleLocationChange} />
              </div>
            </div>

            {/* Socials */}
            <div className="flex items-center mt-12 mb-4 gap-x-2">
              <IconGeneral type="share" size={24} className="fill-hsl-l80 dark:!fill-hsl-l30" />
              <p className="text-sm text-hsl-l80 dark:text-hsl-l30 text-nowrap">Socials</p>
              <div className="h-[1px] w-full border-b border-b-hsl-l80 dark:border-b-hsl-l30"></div>
            </div>

            <div className="flex gap-x-4 flex-wrap w-full">
              <div className="flex flex-col flex-grow">
                <label htmlFor="website" className="text-sm text-hsl-l50">Website</label>
                <input id="website" name="website" type="text" className="df-input" autoComplete="off"
                  value={profile.socials.website} onChange={handleSocialsChange} />
              </div>
              <div className="flex flex-col flex-grow">
                <label htmlFor="github" className="text-sm text-hsl-l50">GitHub</label>
                <input id="github" name="github" type="text" className="df-input" autoComplete="off"
                  value={profile.socials.github} onChange={handleSocialsChange} />
              </div>
            </div>

            {/* Skills / Experience */}
            <div className="flex items-center mt-12 mb-4 gap-x-2">
              <IconGeneral type="bolt" size={24} className="fill-hsl-l80 dark:!fill-hsl-l30" />
              <p className="text-sm text-hsl-l80 dark:text-hsl-l30 text-nowrap">Skills</p>
              <div className="h-[1px] w-full border-b border-b-hsl-l80 dark:border-b-hsl-l30"></div>
            </div>

            <div className="flex flex-col flex-grow">
              <label htmlFor="skills" className="text-sm text-hsl-l50">Skills</label>
              <input id="skills" name="skills" type="text" className="df-input" autoComplete="off" required
                placeholder="Skills, Experience, Languages, Frameworks..."
                value={profile.skills} onChange={handleChange} />
            </div>

            {/* Appearence */}
            <div className="flex items-center mt-12 mb-4 gap-x-2">
              <IconGeneral type="plans" size={24} className="fill-hsl-l80 dark:!fill-hsl-l30" />
              <p className="text-sm text-hsl-l80 dark:text-hsl-l30 text-nowrap">Appearence</p>
              <div className="h-[1px] w-full border-b border-b-hsl-l80 dark:border-b-hsl-l30"></div>
            </div>

            <div className="flex justify-between">
              <label className="text-sm text-hsl-l50">Profile Banner Colour</label>
              <p className="text-sm text-hsl-l50">Current: {profile.bannerColor}</p>
            </div>

            <div className="flex flex-wrap w-full justify-center">
              {Object.keys(bannerColors).map((colorKey) => {
                const colorValue = bannerColors[colorKey as any];
                return (
                  <div key={colorKey} onClick={() => setProfile({ ...profile, bannerColor: colorKey })}
                    className={`flex flex-col m-2 rounded-md p-1 ${colorKey === profile.bannerColor ? 'border border-hsl-l50' : ''}`}>
                    <div className="w-[40px] h-[40px] rounded-full" style={{ backgroundColor: colorValue }}></div>
                  </div>
                );
              })}
            </div>


            {/* Submit Button */}
            <div className="flex justify-end mt-16">
              <button type="submit"
                className="px-4 py-2 rounded-lg bg-mb-pink hover:bg-mb-pink-active dark:bg-mb-yellow dark:hover:bg-mb-yellow-active">
                <p className="font-montserrat font-semibold dark:text-black text-white">Submit</p>
              </button>
            </div>
          </form>
        )}

        {isUpdating && (
          <p className="text-center text-hsl-l50">Updating Data</p>
        )}

        {!profile && (
          <p className="text-center text-hsl-l50">Loading Profile Data...</p>
        )}

      </main>
    </LayoutDefault>
  );
}