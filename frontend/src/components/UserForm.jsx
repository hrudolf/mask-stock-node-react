import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import "./UserForm.css";

const UserForm = ({ user }) => {
  const [fullname, setFullname] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [hospitals, setHospitals] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHospitals = async () => {
      fetch("/api/hospitals")
        .then(res => res.json())
        .then(json => {
          setHospitals(json.hospitals)
        })
        .catch(err => setError(err.message))
    }
    //If we have a user, we need the list of hospitals, so we fetch it and set it
    if (user) {
      fetchHospitals();
      setFullname(user.name);
      setUsername(user.username);
    }

  }, [user]);

  const sendUserData = async () => {
    setLoading(true);
    setError('');
    const url = user ? `/updateuser/${user.id}` : '/register';
    const fetchMethod = user ? 'PATCH' : 'POST';
    const regContent = password ? { name: fullname, username, password } : { name: fullname, username };
    const bodyContent = user ? { ...regContent, hospitals } : regContent;
    const response = await fetch(url, {
      method: fetchMethod,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyContent),
    })
    const json = await response.json()
    if (!response.ok) {
      setLoading(false);
      setError(json.error);
    }
    else {
      setLoading(false);
      user ? setMessage("Profile successfully updated") : setMessage("Successful registration, your profile will be validated by an admin");
    }
  };

  return (
    <div>
      {/* We only have a message after successful registration, profile update, so we no longer need the form */}
      <form className={message ? "UserForm invisible" : "UserForm"}>
        <div className="control">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="name"
            id="name"
            value={fullname}
            onChange={e => setFullname(e.target.value)}
          />
        </div>

        <div className="control">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            name="username"
            id="username"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        </div>

        <div className="control">
          <label htmlFor="password">Password:</label>
          <input
            type="text"
            //type="password"
            name="password"
            id="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>

        {hospitals && <div className="hospitals">
          {hospitals.map(hospital => {
            return (
              <div key={hospital._id}>
                <input type="checkbox" name={hospital.name} id={hospital._id} checked={false} />
                <label for={hospital._id}>{hospital.name}</label>
              </div>
            )
          })}
        </div>}

        <div className="buttons">
          <button type="submit" disabled={loading} onClick={sendUserData}>
            {user ? "Update User" : "Create User"}
          </button>

          <button type="button" onClick={() => navigate('/')}>
            Cancel
          </button>
        </div>
      </form>
      <div style={{ color: "red" }}>{error ? error : ""}</div>
      <div style={{ color: "green" }}>{message ? message : ""}</div>
    </div >
  );
};

export default UserForm;