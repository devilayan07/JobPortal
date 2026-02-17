import React from 'react'
import useAuth from '../hooks/useAuth'
import { Navigate, Outlet } from 'react-router-dom'
import UserHeader from '../components/UserHeader'
import Footer from '../pages/Footer'

function UserRoute() {
    const{auth}=useAuth()
    if(!auth?.token) return <Navigate to="/"/>
    if(auth?.role!=="USER") return <Navigate to={"/companyProfile"}/>
  return (
    <>
      <UserHeader/>
      <Outlet/>
      <Footer/>
    </>
  )
}

export default UserRoute
