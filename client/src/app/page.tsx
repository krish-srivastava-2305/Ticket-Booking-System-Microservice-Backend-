'use client'
import Header from "@/components/Header";
import { fetchUser } from "@/util/fetchCookie";
import { useEffect, useState } from "react";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(false)
  
  // useEffect(() => {
  //   const token = fetchUser()
  //   if(token !== null) {
  //     setIsLoggedIn(true)
  //   } else {
  //     setIsLoggedIn(false)
  //   }
  // }, [])

  return (
    <div className="h-screen w-full bg-black">
      <Header isLoggedIn={isLoggedIn} />
      <h1 className="text-white font-bold text-2xl">hello</h1>
      <p className="text-white">Login status: {isLoggedIn ? 'Logged In' : 'Not Logged In'}</p>
    </div>
  );
}
