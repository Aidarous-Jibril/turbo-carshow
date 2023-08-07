"use client";
import { useState } from 'react';
import { Bars3BottomRightIcon, XMarkIcon } from '@heroicons/react/24/solid'
import { BsCarFrontFill } from "react-icons/bs";
import Link from 'next/link';
import CustomBtn from './CustomBtn';
import { signOut, useSession } from 'next-auth/react';

const Navbar = () => {
  const { data: session, } = useSession();
  const loggedUser  = session?.user
  const [open, setOpen] = useState(false)

  return (
    <nav className="bg-gray-400 " >
      <div className="max-w-7xl mx-auto flex items-center justify-between h-16 px-4 border-b border-solid border-slate-600">
          {/* logo section */}
          <Link href={'/'} onClick={() => setOpen(false)}
            className='font-bold text-2xl cursor-pointer flex items-center gap-1'>
                  <BsCarFrontFill className='w-7 h-7 text-blue-800'/>
                  <span>TurboCar</span>
          </Link>

          <div className="hidden md:block">
            {loggedUser ? (
             <>
               <Link href={'/add-car'}>
                 <CustomBtn 
                   title='Add Car'
                   btnType= "Add Car"
                   optionStyles="text-black hover:text-black-300 py-2 px-4 rounded-full hover:text-blue-700 "
                 />
               </Link>
               <Link
                href="/profile"
                className=" text-black hover:text-black-300 py-2 px-4 rounded-full hover:text-blue-700 "
              >
                Profile
              </Link>
               <CustomBtn 
                 title='Sign Out'
                 btnType= "Sign In | Log In"
                 optionStyles="text-black hover:text-black-300 py-2 px-4 rounded-full hover:text-blue-700 "
                 handleClick={() =>
                   signOut({
                     callbackUrl: `/`
                   }) 
                 }
                 />
             </>
           ) : (
             <>
             <Link href={'/user/login'}>
              <CustomBtn 
                title='Sign In'
                btnType= "Sign In | Log In"
                optionStyles='text-black bg-white-700 hover:bg-gray-200 text-blue-600 dark:text-blue-50 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
                />
              </Link>
             </>
           )}
          </div>

        {/* Menu icon */}
        <div onClick={()=>setOpen(!open)} className='absolute right-8 top-6 cursor-pointer md:hidden w-7 h-7'>
          {
              open ? <XMarkIcon/> : <Bars3BottomRightIcon />
          }
        </div>
      </div>

      <div className="md:hidden">
        {open && (
           <div className="px-2 md:px-0 py-3 space-y-2 md:space-y-0 md:space-x-2 font-medium text-slate-700">

            {loggedUser ? (
             <>
              <Link
                onClick={() => setOpen(!open)}
                href={'/add-car'}
                className="block md:inline-block px-3 py-2 rounded-md hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
              >
                Add Car
              </Link>
         
              <Link
                onClick={() => setOpen(!open)}
                href="/profile"
                className="block md:inline-block px-3 py-2 rounded-md hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
              >
                Profile
              </Link>
              <Link
                href="/"
                className="block md:inline-block px-3 py-2 rounded-md hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
                onClick={() =>
                  signOut({
                    callbackUrl: `/`
                  }) 
                }
             >
                Sign Out
              </Link>
             </>
           ) : (
             <>
             <Link href={'/user/login'}>
             <CustomBtn 
               title='Sign In'
               btnType= "Sign In | Log In"
               optionStyles='text-black bg-white-700 hover:bg-gray-200 text-blue-600 dark:text-blue-50 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
               />
             </Link>
             </>
           )}
         </div>
        )}
      </div>
    </nav>
   );
};

export default Navbar;