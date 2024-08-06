'use client';

import { getStripe } from '@/services';

type Props = {
  priceId: string;
  price: string;
  description: string;
};

const SubscribeMembership = ({ priceId, price, description }: Props) => {

  /**
   * Handle Submit
   * @returns 
   */
  const handleSubmit = async () => {
    const stripe = await getStripe();

    if (!stripe) {
      return;
    }

    try {
      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ priceId: priceId }),
      });

      if (!response.ok) throw new Error('Something went wrong');

      const data = await response.json();
      await stripe.redirectToCheckout({ sessionId: data.result.id, });

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      Click Below button to get {description}
      <button onClick={handleSubmit}>
        Upgrade in {price}
      </button>
    </div>
  );
};

export default SubscribeMembership;
