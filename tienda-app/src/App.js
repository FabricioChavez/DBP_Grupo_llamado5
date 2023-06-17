import React from 'react';
import { BrowserRouter as Router , Switch , Route , Routes } from 'react-router-dom';
import Login from './Login'
import Signup from './Signup'
import Main  from './Main'
import Interfaz from './Interfaz';
import Autor_fetch from './DataComponents/AutorFetcher';
import 'bootstrap/dist/css/bootstrap.min.css'
import Nav from './Nav';
import Componente from './DataComponents/component';
import MangaFetcherGenre from './DataComponents/MangaFetcherGenre';
import MangaFetcherId from './DataComponents/MangaFetcherId';
import MangaFetcherName from './DataComponents/MangaFetcherName';
function App() {
 
 const genre="Seinen";
 
  return (
    <div>

     
      <Router>
        <Routes>
           
            <Route path='/' element = {<Main/>}> </Route>
            <Route path='/prueba/:genero' element = {<MangaFetcherGenre />}> </Route>
            <Route path='/prueba2/:name' element = {<MangaFetcherName />}> </Route>
            <Route path="/MasInfo/:id" element={<Componente/>} />
            <Route path='/login' element = {<Login/>}></Route>
            <Route path='/signup' element = {<Signup/>}></Route>
            <Route path='/interfaz/:id_user' element = {<Interfaz/>}></Route>

            
            
        </Routes>
      
      </Router>



    </div>
    
    
  );
}

export default App;

