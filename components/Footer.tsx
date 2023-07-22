import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { footerLinks } from '@/constants'
// fixed left-0 right-0 bottom-0
const Footer = () => {
  return (
    <footer className="bg-white rounded-lg shadow   dark:bg-gray-900 mt-4">
        <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
            <div className="sm:flex sm:items-center sm:justify-between">
                <Link href="/next.config.js" className="flex items-center mb-4 sm:mb-0">
                    <Image src="/logo-footer.png" className="h-8 mr-3" alt="Flowbite Logo" width={120} height={120}/>
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white" ></span>    
                </Link>

                <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
                    <li>
                        {footerLinks.map((item) => (
                            
                        <a href="#" className="mr-4 hover:underline md:mr-6 ">{item.title}</a>
                        ))}
                    </li>
                </ul>
            </div>
            <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
            <span className="block text-sm text-gray-700 sm:text-center dark:text-gray-400">© 2023 <a href="#" className="hover:underline">TurboCar</a>. All Rights Reserved.</span>
        </div>
    </footer>


  )
}

export default Footer