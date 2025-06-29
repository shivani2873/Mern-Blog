import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom';

export default function AdminPvtRoute() {
    const {currUser}=useSelector((state)=>state.user);
  return currUser && currUser.isAdmin ? <Outlet/> : <Navigate to='/sign-in'/>;
}
