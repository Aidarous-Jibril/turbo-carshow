"use client";

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

import CustomBtn from './CustomBtn'


const Navbar = () => {
  return (
    // <header className='w-full z-10'>
    //     <nav className='flex justify-between items-center max-w-[1440px] mx-auto sm:px-16 px-6 py-6'>
    //         <Link 
    //             href='/'
    //             className='flex justify-center items-center'>
    //                 <Image 
    //                     src='/logo2.png'
    //                     alt='Car Zone'
    //                     width={118}
    //                     height={18}
    //                     className='object-contain'
    //                  />   
    //         </Link>

    //         <CustomBtn 
    //             title='Sign In'
    //             btnType= "Sign In | Log In"
    //             optionStyles='text-black bg-white-700 hover:bg-gray-200 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
    //         />
    //     </nav>
    // </header>
    
    <>
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
            <Link href="" className="flex items-center">
                <span className="self-center text-2xl font-semibold whitespace-nowrap text-indigo-700 dark:text-red">TurboCar</span> 
            </Link>
            <div className="flex items-center">
                <CustomBtn 
                 title='Search'
                 btnType= "Search"
                 optionStyles='mr-6 text-sm  text-gray-500 dark:text-white hover:underline'
             />
              <Link href={'/user/login'}>
                {/* <CustomButton title='Login' type='button' containerStyle='bg-white rounded-full border text-blue-500 w-full rounded-full dark:bg-pink-700 dark:text-slate-300 dark:border-slate-700 dark:text-slate-300' /> */}
                <CustomBtn 
                 title='Sign In'
                 btnType= "Sign In | Log In"
                 optionStyles='text-black bg-white-700 hover:bg-gray-200 text-blue-600 dark:text-blue-50 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
             />
              </Link>
            </div>
        </div>
    </nav>
  
    </>

  )
}


export default Navbar

