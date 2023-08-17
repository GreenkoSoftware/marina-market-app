'use client'
import React from "react";
import { AiOutlineSetting } from 'react-icons/ai';
import { Button, useDisclosure } from "@nextui-org/react";
import SettingModal from "./ SettingsModal";

export default function SettingFooter() {
  const { isOpen, onClose,onOpen } = useDisclosure();
  return (
    <div className="flex-row-reverse flex"> 
    <Button isIconOnly color="warning" variant="faded" aria-label="Ajustes" size="lg">
      <AiOutlineSetting className="sm:w-40 sm:h-40 w-10 h-10 fill-primary-500 cursor-pointer"
          onClick={(onOpen)}
      />
    </Button> 
    <SettingModal isOpen={isOpen} onClose={onClose}/>
    </div>
  );
}
