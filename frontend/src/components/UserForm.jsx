import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import Checkbox from "./Checkbox";
import "./UserForm.css";

const UserForm = ({ loggedUser, setLoggedUser }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const [fullname, setFullname] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usersHospitals, setUsersHospitals] = useState('')

  const [hospitalList, setHospitalList] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHospitals = () => {
      fetch("/api/hospitals", {
        method: "GET",
        headers: {
          'Authorization': `Bearer ${loggedUser.token}`
        }
      })
        .then(res => res.json())
        .then(json => {
          setHospitalList(json)
        })
        .catch(err => setError(err.message))
    }
    //If we have a user, we need the list of hospitals, so we fetch it and set it
    if (loggedUser) {
      fetchHospitals();
      setFullname(loggedUser.name);
      setUsername(loggedUser.username);
      setUsersHospitals(loggedUser.hospitals);
    }

  }, [loggedUser]);

  const sendUserData = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');
    const url = loggedUser ? `/api/updateuser/` : '/register';
    const fetchMethod = loggedUser ? 'PATCH' : 'POST';
    const headers = loggedUser ? {
      "Content-Type": "application/json",
      'Authorization': `Bearer ${loggedUser.token}`
    } : {
      "Content-Type": "application/json",
    }
    const regContent = password ? { name: fullname, username, password } : { name: fullname, username };
    const bodyContent = loggedUser ? { ...regContent, hospitals: usersHospitals } : regContent;
    const response = await fetch(url, {
      method: fetchMethod,
      headers: headers,
      body: JSON.stringify(bodyContent),
    })
    const json = await response.json()
    if (!response.ok) {
      setLoading(false);
      setError(json.error);
    }
    else {
      if (loggedUser) {
        json.token = loggedUser.token;
        setLoggedUser(json);
        localStorage.setItem('user', JSON.stringify(json))
      }
      setLoading(false);
      loggedUser ? setMessage("Profile successfully updated") : setMessage("Successful registration, your profile will be validated by an admin");
    }
  };

  return (
    <div className={"orderpage"}>
      {/* We only have a message after successful registration, profile update, so we no longer need the form */}
      <form className="UserForm" onSubmit={sendUserData}>
        <div className="control">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="name"
            id="name"
            value={fullname}
            required
            onChange={e => setFullname(e.target.value)}
          />
        </div>

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
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>

        {hospitalList && <div className="hospitals">
          {hospitalList.map(hospital => <Checkbox hospital={hospital} usersHospitals={usersHospitals} setUsersHospitals={setUsersHospitals} key={hospital._id} setUser />)}
        </div>}

        <div className="buttons">
          <button type="submit" disabled={loading}>
            {loggedUser ? "Update profile" : "Register"}
          </button>

          <button type="button" onClick={() => navigate('/')}>
            Cancel
          </button>
        </div>
      </form>
      {error && <div className={"error"}>{error ? error : ""}</div>}
      {message && <div className={"message"}>{message ? message : ""}</div>}
    </div >
  );
};

export default UserForm;