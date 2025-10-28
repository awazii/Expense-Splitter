import React from 'react'
import { Navbar } from './Navbar'
import { Outlet } from 'react-router-dom'
export const Main = () => {
  return (
     <div className="Main-Area h-screen w-screen flex "> 
      <Navbar />
      <div className="context flex-1 bg-background m-2  rounded-md text">
              <Outlet />
        </div>     
    </div>
  )
}
