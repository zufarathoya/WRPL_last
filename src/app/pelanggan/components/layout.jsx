import React, { ReactNode } from 'react'
import Sidebar from './sidebar'
// import HomePage from '@/app/home/page'


const Layout = ({ children }) => {
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