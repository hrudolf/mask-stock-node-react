import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserForm from "./UserForm";

const UserProfile = ({ user }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [logName, setLogName] = useState(user.name);
  const [logUsername, setlogUsername] = useState(user.username);
  const [logPassword, setLogPassword] = useState(user.password);
  const [hospital, setHospital] = useState([]);

  useEffect(() => {
    fetch("/api/hospitals")
      .then((res) => res.json())
      .then((x) => {
        // const hospitalNames = [];
        // x.hospitals.map((hospital) => hospitalNames.push(hospital.name));
        setHospital(x.hospitals)
    });
  }, []);

  const updateUser = async () => {
    setLoading(true);
    setMessage("");
    const response = await fetch(`/updateUser/${user._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: logName,
        username: logUsername,
        password: logPassword,
      }),
    });
    const json = await response.json();
    if (!response.ok) {
      setMessage(json.error);
      setLoading(false);
    } else {
      setLoading(false);
      setMessage("Succesful registration");
      setTimeout(() => {
        navigate("/login");
      }, 2500);
    }
  };

  return (
    <form className="UserForm" onSubmit={updateUser}>
      <div className="control">
        <label htmlFor="name">Name:</label>
        <input
          defaultValue={user ? user.name : null}
          name="name"
          id="name"
          value={logName}
          onChange={(e) => setLogName(e.target.value)}
        />
      </div>

      <div className="control">
        <label htmlFor="username">Username:</label>
        <input
          defaultValue={user ? user.username : null}
          name="username"
          id="username"
          value={logUsername}
          onChange={(e) => setlogUsername(e.target.value)}
        />
      </div>

      <div className="control">
        <label htmlFor="password">Password:</label>
        <input
          defaultValue={user ? user.password : null}
          //type="password"
          name="password"
          id="password"
          value={logPassword}
          onChange={(e) => setLogPassword(e.target.value)}
        />
      </div>
        {hospital && hospital.map(hosp => <p key={hosp._id}>{hosp.name}</p>)}
      <div className="buttons">
        <button type="submit" disabled={loading}>
          {user ? "Update User" : "Create User"}
        </button>
      </div>
      <div style={{ color: "red" }}>{message ? message : ""}</div>
    </form>
  );
};

export default UserProfile;
