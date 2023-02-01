import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Nav from "./components/Nav";
import Home from "./pages/Home";
import UserForm from "./components/UserForm";
import AdminSite from "./pages/AdminSite";
import Order from "./pages/Order";
import Login from "./pages/Login";
import MyOrders from "./pages/MyOrders";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loggedUser, setLoggedUser] = useState('');

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    const fetchUser = async () => {
      const response = await fetch(`/api/users/`, {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });
      const json = await response.json();

      if (response.ok) {
        setLoggedIn(true);
        json.token = user.token;
        setLoggedUser(json);
        localStorage.setItem('user', JSON.stringify(json))
      } else {
        console.log('Error');
        console.log(json.error);
      }
    }

    if (user) {
      fetchUser();
    }
  }, [])

  return (
    <div className="App">
      <Nav loggedIn={loggedIn} setLoggedIn={setLoggedIn} loggedUser={loggedUser} setLoggedUser={setLoggedUser} />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/register" element={<UserForm />}></Route>
        <Route path="/profile" element={<UserForm loggedUser={loggedUser} setLoggedUser={setLoggedUser} />}></Route>
        <Route path="/admin" element={loggedUser.isAdmin ? <AdminSite loggedUser={loggedUser} /> : <Navigate to="/" />}></Route>
        <Route path="/order" element={loggedIn ? <Order loggedUser={loggedUser} loggedIn={loggedIn} /> : <Navigate to="/" />}></Route>
        <Route path="/login" element={loggedIn ? <Navigate to="/" /> : <Login setLoggedIn={setLoggedIn} setLoggedUser={setLoggedUser} />}></Route>
        <Route path="/myorders" element={loggedIn ? <MyOrders loggedUser={loggedUser} /> : <Navigate to="/" />}></Route>
      </Routes>
    </div>
  );
}

export default App;
