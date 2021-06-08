import { StarIcon } from "@heroicons/react/solid";
import Image from "next/image";
import Currency from "react-currency-formatter";
import { useDispatch } from "react-redux";
import { addToBasket, removeFromBasket } from "../slices/basketSlice";
const CheckoutProduct = ({
  id,
  price,
  category,
  title,
  image,
  description,
  isPrime,
  rating,
}) => {
  const dispatch = useDispatch();

  const addItemtoBasket = () => {
    const product = {
      id,
      price,
      category,
      title,
      image,
      description,
      isPrime,
      rating,
    };
    dispatch(addToBasket(product));
  };

  const removeItemFromBasket = () => dispatch(removeFromBasket({ id }));

  return (
    <div className="grid grid-cols-4 sm:grid-cols-5">
      {/* Left */}
      <Image src={image} height={200} width={200} objectFit="contain" />

      {/* Middle */}

      <div className="col-span-3 mx-5">
        <p>{title}</p>

        <div className="flex">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <StarIcon key={i} className="h-5 text-yellow-400" />
            ))}
        </div>
        <p className="text-xs my-2 line-clamp-3">{description}</p>

        <Currency quantity={price} currency="INR" />

        {isPrime && (
          <div className="flex items-center space-x-2">
            <Image
              src="https://hackerman-links.vercel.app/h5g3"
              height={40}
              width={48}
              objectFit="contain"
              alt="prime-logo"
            />
            <p className="text-xs text-gray-500 whitespace-nowrap">
              FREE Next-day Delivery
            </p>
          </div>
        )}
      </div>

      {/* Right */}

      <div className="flex col-span-4 justify-self-center space-x-4 mt-2 sm:col-span-1 sm:space-x-0 sm:flex-col sm:space-y-2 sm:my-auto sm:justify-self-end">
        <button className="btn" onClick={addItemtoBasket}>
          Add to Basket
        </button>
        <button className="btn" onClick={removeItemFromBasket}>
          Remove from Basket
        </button>
      </div>
    </div>
  );
};

export default CheckoutProduct;
