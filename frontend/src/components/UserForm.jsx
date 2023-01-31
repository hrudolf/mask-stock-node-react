import "./UserForm.css";

const UserForm = ({ onSave, disabled, user, onCancel, message }) => {
    const onSubmit = (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      const entries = [...formData.entries()];
  
      const user = entries.reduce((acc, entry) => {
        const [k, v] = entry;
        acc[k] = v;
        return acc;
      }, {});
  
      return onSave(user);
    };

    return (
      <form className="UserForm" onSubmit={onSubmit}>
        <div className="control">
          <label htmlFor="name">Name:</label>
          <input
            defaultValue={user ? user.name : null}
            name="name"
            id="name"
          />
        </div>
  
        <div className="control">
          <label htmlFor="username">Username:</label>
          <input
            defaultValue={user ? user.username : null}
            name="username"
            id="username"
          />
        </div>
  
        <div className="control">
          <label htmlFor="password">Password:</label>
          <input
            defaultValue={user ? user.password : null} 
            //type="password"
            name="password"
            id="password"
          />
        </div>
  
        <div className="buttons">
          <button type="submit" disabled={disabled}>
            {user ? "Update User" : "Create User"}
          </button>
  
          <button type="button" onClick={onCancel}>
            Cancel
          </button>
        </div>
      <div style={{color: "red"}}>{message ? message : ""}</div>
      </form>
    );
  };
  
  export default UserForm;
  