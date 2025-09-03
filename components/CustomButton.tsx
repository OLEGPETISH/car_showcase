"use client";

import { CustomButtonProps } from '@/types';
import Image from 'next/image';

const CustomButton = ({title,containerStyles,handleClick}: CustomButtonProps) => {
  return (
<button
    disabled={false}
    type="button"
    className={`bg-primary-blue text-white font-bold py-2 px-4 rounded ${containerStyles}`}
    onClick = {handleClick}
    >
<span className = 'flex-1'>
{title}
</span>
</button>
)
}

export default CustomButton;