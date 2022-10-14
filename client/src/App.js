import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/login";
import Home from "./components/home";
import Admin from "./components/admin";
import Create from "./components/create";

function App() {
  const [loginId, setLoginid] = useState(null)
  React.useEffect(() => {
    setLoginid(localStorage.getItem("loginId"))
  }, [loginId])
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path='/login' element={<Login setLoginid={setLoginid} />} />
        <Route path='/admin' element={loginId ? <Admin setLoginid={setLoginid} /> : <Login setLoginid={setLoginid} />} />
        <Route path='/create' element={<Create />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
