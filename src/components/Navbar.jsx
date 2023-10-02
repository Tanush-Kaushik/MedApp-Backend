import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Navbar() {  // this navbar will be displayed after login

    let navigate = useNavigate()

    const handleLogout=()=>{
        localStorage.removeItem('userId')
        navigate('/')
    }

  return (
    <div>
        <button className='btn bg-success d-flex m-2' onClick={handleLogout}>Logout</button>
    </div>
  )
}
