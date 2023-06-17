'use client'

import { Container } from "@/app/components";
import ListingHead from "@/app/components/Listings/ListingHead";
import ListingInfo from "@/app/components/Listings/ListingInfo";
import ListingReservation from "@/app/components/Listings/ListingReservation";
import { categories } from "@/app/components/Navbar/Categories";
import { useLoginModal } from "@/app/hooks";
import { Listing, Reservation } from "@prisma/client";
import axios from "axios";
import { differenceInCalendarDays, eachDayOfInterval } from "date-fns";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Range } from "react-date-range";
import { toast } from "react-hot-toast";

const initialDateRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
};

interface ListingClientProps {
    reservations?: Reservation[];
    listing: Listing & {
        user: SafeUser;
    };
    currentUser?: SafeUser | null;
}


const ListingClient = ({reservations = [], listing, currentUser}: ListingClientProps) => {
    const loginModal = useLoginModal();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [totalPrice, setTotalPrice] = useState(listing.price);
    const [dateRange, setDateRange] = useState<Range>(initialDateRange);

    const handleCreateReservation = useCallback(() => {
        if (!currentUser) {
            return loginModal.onOpen();
        }

        setIsLoading(true);

        axios.post('/api/reservations', {
            listingId: listing.id,
            startDate: dateRange.startDate,
            endDate: dateRange.endDate,
            totalPrice,
        })
        .then(() => {
            toast.success('Reservation created successfully');
            setDateRange(initialDateRange);
            router.push('/trips');
        })
        .catch((error) => {
            toast.error(error.response.data.message);
        })
        .finally(() => {
            setIsLoading(false);
        });

    }, [currentUser, dateRange, totalPrice, router]);

    useEffect(() => {
        if (dateRange.startDate && dateRange.endDate) {
            const totalDays = differenceInCalendarDays(dateRange.endDate, dateRange.startDate);

            if (totalDays && listing.price) {
                setTotalPrice(totalDays * listing.price);
            } else {
                setTotalPrice(listing.price);
            }
        }
    }, [dateRange, listing.price]);

    const disabledDates = useMemo(() => {
        let dates: Date[] = [];

        reservations.forEach((reservation) => {
            const range = eachDayOfInterval({
                start: new Date(reservation.startDate),
                end: new Date(reservation.endDate),
            });

            dates = [...dates, ...range];
        });

        return dates;
    }, [reservations]);


    const category = useMemo(() => {
        return categories.find((category) => category.label === listing.category);
    } ,[listing.category]);

  return (
    <Container>
        <div className="max-w-screen-lg mx-auto">
            <div className="flex flex-col gap-6">
                <ListingHead
                    title={listing.title}
                    imageSrc={listing.imageSrc}
                    location={listing.location}
                    id={listing.id}
                    currentUser={currentUser}
                />
                <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
                    <ListingInfo 
                        user={listing.user}
                        category={category}
                        description={listing.description}
                        roomCount={listing.roomCount}
                        guestCount={listing.guestCount}
                        bathroomCount={listing.bathroomCount}
                        location={listing.location}                        
                    />
                    <div className="order-first mb:10 md:order-last md:col-span-3">
                        <ListingReservation
                            price={listing.price}
                            totalPrice={totalPrice}
                            onChange={(value: any) => setDateRange(value)}
                            value={dateRange}
                            onSubmit={handleCreateReservation}
                            disabledDates={disabledDates}
                            disabled={isLoading}
                        />
                    </div>
                </div>
            </div>
        </div>
    </Container>
    )
}

export default ListingClient;