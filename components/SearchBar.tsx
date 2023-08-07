"use client"

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

import SearchCarManufacturer from './SearchCarManufacturer'
import Image from 'next/image'
// import { manufacturers } from '@/constants'


const SearchButton = ({ otherClasses}: {otherClasses: string}) =>(
  <button className={` z-10 ${otherClasses}`}>
    <Image 
      src={"/magnifying-glass.svg"}
      width={40}
      height={40}
      alt='magnifying-glass'
      className='object-contain'
    />
  </button>
)

const SearchBar = () => {
    const [make, setMake] = useState('')
    const [model, setModel] = useState('')

    const router = useRouter()

    const handleSerch = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if(make === '' ) {
        return alert('Please choose a car & model')
      }

      updateSearchParams(make.toLocaleLowerCase(), model.toLocaleLowerCase())
    }

    const updateSearchParams = (make: string, model: string) => {
      const searchParams = new URLSearchParams(window.location.search)

      if(make){
        searchParams.set('make', make)
      } else {
        searchParams.delete('make')
      }
      
      if(model){
        searchParams.set('model', model)
      } else {
        searchParams.delete('model')
      }

      // append all search params to the current path name
      const newPathName = `${window.location.pathname}?${searchParams.toString()}`

      router.push(newPathName, {scroll: false} );
    }
  return (
    <form 
      className='flex justify-start items-center max-sm:flex-col w-full relative max-sm:gap-4 max-w-3xl;' 
      onSubmit={handleSerch}
    >
      <div className='flex-1 max-sm:w-full flex justify-start items-center relative'>
        <SearchCarManufacturer 
            make={make}
            setMake={setMake}
        />
        <SearchButton otherClasses='sm:hidden' />
      </div>  

      <div className='flex-1 max-sm:w-full flex justify-start items-center relative'>
        <Image
          src='/model-icon.png'
          width={25}
          height={25}
          className='absolute w-[20px] h-[20px] ml-4'
          alt='model-icon'
        />
        <input 
          type='text'
          value={model}
          onChange={(e) => setModel(e.target.value)} 
          placeholder='model s'
          className='search-manufacturer__input sm:ml-2'
        />
        <SearchButton otherClasses='sm:hidden' />
      </div> 
        
        {/* hide upto max-width: 384px  */}
        <SearchButton otherClasses='max-sm:hidden' />
    </form>
  )
}

export default SearchBar