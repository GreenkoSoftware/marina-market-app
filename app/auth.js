'use client'
import React from 'react';
import useAuthStore from '@/stores/user';
import Home from './home/page';
import Login from './login/page'
export default function Auth () {
  const token = useAuthStore((state) => state.token)
  return ( !token ? <Home/> : <Login/> )
}
