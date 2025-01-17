"use client"
import React, { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import toast, { Toaster } from 'react-hot-toast'

const SignUpPage = () => {
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [confirmPassword, setConfirmPassword] = useState<string>("")
  const [error, setError] = useState<[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
        setLoading(true)
        if (password !== confirmPassword) {
            toast.error("Passwords do not match")
            return
        }
        const res = await axios.post("https://ticketing.dev/api/users/signup", {
            email,
            password
        })
        router.push("/auth/signin")
        
    } catch (error: any) {
        setError(error.response.data.errors)
        error.response.data.errors.forEach((err: { message: string }) => {
            toast.error(err.message)
        })
    } finally {
        setLoading(false)
        setEmail("")
        setPassword("")
        setConfirmPassword("")
        setError([])
    }
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-black to-gray-900 flex items-center justify-center">
      <Toaster position="top-right" />
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-2xl">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-white">Sign Up</h1>
          <p className="text-gray-400">Welcome to the Ticketing Platform</p>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                Email Address
                </label>
                <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="mt-1 block w-full px-3 py-2 bg-gray-700/50 border border-gray-600 text-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400"
                placeholder="john@example.com"
                onChange={(e) => setEmail(e.target.value)}
                />
            </div>

            <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                Password
                </label>
                <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                className="mt-1 block w-full px-3 py-2 bg-gray-700/50 border border-gray-600 text-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400"
                placeholder="••••••••"
                onChange={(e) => setPassword(e.target.value)}
                />
            </div>

            <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300">
                Confirm Password
                </label>
                <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                className="mt-1 block w-full px-3 py-2 bg-gray-700/50 border border-gray-600 text-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400"
                placeholder="••••••••"
                onChange={(e) => setConfirmPassword(e.target.value)}
                />
            </div>

            <button
                disabled={loading}
                type="submit"
                className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
            >
                {loading ? "Loading..." : "Create Account"}
            </button>
        </form>
        <div className="text-center text-sm text-gray-400">
          Already have an account?{' '}
          <a href="/auth/signin" className="text-blue-400 hover:text-blue-300">
            Login here
          </a>
        </div>
      </div>
    </div>
  )
}

export default SignUpPage

