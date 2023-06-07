import { NextResponse } from "next/server";
import { getCurrentUser } from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

interface IParams {
    listingId: string;
}

export async function POST (req: Request, { params }: { params: IParams }) {
    const currentUser = await getCurrentUser();

    if (!currentUser) return NextResponse.error();

    const { listingId } = params;
    
    if (!listingId || typeof listingId !== 'string') {
        return NextResponse.error();
    }

    // favoritesIds va a ser un array en el que vamos a esparcir los favoritos del usuario actual ya existentes o un arreglo vacio
    let favoriteIds = [...(currentUser.favoriteIds || [])];

    // Si el id del listing no esta en el array de favoritos, lo agregamos
    if (!favoriteIds.includes(listingId)) {
        favoriteIds.push(listingId);

        // Actualizamos el usuario con el nuevo array de favoritos
        const user = await prisma.user.update({
            where: {
                id: currentUser.id
            },
            data: {
                favoriteIds
            }
        });

        return NextResponse.json(user);
    }
}

export async function DELETE (req: Request, { params }: { params: IParams }) {
    const currentUser = await getCurrentUser();
    if (!currentUser) return NextResponse.error();

    const { listingId } = params;

    if (!listingId || typeof listingId !== 'string') {
        return NextResponse.error();
    }

    let favoriteIds = [...(currentUser.favoriteIds || [])];

    if (favoriteIds.includes(listingId)) {
        favoriteIds = favoriteIds.filter(id => id !== listingId);

        const user = await prisma.user.update({
            where: {
                id: currentUser.id
            },
            data: {
                favoriteIds
            }
        });

        return NextResponse.json(user);
    }
}