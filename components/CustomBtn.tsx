'use client'
import React from 'react'
import { CustomBtnProps } from '@/types'


const CustomBtn = ({ title, btnType, optionStyles, icon, handleClick}: CustomBtnProps) => {
  // console.log(handleClick, 'click')
  return (
    <button
        disabled={false}
        title={btnType || "button"}
        className={optionStyles}
        onClick={handleClick}
    >
        {title}
    </button>
  )
}

export default CustomBtn