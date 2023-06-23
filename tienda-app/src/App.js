import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Routes } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';
import Main from './Main';
import Interfaz from './Interfaz';
import 'bootstrap/dist/css/bootstrap.min.css';
import Componente from './DataComponents/component';


function App() {
  const [userData, setUserData] = useState(null);

  const handleLogin = (data) => {
    setUserData(data);
  };

  return (
    <div>
      <Router> 
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/MasInfo/:id" element={<Componente />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/interfaz" element={<Interfaz userdata={userData} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
