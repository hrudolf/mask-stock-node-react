import { useState } from "react";

const AdminUserList = ({ user, loggedUser, setError }) => {
    const [verified, setVerified] = useState(user.isVerified);
    const [isAdmin, setIsAdmin] = useState(user.isAdmin);

    const changeRights = async (type) => {
        setError('');
        const response = await fetch(`/api/${type}/${user._id}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${loggedUser.token}`
            }
        })

        const json = await response.json();
        if (!response.ok) {
            setError(json.error);
        } else {
            type === "verifyuser" ? setVerified(!verified) : setIsAdmin(!isAdmin)
        }
    }

    return (
        <tr key={user._id}>
            <td>{user.name}</td>
            <td>{user.username}</td>
            <td onClick={() => changeRights('verifyuser')}> <button style={{ color: verified ? "green" : "red" }} >{verified ? "True" : "False"}</button> </td>
            <td onClick={() => changeRights('makeadmin')}> <button style={{ color: isAdmin ? "green" : "red" }} >{isAdmin ? "True" : "False"}</button> </td>
        </tr>
    );
}

export default AdminUserList;