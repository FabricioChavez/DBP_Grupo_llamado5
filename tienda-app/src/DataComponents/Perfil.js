import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { banckend_URL } from "./config";
import ImageGet from "./imageFetcher";
const Profile = (props) => {
  const { userData } = props;
  const [compras, setCompras] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (userData) {
      fetch(`${banckend_URL}/compraUser/${userData.id}`)
        .then(response => response.json())
        .then(data => setCompras(data))
        .catch(error => console.log(error));
      
      
      
    }
  }, [userData]);


  if (!userData) {
    return <div>Loading ....</div>;
  }

  return (
    <div className="container">
      <div className="my-4">
        <h1>Username: {userData.username}</h1>
      </div>

      <div className="my-4">
        <h2>Nombre: {userData.firstname}</h2>
        <h2>Apellido: {userData.lastname}</h2>
        <h2>País: {userData.pais}</h2>
        <h2>Saldo: {userData.wallet}</h2>
        <ImageGet id={userData.id}/>
      </div>

      <div className="my-4">
        <Link to="/Edit" className="btn btn-primary mr-2">Editar</Link>
        <Link to="/interfaz" className="btn btn-secondary">Volver</Link>
      </div>

      <div className="my-4">
        <h2>Lista de Compras</h2>
        {compras.length > 0 ? (
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>ID Usuario</th>
                <th>Nombre Manga</th>
                <th>Edición</th>
                <th>Fecha</th>
              </tr>
            </thead>
            <tbody>
              {compras.map(compra => (
                <tr key={compra.id}>
                  <td>{compra.id}</td>
                  <td>{compra.id_user}</td>
                  <td>{compra.manga_nombre}</td>
                  <td>{compra.manga_edicion}</td>
                  <td>{compra.fecha}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No hay compras registradas.</p>
        )}
      </div>

      
    </div>
  );
};

export default Profile;
