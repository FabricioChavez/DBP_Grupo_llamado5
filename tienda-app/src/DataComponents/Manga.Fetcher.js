import React from "react"
import Interfaz from "../Interfaz.js";
import { useState , useEffect } from "react";

function Manga_fetch(){

    const [manga ,setmanga]=useState([])

    useEffect(()=>{
        fetch('http://127.0.0.1:5000/manga',
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
        <Interfaz manga={manga}/>

    )

}

export default Manga_fetch;