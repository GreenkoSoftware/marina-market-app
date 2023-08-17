'use client'
import React from "react";
import ShortcutButton from "./ShortcutButton";
import ThemeButton from "./ThemeButton";
import UserAvatar from "./UserAvatar";

export default function SettingFooter() {
  
  return (
    <div className="flex-row-reverse flex gap-4"> 
    <UserAvatar userName={"Rodrigo Olivares"} userType = {"Administrador"}/>   
    <ThemeButton/>
    <ShortcutButton/>
    </div>
  );
}
