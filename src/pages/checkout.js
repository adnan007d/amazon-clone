import Image from "next/image";
import { useSelector } from "react-redux";
import CheckoutProduct from "../components/CheckoutProduct";
import Header from "../components/Header";
import { selectItems, selectTotal } from "../slices/basketSlice";
import Currency from "react-currency-formatter";
import { getSession, useSession } from "next-auth/client";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

const stripePromise = loadStripe(process.env.stripe_public_key);

const Checkout = () => {
  const items = useSelector(selectItems);
  const total = useSelector(selectTotal);
  const [session] = useSession();

  const createCheckoutSession = async () => {
    const stripe = await stripePromise;

    // Call the backend to create a checkout session...
    const checkoutSession = await axios.post("/api/create-checkout-session", {
      items,
      email: session.user.email,
    });

    // Redirect to stripe checkout

    const result = await stripe.redirectToCheckout({
      sessionId: checkoutSession.data.id,
    });

    if (result.error) alert(result.error.message);
  };

  return (
    <div className="bg-gray-100">
      <Header />

      <main className="grid grid-cols-1 lg:grid-cols-8 max-w-screen-2xl mx-auto lg:grid-flow-col-dense">
        {/* Left */}
        <div className="m-5 lg:col-span-full mb-0">
          <Image
            src="https://hackerman-links.vercel.app/dhsk"
            height={250}
            width={1020}
            objectFit="contain"
            // layout="intrinsic"
          />
        </div>

        {/* Right */}
        {items.length > 0 && (
          <div className="flex flex-col mb-4 bg-white mx-5 p-10 shadow-md lg:row-span-full lg:row-end-3 lg:justify-self-end">
            <h2 className="whitespace-nowrap">
              Subtotal ({items.length} items):{" "}
              <span className="font-bold">
                <Currency quantity={total} currency="INR" />
              </span>
            </h2>
            <button
              role="link"
              onClick={createCheckoutSession}
              disabled={!session}
              className={`btn mt-2 ${
                !session &&
                "from-gray-300 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed"
              }`}
            >
              {!session ? "Sign in to checkout" : "Proceed to checkout"}
            </button>
          </div>
        )}

        <div className="flex flex-col justify-self-auto mx-5 mb-5 space-y-10 p-5 bg-white lg:col-span-full">
          <h1 className="text-3xl border-b pb-4">
            {items.length === 0
              ? "Your Amazon Basket is Empty."
              : "Shopping Basket"}
          </h1>
          {items.map(
            (
              {
                id,
                price,
                category,
                title,
                image,
                description,
                rating,
                isPrime,
              },
              i
            ) => (
              <CheckoutProduct
                key={i}
                id={id}
                price={price}
                category={category}
                image={image}
                title={title}
                description={description}
                rating={rating}
                isPrime={isPrime}
              />
            )
          )}
        </div>
      </main>
    </div>
  );
};

export default Checkout;

export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: { session },
  };
}
