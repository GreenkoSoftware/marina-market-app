'use client'
import React from "react";
import { Card, CardHeader, Avatar, Button } from "@nextui-org/react";
import useAuthStore from "@/stores/user";

export default function UserAvatar( props ) {
  const { userName,userType } = props
  const { signOut } = useAuthStore(({ signOut }) => ({ signOut }))

  return (
    <div className="flex w-full">
      <Card className="flex gap-1">
      <CardHeader className="justify-between">
        <div className="flex gap-5">
          <Avatar isBordered color="warning" radius="full" size="md" src="/avatars/avatar-1.png" />
          <div className="flex flex-col gap-1 items-start justify-center">
            <h4 className="text-small font-semibold leading-none text-default-600">{userName}</h4>
            <h5 className="text-small tracking-tight text-default-400">{userType}</h5>
          </div>
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