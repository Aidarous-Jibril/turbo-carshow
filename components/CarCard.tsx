"use client"

import { CarProps } from '@/types'
import React, { useState } from 'react'
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import { useSession } from 'next-auth/react'

import CustomBtn from './CustomBtn'
import { calculateCarRent, generateCarImageUrl } from '@/utils'
import Image from 'next/image'
import CarDetails from './CarDetails'
import { toast } from 'react-hot-toast'

interface carCardProps {
  car: CarProps
}


const CarCard = ({ car } : carCardProps) => {
  const {city_mpg, drive, make, model,transmission, year } = car
  // const carImgUrl: carImgUrlProps[] = car.imageFiles
  const { data: session} = useSession()
  const userId = session?.user?.id;
  

  const [showModal, setShowModal] = useState(false)
  const [like, setLike] = useState(false)
  const [isSaved, setIsSaved] = useState(false)  

  const addToFavorite = async () => {
    console.log(car)

    // const id = uuid()
    try {
          const response = await fetch('/api/favorite-route/add', {
            method: 'POST',
            body: JSON.stringify({
              //  id: uuid(),
              ...car,
              creator: userId,
              isFavorite: true
            })
          })
          if(response.ok){ 
            toast.success('Added to favorite')
          } 
          if(response.status === 409){
            toast.error('Car being added already!')
          }
        } catch (error) {
          console.error(error)
          toast.error('Failed to add the favorite cars')
        }
  }

  // remove from favorite cars
  const removeFromFavorite = async (id: string | undefined) => {
    try {
      const res = await fetch(`/api/favorite-route/remove/${car._id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        toast.success('Removed from favorite');
      }

    } catch (error) {
      console.error(error);
      toast.error('Failed to remove from favorite.');
    }
  }


  const handleFavorCarClick = (id: string | undefined) => {
    if (!userId) {
      toast('Login/sign in to add to favorite 💖');
      return;
    }
    if (like) {
      removeFromFavorite(id);
    } else {
      addToFavorite();
    }
    setLike((prevState) => !prevState);
  }
  
  // calculate car rent per day
  const carRent = calculateCarRent(city_mpg, year );

  return (
    
  <div className=" w-full max-w-sm bg-gray-50 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <a >
          <img 
            className="p-0 rounded-t-lg" 
            src={generateCarImageUrl(car)} 
            // src={car?.imageFiles}
            alt="product image" />
      </a>
      <div className="px-5 pb-5">
        <div className='relative'>
            <a href="#">
                <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{make} {model}</h5>
            </a>
            <p onClick={() => handleFavorCarClick(car._id)}>{like ? <FaHeart className='absolute top-2 right-2 text-red-600 cursor-pointer'/> : <FaRegHeart className='absolute top-2 right-2 text-black-300 cursor-pointer' /> }</p>
        </div>

        <p className='my-2'>Model Year: <span className='text-red-900 font-extrabold'>{year}</span> </p>
          <div className="flex items-center justify-between">
            <div>
              <div className='flex text-[32px] mt-6 font-extrabold'>
              <span className='self-start text-[14px] font-semibold text-red-900'>$</span>
              {carRent}
              <span className='self-end text-[14px] font-medium' >/day</span>
            </div>
            </div>
            <p className='mt-4 text-lime-600'>Free cancelation</p>
          </div>
      </div>

      <div className="flex justify-between gap-7 p-6 pt-2">
        <div className="flex flex-col text-xl justify-center items-center gap-2">
          <Image src='./steering-wheel.svg' width={20} height={20} alt='car-steering' className='justify-center items-center' />
          <p className='text-slate-400 text-[14px]'>{transmission === 'a' ? 'Automat' : 'Manual'}</p>
        </div>
        <div className="flex flex-col text-xl justify-center items-center gap-2" >
          <Image src='./tire.svg' width={20} height={20} alt='car-wheel' className='justify-center items-center' />
          <p className='text-slate-400 text-[14px]'>{drive.toUpperCase()}</p>
        </div>
        <div className="flex flex-col text-xl justify-center items-center gap-2">
          <Image src='./gas.svg' width={20} height={20} alt='car-gas' className='justify-center items-center' />
          <p className='text-slate-400 text-[14px]'>{city_mpg} MPG</p>
        </div>  
    </div>

    <div className='p-4'>
      <CustomBtn 
        title='View More' 
        btnType='button' 
        optionStyles='w-full bg-blue-500 hover:bg-blue-700 text-white font-bold uppercase text-sm px-6 py-3 rounded-lg'
        handleClick={() => setShowModal(true)}
      />
    </div>


    <CarDetails
      showModal={showModal}
      closeModal={() => setShowModal(false)}
      car={car}
      />

  </div>

  )
}

export default CarCard