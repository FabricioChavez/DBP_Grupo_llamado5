import React from 'react';
import './styles.css'; // Import the CSS file
import 'bootstrap/dist/css/bootstrap.min.css';
import Manga_fetch from './DataComponents/MangaFetcher';

function Interfaz(props) {
  const cosa={
      backgroundColor:'#26292B'
  }
  return (
   
    <>
    <div style={cosa}> 
    <nav className="navbar navbar-expand-lg " style={{ backgroundColor: '#2e3239'}}>
        <a className="navbar-brand" style={{ color: '#A2B2EE', fontFamily:'Quicksand'}} href="Pagina principal">Página principal</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <a className="nav-link" style={{ color: '#A2B2EE', fontFamily:'Quicksand'}} href="buscar">Interfaz</a>
            </li>
          </ul>
        </div>
      </nav>
      <div className="Cuadro">
        <div className="box">
          <label htmlFor="categorias" style={{ fontFamily: 'Quicksand', fontSize: '22px' }}>Seleccione por categoría:</label>
          <select id="categorias" name="categorias" style={{ borderRadius: '15px' }}>
            <option value="no se">Seinen</option>
            <option value="no se">Shonen</option>
            <option value="no se">no se</option>
            <option value="no se">no se</option>
          </select>
        </div>
      </div>


      <div className="Cuadro2">
        <div className="box">
          <div className="input">
          <label htmlFor='nombres' style={{fontFamily: 'Quicksand', fontSize: '20px'}}>Buscar por nombre:</label>
            <input type="text" id="Nombre" style={{borderRadius: '15px'}}></input>
          </div>
        </div>
      </div>
      <div style={{marginTop:'150px'}}><Manga_fetch></Manga_fetch></div>
      </div>
      
      
          </>
  );
}

export default Interfaz;

