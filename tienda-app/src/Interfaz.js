import React, { useState } from 'react';
import './styles.css'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import MangaFetcherGenre from './DataComponents/MangaFetcherGenre';
import MangaFetcherName from './DataComponents/MangaFetcherName';
import Manga_fetch from './DataComponents/MangaFetcher';

function Interfaz( {userdata} ) {
  const [selection, setSelection] = useState('');
  const [nombre, setNombre] = useState('');

  const handleChange = (e) => {
    setSelection(e.target.value);
  };

  const handleChangeName = (e) => {
    setNombre(e.target.value);
  };

  let content = null;

  if (selection === 'General') {
    content = <Manga_fetch userdata={userdata} />;
  } else if (selection) {
    content = <MangaFetcherGenre userdata={userdata} genre={selection} />;
  } else if (nombre) {
    content = <MangaFetcherName userdata={userdata} name={nombre} />;
  } else {
    content = <Manga_fetch userdata={userdata} />;
  }
  return (
    <>
      <div style={{ backgroundColor: '#26292B' }}>
        <nav className="navbar navbar-expand-lg " style={{ backgroundColor: '#2e3239' }}>
          <a className="navbar-brand" style={{ color: '#A2B2EE', fontFamily: 'Quicksand' }} href="Pagina principal">Página principal</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item active">
                <a className="nav-link" style={{ color: '#A2B2EE', fontFamily: 'Quicksand' }} href="buscar">Interfaz</a>
              </li>
            </ul>
          </div>
        </nav>
        <div className="Cuadro">
          <div className="box">
            <label htmlFor="categorias" style={{ fontFamily: 'Quicksand', fontSize: '22px' }}>Seleccione por categoría:</label>
            <select id="categorias" name="categorias" style={{ borderRadius: '15px' }} value={selection} onChange={handleChange}>
              <option value="">General</option>
              <option value="Seinen">Seinen</option>
              <option value="Shonen">Shonen</option>
              <option value="Dempa">Dempa</option>
              <option value="Shoujo">Shoujo</option>
            </select>
          </div>
        </div>


        <div className="Cuadro2">
          <div className="box">
            <div className="input">
              <label htmlFor='nombres' style={{ fontFamily: 'Quicksand', fontSize: '20px' }}>Buscar por nombre:</label>
              <input type="text" id="Nombre" style={{ borderRadius: '15px' }}  value={nombre} onChange={handleChangeName}  />
            </div>
          </div>
        </div>

        <div style={{marginTop: '10%'}}>
          {content}
        </div>
      </div>
    </>
  );
}

export default Interfaz;
