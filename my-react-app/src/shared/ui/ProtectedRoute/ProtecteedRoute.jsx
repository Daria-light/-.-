import React from 'react'
import { Navigate } from 'react-router-dom'

function ProtecteedRoute() {
  if (!isAuthenticated) {
    return <Navigate to="/user"></Navigate>
  }
  return <div></div>
}

export default ProtecteedRoute
