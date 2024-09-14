// Profile Page tsx

"use client";

import IconGeneral from "@/components/icons/IconGeneral";
import Header from "@/components/layout/Header";
import { useAuth } from "@/components/providers/AuthProvider";
import { useThemeContext } from "@/components/providers/ThemeProvider";
import ProfilePicture from "@/components/ui/ProfilePicture";
import { getContributions, getUserPostForProfilePage, getUserValue } from "@/services";
import { Post } from "@/types/Post";
import { Profile } from "@/types/Profile";
import HeatMap from "@uiw/react-heat-map";
import Link from "next/link";
import { useEffect, useState } from "react";

const bannerColors: { [key: string]: string } = {
  'Pink': '#FF3EB5',
  'Yellow': '#FFE900',
  'Red': '#F14548',
  'Green': '#00DA0F',
  'Cyan': '#00E5FF',
  'Blue': '#6163FF',
};

interface Contributions {
  date: string;
  count: number;
}

export default function ProfilePage({ params }: { params: { slug: string } }) {
  const { user, loading } = useAuth();
  const { isDarkTheme } = useThemeContext();
  const { slug } = params;
  const [profile, setProfile] = useState<Profile>();
  const [bgColor, setBgColor] = useState<string>('#FF3EB5');
  const [posts, setPosts] = useState<Post[]>([]);
  const [counts, setCounts] = useState({ posts: 0, questions: 0, articles: 0 });
  const [contributions, setContributions] = useState<Contributions[]>([]);
  const [graphColors, setGraphColors] = useState({ 0: '#F2F2F2', 1: '#FFCCEB', 2: '#FF99D8', 3: '#FF66C4', 4: '#FF3EB5' });

  /**
   * Get Profile
   */
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        // Fetch all the required profile data
        const [firstName, lastName, profileData] = await Promise.all([
          getUserValue(slug, 'firstName'),
          getUserValue(slug, 'lastName'),
          getUserValue(slug, 'profile')
        ]);

        const fullProfile: Profile = {
          firstName,
          lastName,
          ...profileData,
          units: profileData?.units ?? []
        };

        setProfile(fullProfile);
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchProfileData();
  }, [slug]);


  /**
   * Get User Posts
   */
  useEffect(() => {
    const getUserPosts = async () => {
      try {
        const postContent = await getUserPostForProfilePage(slug);
        setPosts(postContent);
        const questionCount = postContent.filter(post => post.postType === 'question').length;
        const articleCount = postContent.filter(post => post.postType === 'article').length;
        setCounts({ posts: postContent.length, questions: questionCount, articles: articleCount });
      } catch (error) {
        console.error('Error fetching post data:', error);
      }
    };

    getUserPosts();
  }, [slug])

  /**
   * Update banner color
   */
  useEffect(() => {
    const bg = bannerColors[profile?.bannerColor || '#FF3EB5'];
    setBgColor(bg);
  }, [profile?.bannerColor]);

  /**
   * Contributions for Progress Chart
   */
  useEffect(() => {
    const getUserContributions = async () => {
      try {
        const contri = await getContributions(slug);
        setContributions(contri);
      } catch (error) {
        console.error('Error fetching post data:', error);
      }
    };

    getUserContributions();
  }, [slug]);


  useEffect(() => {
    if (isDarkTheme)
      setGraphColors({ 0: '#2E2E2E', 1: '#544301', 2: '#997A00', 3: '#CCB200', 4: '#FFE900' });
    else
      setGraphColors({ 0: '#F2F2F2', 1: '#FFCCEB', 2: '#FF99D8', 3: '#FF66C4', 4: '#FF3EB5' });
  }, [isDarkTheme]);

  return (
    <div className="pb-8">
      <Header />

      <main className="w-full">
        <div className={`h-[20vh]`} style={{ backgroundColor: bgColor }}></div>

        <div className="app-container">
          <section className="bg-white dark:bg-hsl-l15 w-full rounded-md -mt-[10vh] shadow-sm p-4 relative border border-hsl-l95 dark:border-hsl-l20">
            {user?.uid === slug && (
              <Link href="/edit-profile"
                className="absolute right-4 top-4 rounded-md px-2 py-2 bg-hsl-l90 dark:bg-hsl-l20 flex justify-center items-center gap-x-2">
                <IconGeneral type="edit" size={20} className="!fill-hsl-l5 dark:!fill-hsl-l95" />
                <p className="text-sm font-semibold">Edit</p>
              </Link>
            )}

            <div className="rounded-full flex justify-center items-center w-[120px] h-[120px] mx-auto -translate-y-[60px]"
              style={{ backgroundColor: bgColor }}>
              <ProfilePicture uid={slug} size="100" />
            </div>

            {profile && (
              <div>
                <h2 className="text-center text-2xl font-semibold">{profile.firstName} {profile.lastName}</h2>

                <div className="flex gap-x-8 justify-center mt-2 flex-wrap">
                  {profile.jobTitle?.length > 0 && (
                    <div className="flex gap-x-2 items-center">
                      <IconGeneral type="job" className="fill-hsl-l50" />
                      <p className="text-sm text-hsl-l50">{profile.jobTitle}</p>
                    </div>
                  )}

                  {profile.company?.length > 0 && (
                    <div className="flex gap-x-2 items-center">
                      <IconGeneral type="workplace" className="fill-hsl-l50" />
                      <p className="text-sm text-hsl-l50">{profile.company}</p>
                    </div>
                  )}

                  {(profile.location?.campus?.length > 0 || profile.location?.city?.length > 0 || profile.location?.country?.length > 0) && (
                    <div className="flex gap-x-2 items-center">
                      <IconGeneral type="location" className="fill-hsl-l50" />
                      <p className="text-sm text-hsl-l50">
                        {profile.location.campus ? profile.location.campus : ''}, {profile.location.city ? profile.location.city : ''}, {profile.location.country ? profile.location.country : ''}
                      </p>
                    </div>
                  )}
                </div>
                <div className="w-full sm:w-[80%] md:w-[70%] mt-4 mx-auto">
                  <p className="text-center text-sm text-hsl-l50">{profile.bio}</p>
                </div>
              </div>
            )}
          </section>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">

            <section className="col-span-2 flex flex-col gap-y-8">

              {/* Contributions Heat Map */}
              {contributions && (
                <div className="bg-hsl-l100 dark:bg-hsl-l15 rounded-lg shadow-sm w-full px-8 py-4 flex flex-col justify-center items-center">
                  <h3 className="font-medium px-4 py-2">Contributions</h3>
                  <HeatMap value={contributions} width={900}
                    startDate={new Date(new Date().getFullYear(), 0, 1)}
                    endDate={new Date(new Date().getFullYear(), 11, 31)}
                    weekLabels={false}
                    style={{ color: isDarkTheme ? '#ffffff' : '#000000' }}
                    rectProps={{ rx: 2 }}
                    panelColors={graphColors}
                  />
                </div>
              )}

              {/* User Posts */}
              {posts.map((pd, idx) => (
                <Link href={`/view-post/${pd.postId}?type=${pd.postType}`} key={idx}
                  className="bg-hsl-l100 dark:bg-hsl-l15 rounded-lg shadow-sm w-full px-8 py-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-x-3">
                      <ProfilePicture uid={slug} size="30" />
                      <div>
                        <p className="text-sm text-hsl-l30 dark:text-hsl-l70 font-medium">{pd.authorFirstName} {pd.authorLastName}</p>
                        <p className="text-xs text-hsl-l50">{pd.date}</p>
                      </div>
                    </div>
                    <p className="px-2 py-1 bg-hsl-l95 dark:bg-hsl-l20 text-xs rounded-lg">
                      {pd.postType === 'question' ? 'Question' : 'Article'}
                    </p>
                  </div>

                  <h2 className="text-2xl font-bold my-4">{pd.title}</h2>
                </Link>
              ))}
            </section>

            <div className="col-span-1 flex flex-col gap-y-4">
              {/* Socials */}
              {(profile?.socials && (
                (profile.socials.website?.length > 0 || profile.socials.github?.length > 0)) && (
                  <div className=" bg-white dark:bg-hsl-l15 rounded-md shadow-sm border border-hsl-l95 dark:border-hsl-l20">
                    <h3 className="font-medium px-4 py-2">Socials</h3>
                    <div className="w-full h-[1px] border-b border-hsl-l95 dark:border-hsl-l20"></div>
                    <div className="px-4 py-2">
                      {profile.socials.website?.length > 0 && (
                        <Link href={profile.socials.website} className="text-hsl-l30 dark:text-hsl-l70 hover:underline">Website</Link>
                      )}
                      {profile.socials.github?.length > 0 && (
                        <Link href={profile.socials.github} className="text-hsl-l30 dark:text-hsl-l70 hover:underline">GitHub</Link>
                      )}
                    </div>
                  </div>
                )
              )}

              {/* Skills */}
              <div className=" bg-white dark:bg-hsl-l15 rounded-md shadow-sm border border-hsl-l95 dark:border-hsl-l20">
                <h3 className="font-medium px-4 py-2">Skills</h3>
                <div className="w-full h-[1px] border-b border-hsl-l95 dark:border-hsl-l20"></div>
                {profile?.skills ? (
                  <p className="text-hsl-l30 dark:text-hsl-l70 px-4 py-2">{profile.skills}</p>
                ) : (
                  <p className="text-hsl-l50 px-4 py-2">None</p>
                )}
              </div>

              {/* Units */}
              <div className=" bg-white dark:bg-hsl-l15 rounded-md shadow-sm border border-hsl-l95 dark:border-hsl-l20">
                <h3 className="font-medium px-4 py-2">Units</h3>
                <div className="w-full h-[1px] border-b border-hsl-l95 dark:border-hsl-l20"></div>
                <div className="px-4 py-2">
                  {profile?.units && profile.units?.length > 0 && (
                    profile.units.map((unit, idx) => (
                      <p key={idx} className="text-sm text-hsl-l30 dark:text-hsl-l70 my-2">{unit}</p>
                    ))
                  )}
                </div>
              </div>

              {/* Contributions */}
              {counts.posts > 0 && (
                <div className=" bg-white dark:bg-hsl-l15 rounded-md shadow-sm border border-hsl-l95 dark:border-hsl-l20">
                  <h3 className="font-medium px-4 py-2">Posts</h3>
                  <div className="w-full h-[1px] border-b border-hsl-l95 dark:border-hsl-l20"></div>
                  <div className="px-4 py-2">
                    <p className="text-hsl-l30 dark:text-hsl-l70">{counts.posts} Published Post</p>
                    <p className="text-hsl-l30 dark:text-hsl-l70 text-sm">{counts.questions} are questions</p>
                    <p className="text-hsl-l30 dark:text-hsl-l70 text-sm">{counts.articles} are articles</p>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      </main>
    </div>
  );
}