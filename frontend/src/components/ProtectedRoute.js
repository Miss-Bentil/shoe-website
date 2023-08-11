import React from 'react'
import { Route, Navigate,Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

function ProtectedRoute({element:View }) {
    const user = useSelector(state => state.user)
  return (
    <div>
        {user.email? <Outlet/> : <Navigate to="/login" /> }
      
    </div>
  )
}

export default ProtectedRoute
