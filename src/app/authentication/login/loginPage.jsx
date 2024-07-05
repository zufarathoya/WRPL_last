'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'

const LoginPage = ({ csrfToken }) => {
    const [error, setError] = useState('')
    const [isloading, SetIsLoading] = useState(false)
    const router = useRouter()
    const handleSubmit = async (event) => {
        SetIsLoading(true)
        event.preventDefault()
        try{
            const res = await signIn('credentials', {
                username: event.currentTarget.username.value,
                password: event.currentTarget.password.value,
                redirect: false,
                callbackUrl: '/'
            })
            if (!res.error) {
                event.target.reset()
                SetIsLoading(false)
                router.push('/')
            }
            else {
                SetIsLoading(false)
                setError('Login failed')
            }
        } catch (err) {
            setError('Login failed')
        }
    }
  return ( 
    <div className="bg-gray-100 h-screen flex items-center justify-center">
        <div className="max-w-md w-full bg-white p-8 rounded shadow-md">
            <h1 className="text-4xl font-bold mb-8 float-center">Beauty Heaven</h1>
            <h2 className="text-2xl font-bold mb-8">Login</h2>
            <div className="text-red-400">{error}</div>
            <form method="post" onSubmit={handleSubmit}>
                <input type="hidden" name="csrfmiddlewaretoken" value={csrfToken} />
                <div className="mb-4">
                    <label for="username" className="block text-gray-700 text-sm font-bold mb-2">Username:</label>
                    <input 
                        type="text" 
                        id="username" 
                        name="username" 
                        className="border border-gray-400 rounded w-full py-2 px-3" 
                        placeholder='username'
                        required
                    />
                </div>
                <div className="mb-4">
                    <label for="password" className="block text-gray-700 text-sm font-bold mb-2">Password:</label>
                    <input 
                        type="password" 
                        id="password" 
                        name="password" 
                        className="border border-gray-400 rounded w-full py-2 px-3" 
                        placeholder='********'
                        required
                    />
                </div>
                <div className='static'>
                    <Link href='./register' className='inline-block hover:text-blue-600'>belum punya akun? register</Link>
                    <div className="inline-block float-right">
                        <button disabled={isloading} type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer">
                            {isloading ? '...Loading' : 'Login'}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    </div>
  )
}

export default LoginPage