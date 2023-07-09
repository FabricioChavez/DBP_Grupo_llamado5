import React , {useState} from "react";
import { useNavigate , Link } from "react-router-dom";

function Profile( props){
    const  {userData} = props;
    const navigate = useNavigate();

    if(!userData){
        return <div>Loading ....</div>
    }

    return(
        <div>
            <div> 
                <h1>
                     Username : {userData.username}

                </h1>            
            </div>

            <div>
                <h2> Nombre : {userData.firstname} </h2>
                <h2> Apellido : {userData.lastname} </h2>
                <h2> Pais : {userData.pais} </h2>
                <h2> Saldo : {userData.wallet} </h2>
            </div>

        
            <Link to = "/Edit"> Editar </Link>

            <Link to = "/interfaz"> Volver </Link>
        </div>

        
    )
}


export default Profile