import React from "react"
import AutorList from "./AutorList";
import { useState , useEffect } from "react";
function Autor_fetch(){

    const [data ,setdata]=useState([])
    
    useEffect(()=>{
        fetch('http://127.0.0.1:5000/autor',
        {'methods':'GET',
          headers:{
            'Content-Type':'applications/json'
          }          
        })
        .then(resp =>resp.json())
        .then(resp=>setdata(resp))
        .then(error=>console.log(error))
    
    },[])

    return(
        <AutorList data={data}/>

    )

}

export default Autor_fetch