import { StarIcon } from "@heroicons/react/solid";
import Image from "next/image";
import { useState } from "react";
import Currency from "react-currency-formatter";
import { useDispatch } from "react-redux";
import { addToBasket } from "../slices/basketSlice";

const MAX_RATING = 5;
const MIN_RATING = 1;

const Product = ({ id, price, category, title, image, description }) => {
  const [rating] = useState(
    Math.floor(Math.random() * (MAX_RATING - MIN_RATING) + MIN_RATING)
  );

  const [isPrime] = useState(!!Math.floor(Math.random() * 2));
  const dispatch = useDispatch();

  const onAddToBasket = () => {
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

  return (
    <div className="relative bg-white flex flex-col justify-center shadow-md m-5 p-10 z-30">
      <p className="absolute top-2 right-2 text-xs italic text-gray-400">
        {category}
      </p>

      <Image src={image} height={200} width={100} objectFit="contain" />

      <p className="my-2">{title}</p>

      <div className="flex">
        {Array(rating)
          .fill()
          .map((_, i) => (
            <StarIcon className="h-6 text-yellow-400" key={i} />
          ))}
      </div>

      <p className="text-xs my-2 line-clamp-2">{description}</p>

      <div className="mb-5">
        <Currency quantity={price} currency="INR" />
      </div>

      {isPrime && (
        <div className="flex items-center space-x-2">
          <Image
            src="https://hackerman-links.vercel.app/h5g3"
            height={40}
            width={48}
            objectFit="contain"
            alt="prime-logo"
          />

          <p className="text-xs text-gray-500">FREE Next-day Delivery</p>
        </div>
      )}

      <button className="btn mt-auto" onClick={onAddToBasket}>
        Add to Basket
      </button>
    </div>
  );
};

export default Product;
