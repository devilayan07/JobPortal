import React from 'react'
import useAuth from '../hooks/useAuth'
import { Navigate,Outlet } from 'react-router-dom'
import UserHeader from '../components/UserHeader'
import Footer from '../pages/Footer'
function PrivateRoutes() {
    const {auth}=useAuth()
  return (
    <>
    {
        auth?.role==="USER" ? (
            <>
             <UserHeader/>
             <Outlet/>
             <Footer/>
            </>
           
        ):(
          <Navigate to={"/login"}/>
        )
    }
      
    </>
  )
}

export default PrivateRoutes
