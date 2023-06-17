import React from "react";
import {MangaList} from "./mangalist.js";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
function MangaFetcherName({name}) {
  
  const [manga, setManga] = useState([]);

  useEffect(() => {
    fetch(`http://127.0.0.1:5000/manga/byn/${name}`, {
      'methods': "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(resp => resp.json())
      .then(resp => setManga(resp))
      .catch(error => console.log(error));
  }, []);

  return (
    <div>
    <p>devolviendo {name}</p>
    <MangaList manga={manga}/>
    </div>
  )
  
}

export default MangaFetcherName;
