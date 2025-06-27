import React, { useEffect, useState } from 'react'
import {Sidebar} from 'flowbite-react'
import {HiUser,H, HiArrowSmRight} from 'react-icons/hi'
import { Link, useLocation } from 'react-router-dom';

export default function DashSidebar() {
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
    <Sidebar className='w-full md:w-56'>
        <Sidebar.Items>
            <Sidebar.ItemGroup>
            <Link to='/dashboard?tab=profile'>
                <Sidebar.Item active={tab==='profile'} icon={HiUser} label={"User"} labelColor='dark'>Profile</Sidebar.Item>
                <Sidebar.Item icon={HiArrowSmRight} clasname='cursor-pointer'>Sign Out</Sidebar.Item>
            </Link>
            </Sidebar.ItemGroup>
        </Sidebar.Items>
    </Sidebar>
  )
}
