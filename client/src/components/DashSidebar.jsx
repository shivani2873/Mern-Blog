import React, { useEffect, useState } from 'react'
import { Sidebar } from 'flowbite-react'
import { HiUser, H, HiArrowSmRight } from 'react-icons/hi'
import { Link, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signoutSuccess } from '../redux/user/userSlice';

export default function DashSidebar() {
  const location = useLocation();
  const dispatch=useDispatch();
  const [tab, setTab] = useState('');
  useEffect(() => {
    const urlParam = new URLSearchParams(location.search);
    const tabFromurl = urlParam.get('tab');
    // console.log(tabFromurl);
    if (tabFromurl) {
      setTab(tabFromurl);
    }
  }, [location, search]);
  const signoutHandler = async () => {
    try {
      const res = await fetch('/api/user/signout', {
        method: 'POST',
      })
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (err) {
      console.log(err.message);
    }
  }
  return (
    <Sidebar className='w-full md:w-56'>
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Link to='/dashboard?tab=profile'>
            <Sidebar.Item active={tab === 'profile'} icon={HiUser} label={"User"} labelColor='dark' as='div'>Profile</Sidebar.Item>
            <Sidebar.Item icon={HiArrowSmRight} clasname='cursor-pointer'
            onClick={signoutHandler}>Sign Out</Sidebar.Item>
          </Link>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  )
}
