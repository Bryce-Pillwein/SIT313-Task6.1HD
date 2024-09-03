import { db } from "@/firebaseConfig";
import { doc, updateDoc } from "firebase/firestore";
import { Profile } from "@/types/Profile";

/**
 * Update User Profile
 * @param uid User ID
 * @param profile Profile data to update
 */
export default async function updateUserProfile(uid: string, profile: Profile) {
  try {
    const userDocRef = doc(db, `USERS/${uid}`);
    const { firstName, lastName, jobTitle, company, bio, skills, socials, location, bannerColor } = profile;
    const fullName = `${firstName.trim().toLowerCase()}${lastName.trim().toLowerCase()}`;

    // Update Profile Doc
    await updateDoc(userDocRef, {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      fullName: fullName,
      // Update the nested profile fields directly within the user document
      profile: {
        jobTitle: jobTitle.trim(),
        company: company.trim(),
        bio: bio.trim(),
        skills: skills.trim(),
        bannerColor: bannerColor,
        location: {
          city: location.city.trim(),
          country: location.country.trim(),
        },
        socials: {
          website: socials.website,
          github: socials.github
        }
      },
    });

  } catch (error) {
    throw error;
  }
}
