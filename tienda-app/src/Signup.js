import React from "react";
import { Link } from "react-router-dom";
function Signup(){
    return(
        <div  style={{display : "flex" , justifyContent : "center" , alignItems: "center" , height: "100vh" , backgroundColor: "lightblue"}}>
        <div  className="100-w p-5 rounded bg-white">
            <form>
                <h3>Formulario de Registro</h3>
                <div className="mb-2">
                    <label htmlFor="nombres">Nombres</label>
                    <input type="text"  placeholder= "Nombres" className="form-control" />
                </div>

                <div className="mb-2">
                    <label htmlFor="Apellidos">Apellidos</label>
                    <input type="text"  placeholder= "Apellidos" className="form-control" />
                </div>


                <div className="mb-2">
                    <label htmlFor="email"  >Email</label>
                    <input type="email"  placeholder= "Ingresa tu email" className="form-control" />
                </div>

                <div className="mb-2">
                    <label htmlFor="password" >Contraseña</label>
                    <input type = "password" placeholder="Ingresa tu contraseña" className="form-control"/>
                </div>


                <div className="d-grid">
                    <button className="btn btn-primary"> Registrarse </button>
                </div>    

                <p className="text-right">
                
                    ¿Ya está registrado? <Link to="/" className="ms-2">  Iniciar Sesión </Link>    
                </p>

            </form>            
        
        
        </div>    
     </div>   
    )
}

export default Signup;