import React from "react";

import { Link } from "react-router-dom";

function Main(){
    return (
        <div>
            <h3>Introducción</h3>
             
            <Link to={'/login'}>Login</Link>
            <Link to={'/signup'}>SingUp</Link>
        </div>
    )
}

export default Main;