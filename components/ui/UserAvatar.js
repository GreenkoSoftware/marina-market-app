'use client'
import React,{ useState,useEffect } from "react";
import { Card, CardHeader, Avatar, Button } from "@nextui-org/react";
import useAuthStore from "@/stores/user";
import ThemeButton from "./ThemeButton";
import ShortcutButton from "./ShortcutButton";

export default function UserAvatar() {
  const [userName,setUserName ] = useState(null)
  const [admin,setAdmin ] = useState(false)
  const { fullName, isAdmin } = useAuthStore(({ fullName, isAdmin }) => ({ fullName, isAdmin }))

  const { signOut } = useAuthStore(({ signOut }) => ({ signOut }))
useEffect(()=>{
  if(fullName){
    setUserName(fullName)
    setAdmin(isAdmin)
  }
},[fullName])
  return (
    <div className="flex w-full">
      <Card className="flex gap-1">
      <CardHeader className="justify-between space-x-3">
        <div className="flex gap-5">
          <Avatar isBordered color="warning" radius="full" size="md" src="/avatars/avatar-1.png" />
          <div className="flex flex-col gap-1 items-start justify-center">
            <h4 className="text-small font-semibold leading-none text-default-600">{userName?.toUpperCase() }</h4>
            <h5 className="text-small tracking-tight text-default-400">{admin ? 'Administrador' : 'Trabajador'}</h5>
          </div>
        </div>
        <div className="col-start-1 col-end-1">
          <ThemeButton/>
        </div>
        <div className="col-start-2 col-end-2">
          <ShortcutButton />
        </div>
        <Button
          className={"bg-transparent text-foreground border-default-200"}
          color="primary"
          radius="full"
          size="sm"
          variant={"solid"}
          onClick={() => signOut()}
        >
          {"Cerrar Sesion"}
        </Button>
      </CardHeader>
    </Card>
    </div>
  );
}