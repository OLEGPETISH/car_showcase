"use client";

import { CustomButtonProps } from '@/types';
import React from 'react';

const CustomButton = ({ title, containerStyles, handleClick, btnType }: CustomButtonProps) => {
  return (
    <button
      type={btnType || "button"}
className={`flex items-center justify-center font-bold py-2 px-6 min-w-[130px] ${containerStyles}`}
      onClick={handleClick}
    >
      {title}
    </button>
  );
};

export default CustomButton;
