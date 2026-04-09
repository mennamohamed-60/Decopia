import React from 'react'
import MainNavbar from '../MainNavbar/MainNavbar'
import { Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <>
    <MainNavbar></MainNavbar>

    <div className=" mt-13">
      <Outlet></Outlet>
    </div>
    
    </>
  )
}
