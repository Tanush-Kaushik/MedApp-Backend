import React, { useEffect, useState } from 'react'

export default function Table() {

    const [arr,setArr]=useState([])

    const fxn1=async()=>{

        const response = await fetch('http://localhost:5000/table', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              userId: localStorage.getItem('userId') 
            })
          })

          let json = await response.json()

          if(json.success){
            setArr(json.arr)
          }
    }

    useEffect(()=>{
        fxn1()
    },[])

  return (
    <div>
        {
            arr!=[]?
            arr.map((i)=>{
                return (
                    <div>
                        {
                            i.success?
                            <>medicine taken at time {i.time}</>
                            :
                            <>didnt take medicine at time {i.time}</>
                        }
                    </div>
                )
            })
            :''
        }
    </div>
  )
}
