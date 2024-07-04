'use client'
import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const RegisterPage = ({ csrf_token }) => {
    const router = useRouter()
    const handleSubmit = async (event) => {
        event.preventDefault()
        const fromData  = new FormData(event.currentTarget)
        const username = fromData.get('username')
        const password1 = fromData.get('password1')
        const password2 = fromData.get('password2')
        const email = fromData.get('email')
    
        const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password1, password2 }),
        })
    
        if (response.ok) {
            alert('Registration successful')
        } else {
            alert('Registration failed')
        }
        response.status === 201 && router.push('./login')
    }

    return (
        <div class="bg-gray-100 h-screen flex items-center justify-center">
            <div class="max-w-md w-full bg-white p-8 rounded shadow-md">
                <h2 class="text-2xl font-bold mb-8">Register</h2>
                <form method="post" onSubmit={handleSubmit}>
                    <div class="mb-4">
                        <label for="username" class="block text-gray-700 text-sm font-bold mb-2">Username:</label>
                        <input type="text" id="username" name="username" class="border border-gray-400 rounded w-full py-2 px-3" />
                    </div>
                    <div class="mb-4">
                        <label for="email" class="block text-gray-700 text-sm font-bold mb-2">Email:</label>
                        <input type="email" id="email" name="email" class="border border-gray-400 rounded w-full py-2 px-3" />
                    </div>
                    <div class="mb-4">
                        <label for="password1" class="block text-gray-700 text-sm font-bold mb-2">Password:</label>
                        <input type="password" id="password1" name="password1" class="border border-gray-400 rounded w-full py-2 px-3" />
                    </div>
                    <div class="mb-4">
                        <label for="password2" class="block text-gray-700 text-sm font-bold mb-2">Confirm Password:</label>
                        <input type="password" id="password2" name="password2" class="border border-gray-400 rounded w-full py-2 px-3" />
                    </div>
                    <div class="inline-block float-right">
                        <input type="submit" value="Register" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer" />
                    </div>
                    <Link href='./login' class='inline-block hover:text-blue-600'>sudah punya akun? login</Link>
                </form>
            </div>
        </div>
    )
}

export default RegisterPage