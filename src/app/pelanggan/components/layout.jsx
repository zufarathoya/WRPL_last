'use client'
import React, { ReactNode } from 'react'
import Sidebar from './sidebar'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
// import HomePage from '@/app/home/page'


const Layout = ({ children }) => {
  const router = useRouter()
  const { data: session, status } = useSession()
  if (status === 'loading') {
    return (
      <div className='flex items-center justify-center h-screen w-screen bg-gray-100'>
        <h1 className='text-3xl font-bold'>Loading...</h1>
      </div>
    )
  }
  if (!session || session.user.role !== 'pelanggan') {
    return router.push('/authentication/login')
  }
  return (
    <div className="h-screen flex flex-row justify-start">
      <div className="fixed-sidebar">
        <Sidebar />
      </div>
      <div className="flex-1 w-full overflow-y-auto border-dashed">
        <div className="p-4">{children}</div>
      </div>
    </div>
  )
}
export default Layout