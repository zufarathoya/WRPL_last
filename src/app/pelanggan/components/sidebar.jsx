'use client';
import React, {useState} from 'react';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import LogoutIcon from '@mui/icons-material/Logout';
import classNames from 'classnames';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { signOut } from "next-auth/react";
import LogoutButton from './logoutButton'

const menuItems = [
  {name: 'Home', path: ''},
  {name: 'Buy', path: '../pelanggan/products'},
  {name: 'Cart', path: '../pelanggan/cart'}
]

// const activeMenu = useMemo(() => menuItems.find(menu => menu.link === router.pathname), [router.pathname])

const Sidebar = () => {
  const router = useRouter()
  const [show, setShow] = useState(true)
  const wraperClasses = classNames(
    'h-screen flex justify-between flex-col bg-gray-800 text-white',
    {'w-64': show, 'w-16': !show}
  )
  // const handleLogout = () => {
  //   signOut({
  //     callbackUrl: "/authentication/login"
  //   })
  // }
  
  return (
    <div className={`h-screen flex justify-between flex-col bg-gray-800 text-white transition-width duration-300 ${show ? 'w-64' : 'w-16'}`}>  
      <div className="p-6">
        <div className="inline-flex items-center justify-between w-full mb-8">
          <b className={`text-l font-bold ${show ? '':'hidden'}`}>Aplikasi</b>
          <button className={`transition-width duration-300 ${show ? '':'rotate-180'}`} onClick={() => setShow(curr => !curr)}>
            {/* {show? <KeyboardDoubleArrowLeftIcon /> : <KeyboardDoubleArrowRightIcon />} */}
            <KeyboardDoubleArrowLeftIcon />
          </button>
        </div>
        <ul>
          {show && menuItems.map(item => (
            <li className="mb-2" key={item.path}>
              <Link href={item.path}>
                  <span>{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
        <div className="p-2">
          <LogoutButton show={show} />
        </div>
    </div>
  )
}
export default Sidebar