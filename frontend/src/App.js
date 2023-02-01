import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Nav from "./components/Nav";
import Home from "./pages/Home";
import UserForm from "./components/UserForm";
import AdminSite from "./pages/AdminSite";
import Order from "./pages/Order";

function App() {
  /*   const [loggedIn, setLoggedIn] = useState(false);
    const [loggedUser, setLoggedUser] = useState(''); */

  const [loggedIn, setLoggedIn] = useState(true);
  const [loggedUser, setLoggedUser] = useState({
    _id: "63d92641502713d5846282fe",
    name: "Doctor House",
    username: "house",
    hospitals: ["63d7de20e22bca2c9ef5b242", "63d7de20e22bca2c9ef5b24a"],
    isAdmin: true
  });

  return (
    <div className="App">
      <Nav loggedIn={loggedIn} setLoggedIn={setLoggedIn} loggedUser={loggedUser} setLoggedUser={setLoggedUser} />
      <Routes>
        <Route path="/" element={<Home user={loggedUser} />}></Route>
        <Route path="/register" element={<UserForm />}></Route>
        <Route path="/profile" element={<UserForm user={loggedUser} setUser={setLoggedUser} />}></Route>
        <Route path="/admin" element={loggedUser.isAdmin ? <AdminSite /> : <Navigate to="/" />}></Route>
        <Route path="/order" element={<Order user={loggedUser} loggedIn={loggedIn}/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
