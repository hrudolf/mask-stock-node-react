import { useState } from "react";
import { useEffect } from "react";

const AdminSite = () => {
    const [userList, setUserList] = useState();

    useEffect(() => {

    })

    return (
        <div className="admin">
            <h1>Admin Site</h1>
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>

                </tbody>
            </table>
        </div>
    );
}

export default AdminSite;