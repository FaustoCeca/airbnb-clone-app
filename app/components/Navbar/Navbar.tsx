'use client'

import { Container, Logo, Search, UserMenu } from '..'
import Categories from './Categories';

interface NavbarProps {
  currentUser?: SafeUser | null;
}


const Navbar = ({ currentUser }: NavbarProps) => {

  return (
    <div className="fixed w-full bg-white z-10 shadow-sm">
        <div className="py-4 border-b-[1px]">
            <Container>
                <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
                    <Logo />
                    <Search />
                    <UserMenu currentUser={currentUser} />
                </div>
            </Container>
        </div>
        <Categories />
    </div>
  )
}

export default Navbar;