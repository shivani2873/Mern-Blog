import React, { useEffect, useState } from 'react'
import {useLocation} from 'react-router-dom'
import DashSidebar from '../components/DashSidebar';
import DashProfile from '../components/DashProfile';

export default function Dashboard() {
  const location=useLocation();
  const [tab,setTab]=useState('');
  useEffect(()=>{
    const urlParam= new URLSearchParams(location.search);
    const tabFromurl=urlParam.get('tab');
    // console.log(tabFromurl);
    if(tabFromurl){
      setTab(tabFromurl);
    }
  },[location,search]);
  return (
    <div className='min-h-screen flex flex-col md:flex-row'>
      <div className="md:w-56">
        {/* sidebar */}
        <DashSidebar/>
      </div>
      {/* profile.. */}
      {tab=== 'profile' && <DashProfile/>}
    </div>
  )
}
