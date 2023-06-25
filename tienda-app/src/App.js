import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';
import Main from './Main';
import Interfaz from './Interfaz';
import MangaFetcherId from './DataComponents/MangaFetcherId';
import Comment_client from './DataComponents/CommentClient';

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
          <Route path="/MasInfo/:id" element={<MangaFetcherId userData={userData} />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/interfaz" element={<Interfaz userdata={userData} />} />
          <Route path="/prueba/:id" element={<Comment_client  />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
