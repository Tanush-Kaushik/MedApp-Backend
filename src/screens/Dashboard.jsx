import React, { useState } from 'react'

export default function Dashboard() {

  const [bb, setbb] = useState(false)
  const [ab, setab] = useState(false)
  const [bl, setbl] = useState(false)
  const [al, setal] = useState(false)
  const [bd, setbd] = useState(false)
  const [ad, setad] = useState(false)
  const [d, setd] = useState(false)

  const [credentials, setCredentials] = useState({custom: ''})

  
  const submitHandler = async () => {

    const response = await fetch('http://localhost:5000/dashboard', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: localStorage.getItem('userId'),
        before_breakfast: bb,
        after_breakfast: ab,
        before_lunch: bl,
        after_lunch: al,
        before_dinner: bd,
        after_dinner: ad,
        custom:credentials.custom,
        rt:d
      })
    })

  }

  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value })
  }

  return (
    <div>
      <form onSubmit={submitHandler}>
        <span>USE CUSTOM REMINDERS</span>
        <div>before_breakfast <input type='checkbox' name='before_breakfast' onClick={() => setbb(true)} /></div>
        <div>after_breakfast <input type='checkbox' name='after_breakfast' onClick={() => setab(true)} /></div>
        <div>before_lunch <input type='checkbox' name='before_lunch' onClick={() => setbl(true)} /></div>
        <div>after_lunch <input type='checkbox' name='after_lunch' onClick={() => setal(true)} /></div>
        <div>before_dinner <input type='checkbox' name='before_dinner' onClick={() => setbd(true)} /></div>
        <div>after_dinner <input type='checkbox' name='after_dinner' onClick={() => setad(true)} /></div>
        <div><input type='text' onChange={onChange} name='custom' value={credentials.custom} />additional time for medicine(in hours)</div>
        <hr/>
        <div>USE DOCTER RECOMMENED REMINDERS  <input type='checkbox' name='rt' onClick={() => setd(true)} /></div>
        <div><button type='submit'>Submit</button></div>
      </form>
    </div>
  )
}
