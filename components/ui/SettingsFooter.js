'use client'
import React from "react";
import { AiOutlineSetting } from 'react-icons/ai';
import { Button } from '@nextui-org/react';

export default function SettingFooter() {
  return (
    <div className="flex-row-reverse flex pr-5"> 
    <Button isIconOnly color="warning" variant="faded" aria-label="Ajustes" size="lg">
      <AiOutlineSetting className="sm:w-20 sm:h-20  w-10 h-10 fill-primary-500 cursor-pointer"
          onClick={()=> console.log("a")}
      />
    </Button> 
    </div>
  );
}
