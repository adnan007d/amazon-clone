import Image from "next/image";
import {
  MenuIcon,
  SearchIcon,
  ShoppingCartIcon,
} from "@heroicons/react/outline";
import { signIn, signOut, useSession } from "next-auth/client";
import { selectItems } from "../slices/basketSlice";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

const Header = () => {
  const items = useSelector(selectItems);

  const router = useRouter();

  const [session] = useSession();

  return (
    <header className="sticky top-0 z-50">
      {/* Top Nav */}
      <div className="flex items-center p-2 bg-amazon_blue w-full">
        {/* Left */}
        <div className="mt-2 flex items-center flex-grow sm:flex-grow-0 cursor-pointer">
          <Image
            onClick={() => router.push("/")}
            src="https://hackerman-links.vercel.app/a2id"
            width={150}
            height={40}
            layout="intrinsic"
          />
        </div>

        {/* SearchBar */}
        <div className="hidden sm:flex ml-2 items-center h-10 rounded-md flex-grow bg-yellow-400 cursor-pointer hover:bg-yellow-500">
          <input
            className="p-2 h-full w-6 flex-grow flex-shrink rounded-l-md focus:outline-none px-4"
            type="text"
          />
          <SearchIcon className="h-12 p-4" />
        </div>

        {/* Right */}
        <div className="flex items-center text-xs text-white space-x-6 mx-6 whitespace-nowrap">
          <div onClick={!session ? signIn : signOut} className="link">
            <p>{session ? `Hello, ${session.user.name}` : "Sign In"}</p>
            <p className="font-extrabold md:text-sm">Accounts & Lists</p>
          </div>

          <div onClick={() => router.push("/orders")} className="link">
            <p>Returns</p>
            <p className="font-extrabold md:text-sm">& Orders</p>
          </div>

          <div
            className="link flex items-center"
            onClick={() => router.push("/checkout")}
          >
            <div className="relative">
              <span className="absolute top-0 right-0 text-black bg-yellow-400 h-4 w-4 font-bold rounded-full text-center">
                {items.length}
              </span>
              <ShoppingCartIcon className="h-10" />
            </div>
            <p className="hidden md:inline mt-2 font-extrabold md:text-sm">
              Basket
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Nav */}
      <div className="flex items-center space-x-3 bg-amazon_blue-light p-2 pl-6 text-white text-xs sm:text-sm">
        <p className="link flex items-center">
          <MenuIcon className="h-6 mr-1" />
          All
        </p>
        <p className="link">Prime Video</p>
        <p className="link">Amazon Business</p>
        <p className="link">Today's Deals</p>
        <p className="link hidden lg:inline-flex">Electronics</p>
        <p className="link hidden lg:inline-flex">Food & Grocery</p>
        <p className="link hidden lg:inline-flex">Prime</p>
        <p className="link hidden lg:inline-flex">Buy Again</p>
        <p className="link hidden lg:inline-flex">Shopper Toolkit</p>
        <p className="link hidden lg:inline-flex">Health & Personal Care</p>
      </div>
    </header>
  );
};

export default Header;
