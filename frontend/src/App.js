import { useState } from "react";
import Nav from "./components/Nav";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import UserForm from "./components/UserForm";
import { useEffect } from "react";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loggedUser, setLoggedUser] = useState('');

  /*   const [loggedIn, setLoggedIn] = useState(true);
    const [loggedUser, setLoggedUser] = useState({
      _id: "63d81d6668ca1d35a1f81277",
      name: "Doctor House",
      username: "AwesomeUser008",
      hospitals: ["63d7de20e22bca2c9ef5b242", "63d7de20e22bca2c9ef5b24a"]
    }); */

  return (
    <div className="App">
      <Nav loggedIn={loggedIn} setLoggedIn={setLoggedIn} loggedUser={loggedUser} setLoggedUser={setLoggedUser} />
      <Routes>
        <Route path="/" element={<Home user={loggedUser} />}></Route>
        {/* {/* <Route path="/login" element={<Login user={loggedUser} />}></Route> */}
        <Route path="/register" element={<UserForm />}></Route>
        <Route path="/profile" element={<UserForm user={loggedUser} />}></Route>
      </Routes>
    </div>
  );
}

export default App;
