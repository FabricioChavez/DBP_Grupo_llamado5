import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {UploadImage,UpdateImage} from './ImageUpload';
import { banckend_URL } from './config';

const EditUsuario = (props) => {
  const { userData } = props;

  const navigate = useNavigate();

  const [username, setUsername] = useState(userData ? userData.username : '');
  const [email, setEmail] = useState(userData ? userData.email : '');
  const [firstname, setFirstname] = useState(userData ? userData.firstname : '');
  const [lastname, setLastname] = useState(userData ? userData.lastname : '');
  const [fechaNac, setFechaNac] = useState(userData ? userData.fechaNac : '');
  const [pais, setPais] = useState(userData ? userData.pais : '');
  const [wallet, setWallet] = useState(userData ? userData.wallet : '');
  const [id, setId] = useState(userData ? userData.id : '');

  const handleSubmit = (e) => {
    e.preventDefault();

    let updatedData = {
      username,
      email,
      firstname,
      lastname,
      fechaNac,
      pais,
      wallet
    };

    update(updatedData);

    console.log(username);
  };

  const update = (updatedData) => {
    fetch(`${banckend_URL}/users/${userData.id}`, {
      method: 'PUT',
      body: JSON.stringify(updatedData),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(() => {
        updatedData = {
          username,
          email,
          firstname,
          lastname,
          fechaNac,
          pais,
          wallet,
          id
        };

        localStorage.setItem('userData', JSON.stringify(updatedData));
        
        navigate('/Profile')
      })
      .catch((error) => {
        console.error('Error al guardar los cambios:', error);
      });
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username:</label>
          <input type="text" className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input type="text" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Nombre:</label>
          <input type="text" className="form-control" value={firstname} onChange={(e) => setFirstname(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Apellido:</label>
          <input type="text" className="form-control" value={lastname} onChange={(e) => setLastname(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Fecha de Nacimiento:</label>
          <input type="text" className="form-control" value={fechaNac} onChange={(e) => setFechaNac(e.target.value)} />
        </div>
        <div className="form-group">
          <label>País:</label>
          <input type="text" className="form-control" value={pais} onChange={(e) => setPais(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Wallet:</label>
          <input type="text" className="form-control" value={wallet} onChange={(e) => setWallet(e.target.value)} />
        </div>
        <div>
          <button type="submit" className="btn btn-primary mr-2">Guardar cambios</button>
          <Link to="/Profile" className="btn btn-secondary">Volver a perfil</Link>
        </div>
      </form>

      <h> Subir imagen por primera vez <UploadImage id={id} /></h>
      <h> Editar o actualizar imagen :   <UpdateImage id={id}/></h>
     
      
    </div>
  );
};

export default EditUsuario;

