'use client'

import React from 'react'
import Image from 'next/image'
import CustomBtn from './CustomBtn'

const Hero = () => {

    const handleScroll = () => {
        
    }
  return (
    <div className='hero '>
        <div className='flex-1 pt-2 padding-x'>
            <h1 className='hero__title'>Find Best Car & Limousine</h1>
            <p className='hero__subtitle '>From as low as $10 per day with limited time offer discounts</p>
            
            <CustomBtn 
                title="Explore"
                optionStyles="bg-blue-500 hover:bg-blue-700 text-white font-bold mt-4 py-2 px-4 rounded-full"
                handleClick={handleScroll}
            />
        </div>

        <div className="hero__image-container  ">
            <div className="hero__image">
                <Image src="/volvo.png" alt="hero" fill className="object-contain" />
            </div>

            <div className="hero__image-overlay" />
        </div>
    </div>
  )
}

export default Hero