import React from 'react'
import { NavLink, useNavigate, useRouteLoaderData } from 'react-router-dom'

const Navbar = () => {
  const isToken = useRouteLoaderData('root');
  const navigate = useNavigate();
  return (
    <div className='flex justify-between p-4 items-center'>
        <h1 className='text-2xl font-bold cursor-pointer' onClick={()=>navigate('/')}>BLOG.io</h1>
        <div className='flex justify-between gap-3'>
            <NavLink className={({isActive})=>(isActive ? 'active':'')} to={'/'}>Posts</NavLink>
            {
              isToken && <NavLink to={'/create-post'}>Create Post</NavLink>
            }
            
            {
              !isToken && <NavLink to={'/auth?mode=login'}>Login</NavLink>
            }
          
            {
              isToken && <NavLink to={'/logout'}>Logout</NavLink>
            }
        </div>
    </div>
  )
}

export default Navbar