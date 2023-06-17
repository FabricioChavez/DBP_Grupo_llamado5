import React from "react";
import {MangaList} from "./mangalist.js";
import { useState, useEffect } from "react";

function Manga_fetch() {
  const [manga, setManga] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/manga", {
      'methods': "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(resp => resp.json())
      .then(resp => setManga(resp))
      .catch(error => console.log(error));
  }, []);

  return <MangaList manga={manga} />;
}

export default Manga_fetch;
