import { useState } from "react";

const Login = ({ setLoggedIn, setLoggedUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const sendUserData = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const response = await fetch('/login', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
    const json = await response.json()
    if (!response.ok) {
      setLoading(false);
      setError(json.error);
    }
    else {
      const userWithJWT = json.user;
      userWithJWT.token = json.token;
      console.log(json.token);
      setLoading(false);
      setLoggedIn(true);
      setLoggedUser(userWithJWT);
      localStorage.setItem("user", JSON.stringify(userWithJWT));
    }
  }

  return (
    <div>
      {/* We only have a message after successful registration, profile update, so we no longer need the form */}
      <form className="UserForm" onSubmit={sendUserData}>

        <div className="control">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            name="username"
            id="username"
            required
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        </div>

        <div className="control">
          <label htmlFor="password">Password:</label>
          <input
            //type="text"
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>


        <div className="buttons">
          <button type="submit" disabled={loading}>
            Log in
          </button>
        </div>
      </form>
      <div style={{ color: "red" }}>{error ? error : ""}</div>
    </div >

  );
}

export default Login;