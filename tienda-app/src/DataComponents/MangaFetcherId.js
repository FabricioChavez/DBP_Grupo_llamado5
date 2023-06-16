import React, { useState, useEffect } from "react";

function MangaFetcherId({ id }) {
  const [manga, setManga] = useState(null);

  useEffect(() => {
    fetch(`http://127.0.0.1:5000/manga/${id}`)
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
      </div>
    </div>
  );
}

export default MangaFetcherId;
