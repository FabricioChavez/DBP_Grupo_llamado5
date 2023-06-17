import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function MangaFetcherId(props) {
const {id}=props
  const [manga, setManga] = useState(null);

  useEffect(() => {
    fetch(`http://192.168.1.45:5000/manga/${id}`)
      .then(resp => resp.json())
      .then(data => setManga(data))
      .catch(error => console.log(error));
  }, [id]);

  if (!manga) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="MangaInfo">
      <h1>Información de {manga.nombre}</h1>
      <div>
        <img src={manga.link} alt={manga.nombre} />
        <h2>Nombre: {manga.nombre}</h2>
        <h2>Edición: {manga.edicion}</h2>
        <h2>Stock: {manga.cant_stock}</h2>
        <h2>Género: {manga.genero}</h2>
        <h2>Precio: {manga.precio}</h2>
        <button className="btn btn-primary">Comprar</button>
      </div>
    </div>
  );
}

export default MangaFetcherId;
