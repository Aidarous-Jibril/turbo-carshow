"use client"

import React, {Fragment, } from 'react'
import Image from 'next/image'
import { CarProps } from '@/types'

// import { Dialog, Transition } from '@headlessui/react'
import { generateCarImageUrl } from '@/utils'

interface CarDetailsProps {
    showModal: boolean,
    closeModal: (showModal: boolean) => void,
    car: CarProps
}

const CarDetails = ({ showModal, closeModal, car }: CarDetailsProps) => {
  return (
    <>
    {/* <Transition appear show={showModal} as={Fragment}>
        <Dialog onClose={closeModal} as='div' className='relative z-10'>
            <Transition.Child 
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0'
                enterTo='opacity-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100'
                leaveTo='opacity-0'
            >
                <div className='fixed inset-0 bg-black bg-opacity-25' />
            </Transition.Child>

            <div className='fixed bg-black bg-opacity-25 inset-0'>
                <div className='flex justify-center items-center min-h-full p-4 text-center'>
                <Transition.Child 
                    as={Fragment}
                    enter='ease-out duration-300'
                    enterFrom='opacity-0 scale-95'
                    enterTo='opacity-100 scale-100'
                    leave='ease-in duration-200'
                    leaveFrom='opacity-100 scale-100'
                    leaveTo='opacity-0 scale-95'
                >
                    <Dialog.Panel
                        className='relative flex flex-col w-full max-w-full max-h-[90vh] overflow-y-hidden bg-white text-white gap-5'
                    >
                        <button>
                            <Image src='./close.svg'  width={20} height={20} alt='close modal'/>
                        </button>
                    </Dialog.Panel>
                </Transition.Child>
                </div>
            </div>
        </Dialog>
    </Transition> */}

{showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-4 border-b border-solid border-slate-200 rounded-t">
                  <div className="relative w-full h-40 rounded-lg bg-pattern bg-center bg-cover ">
                    <Image src={generateCarImageUrl(car)} fill alt='hero-img' className='object-contain' />
                  </div>
                </div>
                <div className='flex gap-4 p-4 '>
                    <div className='relative flex-1 w-full h-24 bg-red-100 rounded-lg'>
                        <Image src={generateCarImageUrl(car, "13")} fill alt='hero-img' className='object-contain' />
                    </div>
                    <div className='relative flex-1 w-full h-24 bg-red-100 rounded-lg'>
                        <Image src={generateCarImageUrl(car, "29")} fill alt='hero-img' className='object-contain' />
                    </div>
                    <div className='relative flex-1 w-full h-24 bg-red-100 rounded-lg'>
                        <Image src={generateCarImageUrl(car, "33")} fill alt='hero-img' className='object-contain' />
                    </div>
                </div>
                
                {/*body*/}
                <div className="relative p-6 flex-auto">
                <h3 className="text-3xl font-semibold">{car.manufacturer}{ } {car.model}</h3>

                <div className='mt-3 flex flex-wrap  gap-1'>
                    {Object.entries(car).map(([key, value]) => (
                      <div className='flex justify-between gap-5 w-full text-right' key={key} >
                        <h4 className='text-grey capitalize'>
                          {key.split("_").join(" ")}
                        </h4>
                        <p className='text-black-100 font-semibold'>
                          {value}
                        </p>
                      </div>
                    )).slice(2)}
                  </div>

                </div>
                {/*footer*/}
                <div className="flex items-center justify-end border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => closeModal(false)}
                  >
                    Close
                  </button>
   
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}

    </> 
  )
}

export default CarDetails