import { getCurrentUser } from "@/app/actions/getCurrentUser";
import getListingById from "@/app/actions/getListingById";
import EmptyState from "@/app/components/EmptyState";
import ListingClient from "./ListingClient";

interface ListingPageProps {
    listingId?: string;
}

const ListingPage = async({params}: { params: ListingPageProps }) => {
    const { listingId } = params;
    // We cannot use our useRouter hook here, because this is a server component and not a client component.
    const listing = await getListingById({ listingId });
    const currentUser = await getCurrentUser();


    if (!listing) {
        return (
            <EmptyState />
        );
    }

  return (
    <div>
        <ListingClient 
            listing={listing}
            currentUser={currentUser}
        />
    </div>
  )
}

export default ListingPage;