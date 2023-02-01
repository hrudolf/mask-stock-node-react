import { useState } from "react";
import Nav from "./components/Nav";
import Home from "./pages/Home";
import Register from "./components/Register";
import Order from "./pages/Order";
import { Routes, Route } from 'react-router-dom'

function App() {
  const [loggedIn, setLoggedIn] = useState(true);
  const [loggedUser, setLoggedUser] = useState({ username: "house", name: "Dr House", hospitals: [], });


  return (
    <div className="App">
      <Nav loggedIn={loggedIn} setLoggedIn={setLoggedIn} loggedUser={loggedUser} setLoggedUser={setLoggedUser} />
      <Routes>
        <Route path="/" element={<Home user={loggedUser} />}></Route>
        {/* {/* <Route path="/login" element={<Login user={loggedUser} />}></Route> */}
        <Route path="/register" element={<Register />}></Route>
        <Route path="/order" element={<Order user={loggedUser} loggedIn={loggedIn}/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
