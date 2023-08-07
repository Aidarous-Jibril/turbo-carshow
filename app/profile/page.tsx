"use client"

import React, { useState, useEffect, ChangeEvent } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { useSession } from 'next-auth/react'
import { toast } from 'react-hot-toast'

import { CarProps } from '@/types'
import CarCardSkeleton from '@/components/skeleton/CarCardSkeleton'


const Profile = () => {
    const { data: session } = useSession();
    console.log('SESSION',session)
    const router = useRouter()
    //state
    const [cars, setCars] = useState<CarProps[]>([])
    const [isLoading, setIsLoading] = useState(false)
    // const [acceptedFiles, setAcceptedFiles] = useState<File>()    
    const [coverImgSource, setCoverImgSource] = useState< string | null>(null)

    useEffect(() => {
        console.log(session)
       if(!session?.user && cars.length ===0 ){
        router.push('/')
       }
    }, [session?.user, cars])

    //Fetch user profile
    useEffect(() => {
        const getUserProfile = async () => {
            try {
                const response = await fetch(`/api/profile-route/${session?.user?.id}`);
                console.log(response)
                if (!response.ok) {
                    throw new Error('Can not fetch the user profile data');
                    router.push('/')
                }
                const userProfile = await response.json();
                console.log(userProfile)
                setCoverImgSource(userProfile.coverImage);
            } catch (error) {
                // Handle the error and provide appropriate user feedback
                console.error(error);
                // Display an error message to the user
                toast.error('Failed to fetch user profile data. Please try again later.')
            }
        }
// getUserProfile()
        toast.promise(getUserProfile(), {
            loading: 'Fetching user profile...',
            success: 'Fetched user profile successfully.',
            error: 'Failed to fetch user profile.',
        });

    }, [session?.user?.id, cars]);

    // Fetch cars that associated to specific user 
       useEffect(() => {
        const getUserCars = async () => {
            try {
                const response = await fetch(`/api/car-route/user/${session?.user?.id}`);
                // console.log(response)
                if (!response.ok) {
                    throw new Error('Can not fetch the user profile data');
                }
                const userCars = await response.json();
                setCars(userCars)
            } catch (error) {
                // Handle the error and provide appropriate user feedback
                console.error(error);
                // Display an error message to the user
                toast.error('Failed to fetch user profile data. Please try again later.')
            }
        }

        toast.promise(getUserCars(), {
            loading: 'Fetching user cars...',
            success: 'Fetched user`s cars successfully.',
            error: 'Failed to fetch user`s cars.',
        });

    }, [session?.user?.id]);
    // console.log(cars)

    // delete car
    const handleDelete = async (_id: string | undefined) => {
        console.log(_id)
        const confirmDelete = confirm('Do you really want to delete?');
        if (!confirmDelete) return;
        toast.promise(
            (async () => {
                try {
                    const res = await fetch(`/api/car-route/user/${_id}`, {
                        method: 'DELETE',
                    });
                    if (!res.ok) {
                        throw new Error('Failed to delete.');
                        return;
                    } 
                    setTimeout(() => {
                        router.push('/')
                    }, 2000)
                
                } catch (error) {
                    console.error(error);
                    throw error;
                }
            })(),
            {
                loading: 'Deleting...',
                success: 'Deleted successfully.',
                error: (error) => error.message,
            }
        );
    };

    const isDataEmpty = !Array.isArray(cars) || cars.length < 1 || !cars;

  return (
    <div className="p-0">
      <div className="p-8 bg-white shadow mt-24 ">
            <div className="grid grid-cols-1 md:grid-cols-3">
                <div className="grid grid-cols-3 text-center order-last md:order-first mt-20 md:mt-0">
                    <div>
                        <p className="font-bold text-gray-700 text-xl">{cars.length}</p>
                        <p className="text-gray-400">Cars</p>
                    </div>
                </div>
                <div className="relative">
                    <div className="w-48 h-48 bg-indigo-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500">
                         <Image
                            src={session?.user?.image || '/assets/images/user.svg'}
                            alt='Profile Picture'
                            width={100}
                            height={100}
                            className='cursor-pointer objcet-contain rounded-full'
                        />
                    </div>
                </div>

            </div>

            <div className="mt-20 text-center border-b pb-12">
                <h1 className="text-4xl font-medium text-gray-700"> {session?.user?.name} </h1>
                <p className="font-light text-gray-600 mt-3"> {session?.user?.email} </p>
            </div>

        <div className='mt-12 p-2'>
            {
                (isDataEmpty && ((!isLoading))) ? (
                    <h1>Add your first car...</h1>
                ) : 
                <>
                <h1 className='text-lg md:text-2xl font-bold'>My Cars</h1>
                    <div className='home__cars-wrapper'>
                        {cars?.map((car, index) => (
                            <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow hover:scale-105 duration-300 dark:bg-gray-800 dark:border-gray-700">
                                <div className="w-full h-64 rounded-b-lg bg-cover bg-center" style={{ backgroundImage: `url(${car.imageFiles})` }} />
                                
                                <div className="p-5">
                                    <a href="#">
                                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"> { car.carTitle}</h5>
                                    </a>
                                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{car.shortDescription}.</p>
                                    <h3 className='text-green-700 sm:mt-4 text-2xl '>${car.rentPrice}</h3>
                                    <div className="flex justify-between gap-7 p-6 pt-2">
                                    <div className="flex flex-col text-xl justify-center items-center gap-2">
                                        <Image src='./steering-wheel.svg' width={20} height={20} alt='car-wheel' className='justify-center items-center' />
                                        <p className='text-slate-400 text-[14px]'>{car.transmission === 'a' ? 'Automat' : 'Manual'}</p>
                                        </div>
                                        <div className="flex flex-col text-xl justify-center items-center gap-2" >
                                        <Image src='./tire.svg' width={20} height={20} alt='car-wheel' className='justify-center items-center' />
                                        <p className='text-slate-400 text-[14px]'>{car.drive.toUpperCase()}</p>
                                        </div>
                                        <div className="flex flex-col text-xl justify-center items-center gap-2">
                                        <Image src='./gas.svg' width={20} height={20} alt='car-wheel' className='justify-center items-center' />
                                        <p className='text-slate-400 text-[14px]'>{car.city_mpg} MPG</p>
                                        </div>  
                                    </div>

                                    <div className='flex justify-between'>
                                        {/* <button className="bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-4 border rounded-lg">
                                            Edit
                                        </button> */}

                                        <button 
                                            onClick={() => handleDelete(car._id)}
                                                className="bg-red-700 hover:bg-red-800 text-white font-bold py-2 px-4 border rounded-lg">
                                                Delete
                                        </button>
                                    </div>
                                </div>
                            </div>

                            ))
                        }
                    </div>

                </>
            }
            {
                isLoading && <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-2'>
                    {
                        Array(8).fill(0).map((_, i) => (
                            <CarCardSkeleton key={i} />
                        ))
                    }
                </div>
            }
        </div>

        </div>
    </div>
)
  
}

export default Profile