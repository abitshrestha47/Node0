import React from 'react'
import Header from './Header'
import { Toaster } from 'react-hot-toast'

const Layout = ({children}) => {
  return (
    <>
        <Header/>
        <Toaster/>
        <main className='layoutContainer'>{children}</main>
    </>
  )
}

export default Layout