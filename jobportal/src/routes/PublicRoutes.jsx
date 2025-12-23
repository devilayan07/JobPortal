import React from 'react'
import Header from '../components/Header'

function PublicRoutes({children}) {
  return (
    <>
    <Header/>
    {children}
      
    </>
  )
}

export default PublicRoutes
