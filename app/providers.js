'use client'
import { NextUIProvider } from '@nextui-org/react'
import { ThemeProvider } from 'next-themes'
import { SessionProvider } from 'next-auth/react'
export function Providers({ children }) {
  return (
    <ThemeProvider attribute='class'>
    <SessionProvider>
      <NextUIProvider>
      {children}
      </NextUIProvider>
      </SessionProvider>
    </ThemeProvider>
   
  )
}