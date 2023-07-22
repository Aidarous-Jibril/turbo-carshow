"use client"

import React from 'react'

import { useRouter } from 'next/navigation'
import { ShowMoreProps } from '@/types'
import CustomBtn from './CustomBtn'
import { updateSearchParams } from '@/utils'

const ShowMore = ({ pageNumber, isNextPage } : ShowMoreProps) => {
    const router = useRouter()

    const handleNavigation = () => {
        // get limit each time btn is clicked and then +10 since limit is default set to 10
        const getLimit =  (pageNumber + 1) * 10;
        const newPathName = updateSearchParams('limit', `${getLimit}`);

        router.push(newPathName)
    }
  return (
    <div className='w-full gap-5 flex items-center justify-center mt-12'>
        {!isNextPage && (
            <CustomBtn 
                title='Show More'
                btnType='button'
                optionStyles='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full'
                handleClick={handleNavigation}
            />
        )}
    </div>
  )
}

export default ShowMore