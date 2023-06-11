import React from "react";
import { Link } from "react-router-dom";

function Login(){
    return(
         <div  style={{display : "flex" , justifyContent : "center" , alignItems: "center" , height: "100vh" , backgroundColor: "lightblue"}}>
            <div  className="100-w p-5 rounded bg-white">

                <form>
                    <h3>Iniciar Sesión</h3>

                    <div className="mb-2">
                        <label htmlFor="email"  >Email</label>
                        <input type="email"  placeholder= "Ingresa tu email" className="form-control" />
                    </div>

                    <div className="mb-2">
                        <label htmlFor="password" >Contraseña</label>
                        <input type = "password" placeholder="Ingresa tu contraseña" className="form-control"/>
                    </div>

                    <div className="mb-2">
                        
                        <input type = "checkbox"  className="custom-control custom-checkbox" id="check"/>
                        <label htmlFor="check" className="custom-imput-label">Remember me</label>

                    </div>

                    <div className="d-grid">
                        <button className="btn btn-primary"> 
                            <Link to="/interfaz" style={{color : "white"}}>Ingresar</Link>  
                        </button>
                    </div>    

                    
                    <p className="text-right">
                        <a href="">¿Olvidaste tu contraseña? </a>
                        <br></br>
                        ¿Aún no tienes cuenta? <Link to="/signup" className="ms-2">  Registrate </Link>    
                    </p>

                </form>            
            
            
            </div>    
         </div>   

    )    
}

export default Login;