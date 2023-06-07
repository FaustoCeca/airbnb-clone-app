import Navbar from './components/Navbar/Navbar';
import './globals.css'
import { Nunito } from 'next/font/google'
import ToasterProvider from './providers/ToasterProvider';
import { LoginModal, RegisterModal, RentModal } from './components/Modals'
import { getCurrentUser } from './actions/getCurrentUser';

const font = Nunito({ subsets: ['latin'] });

export const metadata = {
  title: 'Airbnb',
  description: 'Airbnb clone',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body className={font.className}>
        <ToasterProvider />
        <LoginModal />
        <RegisterModal />
        <RentModal />
        <Navbar currentUser={currentUser} />
        <div className='pb-20 pt-20'>
          {children}
        </div>
      </body>
    </html>
  )
}
