"use client"

import { CarProps } from '@/types'
import React, { useState } from 'react'

import CustomBtn from './CustomBtn'
import { calculateCarRent, generateCarImageUrl } from '@/utils'
import Image from 'next/image'
import CarDetails from './CarDetails'

interface carCardProps {
  car: CarProps
}

const CarCard = ({ car } : carCardProps) => {
  const {city_mpg, combination_mpg, cylinders, displacement, drive, fuel_type, highway_mpg,
  make, model,transmission, year } = car

  const [showModal, setShowModal] = useState(false)

  // calculate car rent per day
  const carRent = calculateCarRent(city_mpg, year );
  return (
  <div className=" w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <a href="#">
          <img className="p-8 rounded-t-lg" src={generateCarImageUrl(car)} alt="product image" />
      </a>
      <div className="px-5 pb-5">
          <a href="#">
              <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{make} {model}</h5>
          </a>
        <p className='my-2'>model year: <span className='text-red-900 font-extrabold'>{year}</span> </p>
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
          <Image src='./steering-wheel.svg' width={20} height={20} alt='car-wheel' className='justify-center items-center' />
          <p className='text-slate-400 text-[14px]'>{transmission === 'a' ? 'Automat' : 'Manual'}</p>
        </div>
        <div className="flex flex-col text-xl justify-center items-center gap-2" >
          <Image src='./tire.svg' width={20} height={20} alt='car-wheel' className='justify-center items-center' />
          <p className='text-slate-400 text-[14px]'>{drive.toUpperCase()}</p>
        </div>
        <div className="flex flex-col text-xl justify-center items-center gap-2">
          <Image src='./gas.svg' width={20} height={20} alt='car-wheel' className='justify-center items-center' />
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