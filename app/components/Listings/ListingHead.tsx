'use client'

import { useCountries } from "@/app/hooks";
import Heading from "../Heading";
import Image from "next/image";
import HeartButton from "../HeartButton";

interface ListingHeadProps {
    title: string;
    imageSrc: string;
    location: string;
    id: string;
    currentUser?: SafeUser | null;
}

const ListingHead = ({ title, imageSrc, location, id, currentUser }: ListingHeadProps) => {
    const { getByValue } = useCountries();
  
    const locationValue = getByValue(location);

    return (
    <>
        <Heading 
            title={title}
            subtitle={`${locationValue?.region}, ${locationValue?.label}`}
        />
        <div className="w-full h-[60vh] overflow-hidden rounded-xl relative">
            <Image 
                src={imageSrc}
                fill
                className="rounded-xl object-cover w-full"
                alt={title + ' image'}
            />
            <div className="absolute z-10 top-5 right-5">
                <HeartButton  
                    listingId={id}
                    currentUser={currentUser}
                />
            </div>
        </div>
    </>
  )
}

export default ListingHead;