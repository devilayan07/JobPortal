import React from 'react'
import useAuth from '../hooks/useAuth'
import { Navigate,Outlet } from 'react-router-dom'
import UserHeader from '../components/UserHeader'
function PrivateRoutes() {
    const {auth}=useAuth()
  return (
    <>
    {
        auth?.user ? (
            <>
             <UserHeader/>
             <Outlet/>
            </>
           
        ):(
          <Navigate to={"/login"}/>
        )
    }
      
    </>
  )
}

export default PrivateRoutes
