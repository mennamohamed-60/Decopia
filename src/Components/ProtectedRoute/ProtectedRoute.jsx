import React from 'react'
import { Navigate ,useLocation } from 'react-router-dom'

export default function ProtectedRoute({children ,allowedRoles}) {
    
    const location = useLocation()

    if(localStorage.getItem("token") == null){
       return <Navigate to="/login" replace />
    }

    const role = localStorage.getItem('role')

    if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/home" replace />
  }
  return (
   <>
      {children}
   </>
  )
}

