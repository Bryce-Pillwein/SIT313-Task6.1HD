// Profile Page tsx

"use client";

import LayoutDefault from "@/components/layout/LayoutDefault";
import { getUserValue } from "@/services";
import { useEffect, useState } from "react";


export default function View({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const [user, setUser] = useState({ firstName: '', lastName: '' });


  /**
   * Get User Name
   */
  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const [firstName, lastName] = await Promise.all([
          getUserValue(slug, 'firstName'),
          getUserValue(slug, 'lastName')
        ]);
        setUser({ firstName, lastName });
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserName();
  }, [slug]);

  return (
    <LayoutDefault>
      <main>
        {user && (
          <p>{user.firstName} {user.lastName}</p>
        )}
      </main>
    </LayoutDefault>
  );
}