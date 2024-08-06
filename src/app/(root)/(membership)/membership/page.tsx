// Membership Page tsx

"use client"

import LayoutDefault from "@/components/layout/LayoutDefault";
import SubscribeMembership from "@/components/stripe/XSubscribeMembership";


export default function MembershipPage() {


  return (
    <LayoutDefault>
      <div>
        <SubscribeMembership priceId="prod_QbrqOBoZfds48m" price="0.1" description="Premium Membership" />
      </div>
    </LayoutDefault>
  );
}
