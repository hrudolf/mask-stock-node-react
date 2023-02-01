import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Nav from "./components/Nav";
import Home from "./pages/Home";
import UserForm from "./components/UserForm";
import AdminSite from "./pages/AdminSite";
import Order from "./pages/Order";
import Login from "./pages/Login";

function App() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [loggedUser, setLoggedUser] = useState(''); 

    useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user"));
    if(user){
      setLoggedIn(true);
      setLoggedUser(user);
    }
    console.log(user);
    },[])

  return (
    <div className="App">
      <Nav loggedIn={loggedIn} setLoggedIn={setLoggedIn} loggedUser={loggedUser} setLoggedUser={setLoggedUser} />
      <Routes>
        <Route path="/" element={<Home user={loggedUser} />}></Route>
        <Route path="/register" element={<UserForm />}></Route>
        <Route path="/profile" element={<UserForm user={loggedUser} setUser={setLoggedUser} />}></Route>
        <Route path="/admin" element={loggedUser.isAdmin ? <AdminSite /> : <Navigate to="/" />}></Route>
        <Route path="/order" element={<Order user={loggedUser} loggedIn={loggedIn} />}></Route>
        <Route path="/login" element={loggedIn ? <Navigate to="/" /> : <Login setLoggedIn={setLoggedIn} setLoggedUser={setLoggedUser} />}></Route>
      </Routes>
    </div>
  );
}

export default App;
