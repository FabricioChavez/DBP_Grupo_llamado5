import React from 'react';
import { BrowserRouter as Router , Switch , Route , Routes } from 'react-router-dom';
import Login from './Login'
import Signup from './Signup'
import Main  from './Main'
import Interfaz from './Interfaz';
import 'bootstrap/dist/css/bootstrap.min.css'
import Nav from './Nav';


function App() {
  return (
    <div>
        
      <Router>
        <Routes>

            <Route path='/' element = {<Main/>}> </Route>
            <Route path='/login' element = {<Login/>}></Route>
            <Route path='/signup' element = {<Signup/>}></Route>
            <Route path='/interfaz' element = {<Interfaz/>}></Route>

        </Routes>
      
      </Router>



    </div>
    
    
  );
}

export default App;

