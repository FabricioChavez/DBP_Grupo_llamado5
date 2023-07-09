import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import UploadImage from './ImageUpload';

function EditUsuario(props) {
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
        fetch(`http://127.0.0.1:5000/users/${userData.id}`, {
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
              }
      
              localStorage.setItem('userData', JSON.stringify(updatedData));
              window.location.reload();
            })
            .catch(error => {
              console.error('Error al guardar los cambios:', error);
          });


    }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
        </div>
        <div>
          <label>Email:</label>
          <input type="text" value={email} onChange={e => setEmail(e.target.value)} />
        </div>
        <div>
          <label>Nombre:</label>
          <input type="text" value={firstname} onChange={e => setFirstname(e.target.value)} />
        </div>
        <div>
          <label>Apellido:</label>
          <input type="text" value={lastname} onChange={e => setLastname(e.target.value)} />
        </div>
        <div>
          <label>Fecha de Nacimiento:</label>
          <input type="text" value={fechaNac} onChange={e => setFechaNac(e.target.value)} />
        </div>
        <div>
          <label>País:</label>
          <input type="text" value={pais} onChange={e => setPais(e.target.value)} />
        </div>
        <div>
          <label>Wallet:</label>
          <input type="text" value={wallet} onChange={e => setWallet(e.target.value)} />
        </div>
        <div>
          <button type="submit">Guardar cambios</button>
          <Link to="/Profile">Volver a perfil</Link>
        </div>
      </form>

       < UploadImage id = {userData.id}/>


    </div>
  );
}

export default EditUsuario;


