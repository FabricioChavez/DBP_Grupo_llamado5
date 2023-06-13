  import React from "react";
  import './Nav.css';
  import ReactDOM from "react-dom";
  import Carousel from "react-elastic-carousel";
  import Item from "./Item";

  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 500, itemsToShow: 2 },
    { width: 768, itemsToShow: 3 },
    { width: 1200, itemsToShow: 4 },
  ];

  function Car() {
    const carrucelStyle = {
      marginTop: "-84em",
      marginBottom: "0em"
    };
  
    const containerStyle = {
      position: "relative",
      height: "20em" 
    };
    const imageStyle = {
      maxWidth: "100%",
      maxHeight: "100%",
      objectFit: "cover"
        };
  
    return (
      <div className="Car" style={containerStyle}>
        <div style={carrucelStyle}>
          <Carousel breakPoints={breakPoints}>
            <Item>
            <img style={imageStyle}  src="https://elcomercio.pe/resizer/f5lcG_SPYS-M-CdJCkzRBRB4ncI=/640x0/smart/filters:format(jpeg):quality(75)/cloudfront-us-east-1.images.arcpublishing.com/elcomercio/7GIIGO2GA5FJBMKXN5XT4KA3NU.jpg" alt="Imagen 1" />
              </Item>
            <Item>
            <img style={imageStyle} src="https://images.justwatch.com/poster/8599353/s592/death-note" ></img>
            </Item>
            <Item>
            <img style={imageStyle} src="https://image.api.playstation.com/vulcan/ap/rnd/202106/1704/2ZfAUG5CTXdM34S1OhmMW1zF.jpg" ></img>

            </Item>
            <Item>
            <img style={imageStyle} src="https://m.media-amazon.com/images/M/MV5BMmI5NmFlZjItOTBhOC00NGI0LWIyNDAtODJhOTJjZDEyMTYyXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_.jpg" ></img>

            </Item>
            <Item>
            <img style={imageStyle} src="https://www.crisol.com.pe/media/catalog/product/cache/cf84e6047db2ba7f2d5c381080c69ffe/9/7/9788417292669_vr0q2ef9dum4yxjx.jpg" ></img>

            </Item>
            
          </Carousel>
        </div>
      </div>
    );
  }
  
const rootElement = document.getElementById("root");


function Navbar({ children }) {
  const navLinkStyle = {
    marginRight: "10em",
    
  };
  const Logo = {
    position: "absolute",
    left: "1em",
  };
  const Navbartotal = {
    position: "fixed",
    zIndex: 9999,
    width: "120%",
    height:"5em",
    background: "white",
  };

  return (
    <nav style={Navbartotal} className="navbar navbar-expand-lg">
      <div className="container">
        <a className="navbar-brand" href="#" style={Logo}>
          Logo
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <a className="nav-link" href="#" style={navLinkStyle}>
                Acerca
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#" style={navLinkStyle}>
                Servicios
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#" style={navLinkStyle}>
                Contacto
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                {children}
              </a>
            </li>
          </ul>
        </div>
      </div>
      
    </nav>
    
  );
}

function Buscar() {
  const buscadorStyle = {
    position: "absolute",
    top: "7em",
    right: "32em",
    width:"50em",
    
    zIndex: 0,
  };

  return (
    <div className="input-group" style={buscadorStyle}>
      <input
        type="search"
        className="form-control rounded"
        placeholder="Search"
        aria-label="Search"
        aria-describedby="search-addon"
      />
      <button type="button" className="btn btn-outline-primary">
        Search
      </button>
    </div>
  );
}

function Principal() {
    const rectanguloStyle = {
      width: "100%",
      height: "70%",    
      background: "linear-gradient(180deg, #81F79F 0%, #58ACFA 50%, #F2F3F3 100%)",
     position: "absolute",
      top: "55%",
      left: "50%",
      transform: "translate(-50%, -50%)",
    };

   


    return <div style={rectanguloStyle}></div>;
  
  }


function Principal2() {
    const rectanguloStyle = {
      width: "100%",
      height: "70%",    
      background: "#A9BCF5",
     position: "absolute",
      top: "140em",
      left: "50%",
      transform: "translate(-50%, -50%)",
    };

   


    return <div style={rectanguloStyle}></div>;
  
  }

  
  function Final() {
    const rectangulStyle = {
      width: "100%",
      height: "16em",
      background: "white",
      position: "relative",
      textAlign: "center",
      top: "200%",
      zIndex:0
    };
    const pagos = {
        width: "130em",
        height: "10em",
        background: "white",
        position: "relative",
        textAlign: "center",
        backgroundImage: 'url("https://www.escueladeriqueza.org/wp-content/uploads/tarjetas.png")',
        backgroundSize: "contain",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",

        zIndex: 2
      };
    const derecho={
        position:"relative",
        top:"10em"

    }
      
      return (
        <footer style={rectangulStyle}>
          <div className="container" style={pagos}>
            <p style={derecho}>&copy; 2023 Todos los derechos reservados | Creado ayer</p>
            <p style={derecho}>Información de contacto: correo@utec.edu.pe</p>
          </div>
        </footer>
      );
      
  }
  function TextoAnimesMas() {
    const textStyles = {
        backgroundImage: "linear-gradient(to right, #3366ff, #00cc00), linear-gradient(to bottom, #3366ff, #FFFFFF)",
        backgroundClip: "text",
        WebkitBackgroundClip: "text", 
        color: "transparent",
        position: "absolute",
        bottom: "-3em",
        left: "8em",
        fontSize: "400%",
        fontFamily: "Comic Sans MS	",
        letterSpacing: "0.15em",
        zIndex: 3
    };
  
    return (
        <div>
          <p style={textStyles}>Top mangas actuales</p>
        </div>
    );
  }


function Cards1() {
    const cartas={
        position:"absolute",
        top:"80em",
        width:"50em",
        height:"20em",
        left:"3em"
    }
  return (
    <div className="card text-bg-dark" style={cartas}>
      <img src="..." className="card-img" alt="..." />
      <div className="card-img-overlay">
        <h5 className="card-title">Card title</h5>
        <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
        <p className="card-text"><small>Last updated 3 mins ago</small></p>
      </div>
    </div>
  );
}

  
function Cards2() {
    const cartas={
        position:"absolute",
        top:"80em",
        left:"60em",
        width:"50em",
        height:"20em"
    }
  
 

  return (
    <div className="card text-bg-dark" style={cartas}>
      <img src="..." className="card-img" alt="..." />
      <div className="card-img-overlay">
        <h5 className="card-title">Card title</h5>
        <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
        <p className="card-text"><small>Last updated 3 mins ago</small></p>
      </div>
    </div>
  );
} 

function Extra(){
    const text = {
        backgroundImage: "linear-gradient(to right, #3366ff, #2E64FE)",
        backgroundClip: "text",
        WebkitBackgroundClip: "text", 
        color: "transparent",
        position: "absolute",
        bottom: "-50em",
        left: "17.5em",
        fontSize: "230%",
        fontFamily: "Comic Sans MS	",
        letterSpacing: "0.15em",
        zIndex: 7
    };
  
    return (
        <div>
          <p style={text}>¿Buscas otros mangas?</p>
        </div>
    );
}

function BottonExtra(){
   

  
    return (
        <div >
<a  className="text2" href="#"> Ver toda la tienda</a>
        </div>
    );
}



  
function Titulo(){

    return(
        <div>
            <p className="titulo1"> Grupo5  </p>
            <p className="titulo2">Tienda de Mangas oficial</p>
            <p className="titulono">Tambien tenemos:</p>

        </div>
    );
}
function Imagenes(){
  const cosa={
    position:"absolute",
    top:"20em",
    height:"70%",
    left:"80em"
  }
  return ( 
  <div>
    <img style={cosa} src="https://mario.nintendo.com/static/f350c31adcd6378b913f7660db299714/7e15c/mario.png"/> 
  </div>);
 
}


  
  

  

export { Navbar, Buscar ,Principal,Final, TextoAnimesMas,Cards1,Cards2,Extra,BottonExtra,Titulo,Principal2,Car,Imagenes};
