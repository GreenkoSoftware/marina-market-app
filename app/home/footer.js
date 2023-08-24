'use client'
import React from 'react'
import UserAvatar from '../../components/ui/UserAvatar'

export default function SettingFooter () {
  return (
    <div className="grid grid-cols-2 gap-4 sm:flex-row-reverse sm:flex pl-4">
      <div className="col-span-1 col-start-1 col-end-7">
        <UserAvatar userName={'Rodrigo Olivares'} userType = {'Administrador'}/>
      </div>
    </div>
  )
}
