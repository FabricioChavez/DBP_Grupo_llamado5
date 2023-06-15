import React from 'react';
import './styles.css'; // Import the CSS file
import 'bootstrap/dist/css/bootstrap.min.css';

function Interfaz(props) {
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


      </div>
          </>
  );
}

export default Interfaz;

