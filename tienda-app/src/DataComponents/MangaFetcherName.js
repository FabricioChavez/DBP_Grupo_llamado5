import React from "react";
import {MangaList} from "./mangalist.js";
import { useState, useEffect } from "react";
function MangaFetcherName({ userdata , name}) {
  
  const [manga, setManga] = useState([]);

  const fetcherbyName = () =>{
    fetch(`http://127.0.0.1:5000/manga/byn/${name}`, {
      'methods': "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(resp => resp.json())
      .then(resp => setManga(resp))
      .catch(error => console.log(error));

  }                          

  useEffect(() => {
   fetcherbyName()
  }, []);

  return (
    <div>
    <p>devolviendo {name}</p>
    <MangaList manga={manga}/>
    </div>
  )
  
}

export default MangaFetcherName;
