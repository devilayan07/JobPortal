import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import CompanyHeader from '../components/Company/CompanyHeader'
import Footer from '../pages/Footer'

function CompanyRoute() {
    const{auth}=useAuth()
    if(!auth?.token) return <Navigate to={"/"}/>
    if(auth?.role!=="COMPANY") return <Navigate to={"/profile"}/>
  return (
    <>
      <CompanyHeader/>
      <Outlet/>
      <Footer/>
    </>
  )
}

export default CompanyRoute
