import { useState } from "react";
import { useEffect } from "react";
import AdminUserList from "../components/AdminUserList";

const AdminSite = ({loggedUser}) => {
    const [userList, setUserList] = useState();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        let abortController = new AbortController();
        setLoading(true);
        const fetchUsers = async () => {
            const response = await fetch('/api/users', {
                signal: abortController.signal,
                headers: {
                    'Authorization': `Bearer ${loggedUser.token}`
                }

            });
            const json = await response.json();
            setLoading(false);
            setUserList(json);
        }

        fetchUsers();
        return () => {
            abortController.abort();
        }
    }, [loggedUser.token])

    return (
        <div className="orderpage">
            <h1>Admin Dashboard</h1>
            {loading && <p> Loading... </p>}
            {userList && <table>
                <thead>
                    <tr>
                        <th>Full name</th>
                        <th>Username</th>
                        <th>Verified</th>
                        <th>Admin?</th>
                    </tr>
                </thead>
                <tbody>
                    {userList.map(user => <AdminUserList user={user} key={user._id} loggedUser={loggedUser} setError={setError} setMessage={setMessage}/>)}
                </tbody>
            </table>}
            {error && <div className="error">{error}</div>}
            {message && <div className="message">{message}</div>}
        </div>
    );
}

export default AdminSite;