"use client";

import { CustomButtonProps } from '@/types';
import React from 'react';
import Image from 'next/image';

const CustomButton = ({ title, containerStyles, handleClick, btnType, textStyles, rightIcon }: CustomButtonProps) => {
  return (
    <button
      type={btnType || "button"}
className={`flex items-center justify-center font-bold py-2 px-6 min-w-[130px] ${containerStyles}`}
      onClick={handleClick}
    >
      <span className={`flex-1 ${textStyles}`}>
        {title}
        </span>
      {rightIcon && (
        <div className="relative w-6 h-6">
          <Image
            src={rightIcon} 
            alt="right icon" 
            fill
            className="object-contain" 
          />
        </div>
      )}
    </button>
  )
}

export default CustomButton;
