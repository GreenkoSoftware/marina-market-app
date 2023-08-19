'use client'
import SettingModal from "./ SettingsModal";
import {  useDisclosure } from "@nextui-org/react";
import { AiOutlineSetting } from 'react-icons/ai';
const ShortcutButton = () => {
 
const { isOpen, onClose,onOpen } = useDisclosure();
  return (
    <button
        aria-label='Toggle Dark Mode'
        type='button'
        className='flex items-center justify-center rounded-lg pt-2 hover:bg-zinc-100 dark:hover:bg-zinc-700'
        onClick={(onOpen)}
    >
        <AiOutlineSetting className="w-10 h-10 fill-primary-500 dark:fill-primary-200"/>
        <SettingModal isOpen={isOpen} onClose={onClose}/>
    </button> 
  )
}
export default ShortcutButton