"use client";
import { CarProps } from '@/types'
import Link from 'next/link';
import { useEffect, useState } from "react";
import CarCard from './CarCard';
import CarCardSkeleton from './skeleton/CarCardSkeleton';
import Image from 'next/image';
import CustomBtn from './CustomBtn';


export default function LatestAddedCars() {
    const [cars, setCars] = useState<CarProps[]>()
    const [loading, setloading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
          const response = await fetch("http://localhost:3000/api/car-route");
          const data = await response.json();
          setCars(data);
          setloading(false)
        };
    
        fetchData();
      }, []);
console.log(cars)
  return (
        <div className='grid lg:grid-cols-3 gap-12'>
            {
                (cars?.length === 0 && (!loading)) ?
                (<p className='text-center text-xl w-full'>No cars found</p>) :
                (
                    cars?.reverse()?.map((car, i) => (
                        <div key={car._id} className="block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
                            {/* <div
                                className="relative overflow-hidden bg-cover bg-no-repeat"
                                data-te-ripple-init
                                data-te-ripple-color="light"> */}
                                <img 
                                    className="p-0 rounded-t-lg" 
                                    src={car.imageFiles[0] || car.imageFiles[1]} 
                                    alt="product image" 
                                />
                                <a href="#!">
                                    <div
                                        className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-[hsla(0,0%,98%,0.15)] bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100">
                                    </div>
                                </a>
                            {/* </div> */}
                            <div className="p-6">
                                <h5
                                className="mb-2 text-2xl font-bold leading-tight text-neutral-800 dark:text-neutral-50">
                                {car.carTitle}
                                </h5>
                                <h4 className="mb-4 text-base text-lime-600 font-bold dark:text-neutral-200"> ${car.rentPrice.toFixed()} </h4>
                                <p className='text-gray-600 md:text-sm'>{car.shortDescription}</p>
                            </div>
                            <div className="flex justify-between gap-7 p-6 pt-2">
                                <div className="flex flex-col text-xl justify-center items-center gap-1">
                                <Image src='./steering-wheel.svg' width={20} height={20} alt='car-steering' className='justify-center items-center' />
                                <p className='text-slate-400 text-[14px]'>{car.transmission === 'a' ? 'Automat' : 'Manual'}</p>
                                </div>
                                <div className="flex flex-col text-xl justify-center items-center gap-1" >
                                <Image src='./tire.svg' width={20} height={20} alt='car-wheel' className='justify-center items-center' />
                                <p className='text-slate-400 text-[14px]'>{car.drive.toUpperCase()}</p>
                                </div>
                                <div className="flex flex-col text-xl justify-center items-center gap-1">
                                <Image src='./gas.svg' width={20} height={20} alt='car-gas' className='justify-center items-center' />
                                <p className='text-slate-400 text-[14px]'>{car.cityMPG} MPG</p>
                                </div>  
                            </div>
                            <div className="flex justify-between gap-7 p-6 pt-2">
                                <div className="flex flex-col text-xl justify-center items-center gap-1" >
                                    <Image src='./location.svg' width={20} height={20} alt='car-wheel' className='justify-center items-center' />
                                    <p className='text-slate-400 text-[14px]'>{car.location}</p>
                                </div>
                                <div className="flex flex-col text-xl justify-center items-center gap-1" >
                                    <Image src='./calendar.svg' width={20} height={20} alt='car-wheel' className='justify-center items-center' />
                                    <p className='text-slate-400 text-[14px]'>{car.year}</p>
                                </div>
                                <div className="flex flex-col text-xl justify-center items-center gap-1">
                                    <Image src='./landmark.svg' width={20} height={20} alt='car-gas' className='justify-center items-center' />
                                    <p className='text-slate-400 text-[14px]'>{car.typeOfclass} </p>
                                </div>  
                            </div>
                            </div>
                        ))
                        )
                    }
            {
                loading && (
                    Array(8).fill(0).map((_, i) => <CarCardSkeleton key={i} />)
                    )
                }

        </div>
           
  );
}
