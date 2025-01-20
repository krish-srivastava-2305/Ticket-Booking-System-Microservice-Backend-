'use client'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

const page = () => {
  const router = useRouter();

  useEffect(() => {
    const handleSignOut = async () => {
        try {
            const response = await axios.post('https://ticketing.dev/api/users/signout');
            if(response.status === 200) {
                router.push('/');
            }
        } catch (error) {
            console.error('Sign out failed:', error);
        }
      }
      handleSignOut()
  }, [])

  return (
    <div className='flex justify-center items-center h-screen'>
      <h1 className='text-2xl font-bold text-white'>Signing out...</h1>
    </div>
  )
}

export default page
