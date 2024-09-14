"use client";

import { getStripe } from '@/services';
import { useAuth } from '../providers/AuthProvider';

interface MembershipPlanProps {
  priceId: string;
};

const MembershipPlan: React.FC<MembershipPlanProps> = ({ priceId }) => {
  const { user, loading } = useAuth();

  /**
   * Handle Submit
   * @returns 
   */
  const handleSubmit = async () => {
    const stripe = await getStripe();
    if (!stripe) {
      console.log("Stripe not mounted");
      return
    };

    if (!user) {
      console.log("User not authenticated");
      return;
    }

    try {
      const response = await fetch('/api/stripeCheckout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ priceId: priceId, uid: user.uid }),
      });

      if (!response.ok) {
        console.error('Response Error for Submitting Member Plan');
        throw new Error('Something went wrong');
      }

      const data = await response.json();
      await stripe.redirectToCheckout({ sessionId: data.result.id, });

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='w-full flex justify-center items-center'>
      <button type="button" onClick={handleSubmit}
        className='flex self-center bg-hsl-l13 text-white dark:bg-hsl-l98 dark:text-black hover:bg-mb-pink hover:dark:bg-mb-yellow text-xl font-sdisplay px-14 py-3 rounded-lg'>Get Started</button>
    </div>
  );
};

export default MembershipPlan;
