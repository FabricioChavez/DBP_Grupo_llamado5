import React from "react";
import { useNavigate, Link } from "react-router-dom";

const Profile = (props) => {
  const { userData } = props;
  const navigate = useNavigate();

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
      </div>

      <div className="my-4">
        <Link to="/Edit" className="btn btn-primary mr-2">Editar</Link>
        <Link to="/interfaz" className="btn btn-secondary">Volver</Link>
      </div>
    </div>
  );
};



export default Profile