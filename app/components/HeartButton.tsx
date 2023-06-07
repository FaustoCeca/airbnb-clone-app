'use client'

import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import useFavorite from "../hooks/useFavorite";

interface HeartButtonProps {
    listingId: string;
    currentUser?: SafeUser | null;
}

const HeartButton = ({ listingId, currentUser }: HeartButtonProps) => {

    const {hasFavorited, toggleFavorite} = useFavorite({listingId, currentUser});

    return (
    <div
        onClick={toggleFavorite}
        className="relative hover:opacity-80 transition cursor-pointer"
    >
        <AiOutlineHeart 
            size={28}
            className={`absolute -top-1 fill-white -right-1 z-10 ${hasFavorited ? 'hidden' : 'block'}`}
        />
        <AiFillHeart 
            size={28}
            className={`absolute -top-1 -right-1 fill-red-500 z-10 ${hasFavorited ? 'block' : 'hidden'}`}
        />
    </div>
  )
}

export default HeartButton;