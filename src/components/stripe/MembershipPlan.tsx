"use client";

import { getStripe } from '@/services';

interface MembershipPlanProps {
  priceId: string;
};

const MembershipPlan: React.FC<MembershipPlanProps> = ({ priceId }) => {

  /**
   * Handle Submit
   * @returns 
   */
  const handleSubmit = async () => {
    const stripe = await getStripe();

    console.log("STRIPE ", stripe);

    if (!stripe) {
      return;
    }

    try {
      const response = await fetch('/api/stripeCheckout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ priceId: priceId }),
      });

      console.log("Response received");

      if (!response.ok) {
        console.log("RESPONSE ERROR")
        console.log(response);
        throw new Error('Something went wrong');
      }

      const data = await response.json();
      console.log("Data in subscirbe", data);
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
