/**
 * Profile
 */
export interface Profile {
  firstName: string;
  lastName: string;
  jobTitle: string;
  company: string;
  bio: string;
  skills: string;
  bannerColor: string;
  badges: string[];
  location: {
    campus: string,
    city: string,
    country: string
  };
  socials: {
    website: string;
    github: string;
  };
  units: string[]
}