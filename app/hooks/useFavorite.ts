import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";
import useLoginModal from "./useLoginModal";

interface IUseFavoriteProps {
    listingId: string;
    currentUser?: SafeUser | null;
}

const useFavorite = ({ 
    listingId,
    currentUser,
 }: IUseFavoriteProps) => {
    const router = useRouter();
    const loginModal = useLoginModal();

    const hasFavorited = useMemo(() => {
        const list = currentUser?.favoriteIds || [];

        return list.includes(listingId);
    }, [currentUser, listingId]);

    const toggleFavorite = useCallback(async (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();

        if (!currentUser) {
            loginModal.onOpen();
            return;
        }

        try {
            let request;

            if (hasFavorited) {
                request = await axios.delete(`/api/favorites/${listingId}`);
            } else {
                request = await axios.post(`/api/favorites/${listingId}`);
            } 


            router.refresh();
            toast.success("Success!");
        } catch (error:any) {
            toast.error("Something went wrong");
        }
    }, [currentUser, listingId, loginModal, hasFavorited, router]);

    return {
        hasFavorited,
        toggleFavorite,
    }
}

export default useFavorite;