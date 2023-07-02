import React, { useState, useEffect } from "react";
import { MangaList } from "./mangalist.js";
import { useParams } from "react-router-dom";

function MangaFetcherGenre({ userdata, genre }) {
  const [manga, setManga] = useState([]);

  useEffect(() => {
    fetch(`http://127.0.0.1:5000/manga/by/${genre}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(resp => resp.json())
      .then(resp => setManga(resp))
      .catch(error => console.log(error));
  }, [userdata, genre]);

  return (
    <div>
      <MangaList manga={manga} />
    </div>
  );
}

export default MangaFetcherGenre;