import React, { useState, useEffect } from "react";
import { MangaList } from "./mangalist.js";

function Manga_fetch(props) {
  const {userdata}=props
  const [manga, setManga] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/manga', {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(resp => resp.json())
      .then(resp => setManga(resp))
      .catch(error => console.log(error));
  }, [userdata]);

  return <MangaList manga={manga} userdata={userdata} />;
}

export default Manga_fetch;