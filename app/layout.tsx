import { Footer, Navbar, Provider} from '@/components'
import './globals.css'
import { ReactNode } from 'react'
import { Session } from 'next-auth';

const inter = Inter({ subsets: ['latin'] })
import { Inter } from 'next/font/google'
import { ProviderProps } from '@/types';

export const metadata = {
  title: 'TurboCar',
  description: 'Discover the best cars in the world',
}

// interface RootLayoutProps {
//   children: ReactNode;
//   session: undefined | null | Session;
// }

export default function RootLayout(props: ProviderProps) {
  const { children, session } = props;
  return (
    <Provider session={session}>
      <html lang="en">
        <body className='relative'>   
          <Navbar />
          {children}
          {/* <Footer /> */}
        </body>
      </html>
    </Provider>
  )
}

