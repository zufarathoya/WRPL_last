'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'

const LoginPage = ({ csrfToken }) => {
    const [error, setError] = useState('')
    const router = useRouter()
    const handleSubmit = async (event) => {
        event.preventDefault()
        try{
            const res = await signIn('credentials', {
                username: event.currentTarget.username.value,
                password: event.currentTarget.password.value,
                redirect: false,
                callbackUrl: '/products'
            })
            if (!res.error) {
                router.push('../../pelanggan/products')
            }
            else {
                setError('Login failed')
            }
        } catch (err) {
            setError('Login failed')
        }
    }
  return ( 
    <div class="bg-gray-100 h-screen flex items-center justify-center">
        <div class="max-w-md w-full bg-white p-8 rounded shadow-md">
            <h1 class="text-4xl font-bold mb-8 float-center">Beauty Heaven</h1>
            <h2 class="text-2xl font-bold mb-8">Login</h2>
            <div class="text-red-400">{error}</div>
            <form method="post" onSubmit={handleSubmit}>
                <input type="hidden" name="csrfmiddlewaretoken" value={csrfToken} />
                <div class="mb-4">
                    <label for="username" class="block text-gray-700 text-sm font-bold mb-2">Username:</label>
                    <input type="text" id="username" name="username" class="border border-gray-400 rounded w-full py-2 px-3" />
                </div>
                <div class="mb-4">
                    <label for="password" class="block text-gray-700 text-sm font-bold mb-2">Password:</label>
                    <input type="password" id="password" name="password" class="border border-gray-400 rounded w-full py-2 px-3" />
                </div>
                <div class='static'>
                    <Link href='./register' class='inline-block hover:text-blue-600'>belum punya akun? register</Link>
                    <div class="inline-block float-right">
                        <input type="submit" value="Login" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer" />
                    </div>
                </div>
            </form>
        </div>
    </div>
  )
}

export default LoginPage