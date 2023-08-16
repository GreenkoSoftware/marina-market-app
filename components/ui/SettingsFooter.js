'use client'
import React from "react";
import { AiOutlineSetting } from 'react-icons/ai';

export default function SettingFooter() {
  return (
    <div className={'flex flex-row-reverse'}>   
        <AiOutlineSetting className="sm:w-20 sm:h-20  w-10 h-10 fill-primary-500 cursor-pointer"
            onClick={()=> console.log("a")}
        />
    </div>
  );
}
