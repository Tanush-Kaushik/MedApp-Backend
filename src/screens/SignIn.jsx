import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'

export default function SignIn() {

  let navigate = useNavigate()

  const [credentials, setCredentials] = useState({ email: "", password: "" })
  
  const submitHandler = async (event) => {
    event.preventDefault()

    const response = await fetch('http://localhost:5000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      })
    })

    const json =await response.json()

    if(json.success){

      localStorage.setItem('userId',json.id)
      navigate('/dashboard')

    }
  }

  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value })
  }

  return (
    <div>
      <form onSubmit={submitHandler}>

        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">Email address</label>
          <input type="email" class="form-control" id="exampleInputEmail1" name='email' value={credentials.email} onChange={onChange}/>
        </div>

        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">Password</label>
          <input type="password" class="form-control" id="exampleInputPassword1" name='password' value={credentials.password} onChange={onChange}/>
        </div>
        
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}
