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
      const response = await fetch('/api/stripe-checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ priceId: priceId }),
      });

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
    <div className="flex justify-evenly">

      {/* Free Membership */}
      <div>
        <h1>Free Membership</h1>

      </div>

      {/* Premium Membership */}
      <div>
        <h1>Premium Membership</h1>

        <p>Product: {description}</p>
        <p>${price} AUD</p>

        <button type="button" onClick={handleSubmit}
          className='bg-hsl-l50 font-medium font-sdisplay px-4 py-2 rounded-lg'>UPGRADE</button>
      </div>

    </div>
  );
};

export default SubscribeMembership;
