import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'

export default function SignUp() {

  let navigate = useNavigate()

  const [credentials, setCredentials] = useState({ name: '', phone_number: '', address: '', age: '', disease: '', family_member_name: '', family_member_phone_number: '', email: '', password: '' })

  const submitHandler = async (event) => {
    event.preventDefault()

    const {name,email,password,phone_number,address,age,disease,family_member_name,family_member_phone_number}=credentials
    console.log(name,email)

    const response = await fetch('http://localhost:5000/createUser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({name,email,password,phone_number,address,age,disease,family_member_name,family_member_phone_number})
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
          <label for="exampleInputEmail1" class="form-label">Name</label>
          <input type="text" class="form-control" id="exampleInputEmail1" name='name' value={credentials.name} onChange={onChange} />
        </div>

        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">Phone Number</label>
          <input type="text" class="form-control" id="exampleInputEmail1" name='phone_number' value={credentials.phone_number} onChange={onChange} />
        </div>

        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">Address</label>
          <input type="text" class="form-control" id="exampleInputEmail1" name='address' value={credentials.address} onChange={onChange} />
        </div>

        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">Age</label>
          <input type="text" class="form-control" id="exampleInputEmail1" name='age' value={credentials.age} onChange={onChange} />
        </div>

        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">Are you suffering from any disease, if yes then write the name of it</label>
          <input type="text" class="form-control" id="exampleInputEmail1" name='disease' value={credentials.disease} onChange={onChange} />
        </div>

        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">Family member name</label>
          <input type="text" class="form-control" id="exampleInputEmail1" name='family_member_name' value={credentials.family_member_name} onChange={onChange} />
        </div>

        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">Family member phone number</label>
          <input type="text" class="form-control" id="exampleInputEmail1" name='family_member_phone_number' value={credentials.family_member_phone_number} onChange={onChange} />
        </div>

        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">Email address</label>
          <input type="email" class="form-control" id="exampleInputEmail1" name='email' value={credentials.email} onChange={onChange} />
        </div>

        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">Password</label>
          <input type="password" class="form-control" id="exampleInputPassword1" name='password' value={credentials.password} onChange={onChange} />
        </div>

        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}
