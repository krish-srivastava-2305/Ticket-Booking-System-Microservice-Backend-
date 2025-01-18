'use client'
import { useRouter } from 'next/navigation'
import React from 'react'

const Header = ({isLoggedIn}: {isLoggedIn: boolean | null}) => {
    const router = useRouter();

    const handleSignOut = () => {
        router.push('/auth/signout');
    }

    const handleSignIn = () => {
        router.push('/auth/signin');
    }

    const handleSignUp = () => {
        router.push('/auth/signup');
    }
  return (
    <div className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <h1 className="text-2xl font-bold">GetYourSeat</h1>
      <div className="space-x-4">
        {isLoggedIn === null ? (
          // Loading state
          <div>Loading...</div>
        ) : isLoggedIn ? (
          // Logged in state
          <button 
            className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded"
            onClick={handleSignOut}
          >
            Sign Out
          </button>
        ) : (
          // Logged out state
          <>
            <button 
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded"
              onClick={handleSignIn}
            >
              Sign In
            </button>
            <button 
              className="px-4 py-2 bg-green-500 hover:bg-green-600 rounded"
              onClick={handleSignUp}
            >
              Sign Up
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default Header
