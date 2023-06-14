import React from 'react';
import './styles.css'; // Import the CSS file
import 'bootstrap/dist/css/bootstrap.min.css';

function Interfaz() {
  const cosa={
      backgroundColor:'#A2B2EE'
  }
  return (
   
    <>
    <div style={cosa}> 
    <nav className="navbar navbar-expand-lg " style={{ backgroundColor: '#2e3239' }}>
        <a className="navbar-brand" style={{ color: '#A2B2EE' }} href="Pagina principal">Página principal</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <a className="nav-link" style={{ color: '#A2B2EE' }} href="buscar">Interfaz</a>
            </li>
          </ul>
        </div>
      </nav>
      <div className="Cuadro">
        <div className="box">
          <label htmlFor="categorias">Seleccione por categoría:</label>
          <select id="categorias" name="categorias">
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
            <label>Buscar por nombre:</label>
            <input type="text" id="Nombre"></input>
          </div>
        </div>
      </div>
      <img src="https://i.pinimg.com/originals/ca/c9/16/cac916910b6e44c8b4a8642c26d6e893.jpg" id="image1" alt="Image 1" />
      <img src="https://3.bp.blogspot.com/-Bvoonmlj74A/V2gbeRSyt5I/AAAAAAAAHPQ/Nm1dmgQ4nck9ldZk5MzmUjth4ID6e3tgwCLcB/s1600/One%2BPiece%2Bvol%2B18%2Boriginal%2Bde%2BJapon.png" id="image2" alt="Image 2" />
      <img src="https://vignette.wikia.nocookie.net/dragonball/images/8/87/Portada_Manga_Super_1.png/revision/latest?cb=20160127202937&path-prefix=es" id="image3" alt="Image 3" />

      </div>
          </>
  );
}

export default Interfaz;

