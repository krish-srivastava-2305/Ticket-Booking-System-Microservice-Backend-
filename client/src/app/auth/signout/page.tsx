'use client'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

const page = () => {
  const router = useRouter();

  useEffect(() => {
    const handleSignOut = async () => {
        try {
            const response = await axios.post('/api/users/signout');
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
    <div>
      
    </div>
  )
}

export default page
