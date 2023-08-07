"use client"

import React, {Fragment, useState } from 'react'
import { CustomFilterProps } from '@/types'
import { Listbox, Transition } from '@headlessui/react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { updateSearchParams } from '@/utils'


const CustomFilters = ({ title, options}: CustomFilterProps) => {
  const [selected, setselected] = useState(options[0])
  const router = useRouter( )

  const handleUpdateParams = (e: {title: string, value: string }) => {
    const newPathName = updateSearchParams(title, e.value.toLowerCase());

    router.push(newPathName, {scroll: false} );
  }

  return (
    <div className='w-fit  z-10'>
      <Listbox
        value={selected}
        onChange={(e) => {
          setselected(e), 
          handleUpdateParams(e)
        }}
      >
        <div className='relative w-fit '>
          <Listbox.Button className='custom-filter__btn'>
            <span className='block truncate'>{selected.title}</span>
            <Image 
              src='/chevron-down.svg'
              alt='chevron-arrow' 
              width={20} 
              height={20}
              className='object-contain'
              />
          </Listbox.Button>

          <Transition
            as={Fragment}
            leave='transition ease-in duration-100'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Listbox.Options className='custom-filter__options'>
              {options.map((option) => (
                <Listbox.Option
                  key={option.title}
                  value={option}
                  className={({active}) => `relative px-4 py-2 cursor-pointer select-none ${active ? 'bg-primary-blue text-white': 'text-gray-800'}`}
                >
                  {({ selected }) => (
                    <span className='block truncate '>{option.title}</span>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  )
}

export default CustomFilters