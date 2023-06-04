'use client';
import { AiOutlineMenu } from 'react-icons/ai';
import Avatar from '../Avatar';
import { useCallback, useState } from 'react';
import MenuItem from './MenuItem';
import { useLoginModal, useRegisterModal, useRentModal } from '@/app/hooks';
import { signOut } from 'next-auth/react';

interface UserMenuProps {
    currentUser?: SafeUser | null;
}

const UserMenu = ({ currentUser }: UserMenuProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const rentModal = useRentModal();

    const handleOpen = useCallback(() => {
        setIsOpen( (value) => !value );
    }, []);

    const handleRent = useCallback(() => {
        if (!currentUser) {
            loginModal.onOpen();
            return
        } else {
            rentModal.onOpen();
        }
    }, [currentUser, loginModal, rentModal]);

  return (
    <div className="relative">
        <div className="flex flex-row items-center gap-3">
            <div
                onClick={handleRent}
                className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full cursor-pointer hover:bg-neutral-100 transition duration-300 ease-in-out"
            >
            Airbnb your home
            </div>
            <div 
                onClick={handleOpen}
                className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition duration-300 ease-in-out"
            >
                <AiOutlineMenu />
            </div>
            <div className='hidden md:block'>
                <Avatar src={currentUser?.image} />
            </div>
        </div>
        {isOpen && (
            <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
                <div className="flex flex-col gap-2 cursor-pointer">
                    {
                        currentUser ? (
                            <>
                                <MenuItem label="My trips" onClick={() => {}} />
                                <MenuItem label="My favorites" onClick={() => {}} />
                                <MenuItem label="My reservations" onClick={() => {}} />
                                <MenuItem label="My properties" onClick={() => {}} />
                                <MenuItem label="Airbnb my home" onClick={rentModal.onOpen} />
                                <hr />
                                <MenuItem label="Logout" onClick={() => signOut()} />
                            </>
                            ) : (
                            <>
                                <MenuItem label="Login" onClick={loginModal.onOpen} />
                                <MenuItem label="Sign Up" onClick={registerModal.onOpen} />
                            </>
                        )
                    }
                </div>
            </div>
        )}
    </div>
  )
}

export default UserMenu;