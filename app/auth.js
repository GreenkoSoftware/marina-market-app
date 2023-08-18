'use client'
import React, { useEffect } from 'react';
import useAuthStore from '@/stores/user';
import { redirect, useRouter } from 'next/navigation';

export default function Auth () {
  const router = useRouter()
  const token = useAuthStore((state) => state.token)
  var path = window.location;

  useEffect(() => {
    if(!token) {
      router.push('/login')
    }else if(path.pathname === '/') {
      router.push('/home')
    }
  },[token])
  
  return (<></>)
}
