import { useState } from "react";
import Nav from "./components/Nav";
import Home from "./pages/Home";
import Register from "./components/Register";
import { Routes, Route } from "react-router-dom";
import Profile from "./components/UserProfile";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loggedUser, setLoggedUser] = useState({});

  return (
    <div className="App">
      <Nav
        loggedIn={loggedIn}
        setLoggedIn={setLoggedIn}
        loggedUser={loggedUser}
        setLoggedUser={setLoggedUser}
      />
      <Routes>
        <Route path="/" element={<Home user={loggedUser} />}></Route>

        {/* {/* <Route path="/login" element={<Login user={loggedUser} />}></Route> */}
        <Route path="/profile" element={<Profile user={loggedUser} />}></Route>
        <Route path="/register" element={<Register />}></Route>
      </Routes>
    </div>
  );
}

export default App;
