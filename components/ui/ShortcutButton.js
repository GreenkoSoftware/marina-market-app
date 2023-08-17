'use client'
import SettingModal from "./ SettingsModal";
import {  useDisclosure } from "@nextui-org/react";
import { AiOutlineSetting } from 'react-icons/ai';

export default function ShortcutButton() {
const { isOpen, onClose,onOpen } = useDisclosure();
  return (
    <div>
    <button
        aria-label='Toggle Dark Mode'
        type='button'
        className='flex items-center justify-center rounded-lg pt-2 hover:bg-zinc-100 dark:hover:bg-zinc-700'
        onClick={(onOpen)}
    >
        <AiOutlineSetting className="w-11 h-11 fill-primary-500 dark:fill-primary-200 cursor-pointer"
           
        />
    </button> 
    <SettingModal isOpen={isOpen} onClose={onClose}/>
    </div>
  )
}
