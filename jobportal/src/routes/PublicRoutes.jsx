import React from 'react'
import Header from '../components/Header'
import useAuth from '../hooks/useAuth'
import { Navigate } from 'react-router-dom'
function PublicRoutes({children}) {
  const {auth}=useAuth()
  if(auth?.role==="COMPANY"){
    return <Navigate to="/companyProfile" replace/>
  }
  return (
  
        <>
            <Header/>
    {children}
   </>



      
    
  )
}

export default PublicRoutes
