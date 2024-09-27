// Settings Page tsx

"use client";

import LayoutDefault from "@/components/layout/LayoutDefault";
import { useAuth } from "@/components/providers/AuthProvider";
import { useNotification } from "@/components/providers/NotificationProvider";
import { deleteUserData, getUserValue } from "@/services";
import { useEffect, useState } from "react";


export default function SettingsPage() {
  const { user, loading } = useAuth();
  const { addNotification } = useNotification();
  const [userName, setUserName] = useState({ first: '', last: '' });

  /**
   * Get User Name
   */
  useEffect(() => {
    if (user) {
      const fetchProfileData = async () => {
        try {
          const [first, last] = await Promise.all([
            getUserValue(user.uid, 'firstName'),
            getUserValue(user.uid, 'lastName'),
          ]);
          setUserName({ first, last });
        } catch (error) {
          console.error('Error fetching profile data:', error);
        }
      };

      fetchProfileData();
    }
  }, [user]);

  const deleteAccount = async () => {
    if (!user?.uid) {
      addNotification('Must be signed in to delete data');
      return;
    }
    try {
      await deleteUserData(user.uid);
    } catch (error) {
      console.error(error);
      addNotification('Error deleting account. Try again later');
    }
  }

  return (
    <LayoutDefault>
      <main className="mt-8">

        <h1 className="text-3xl font-bold mb-16">{userName.first} {userName.last}</h1>
        <div className="min-h-[40vh] flex flex-col">


          <div className=" bg-white dark:bg-hsl-l15 rounded-md shadow-sm border border-hsl-l95 dark:border-hsl-l20
        flex justify-between items-center py-4 px-4">
            <div>
              <p className="font-medium">Delete Account?</p>
              <p className="text-sm text-hsl-l50">This will delete your account and all your data.</p>
              <p className="text-sm text-hsl-l50">This includes posts, guides, profile information and messages.</p>
              <p className="text-sm text-hsl-l50">This cannot be undone. Be sure before clicking delete.</p>
            </div>

            <button type="button" onClick={deleteAccount}
              className="bg-red-500 dark:bg-red-800 text-white font-medium px-4 py-2 border-none outline-none rounded-md">
              Delete Account
            </button>
          </div>
        </div>
      </main>
    </LayoutDefault>
  );
}