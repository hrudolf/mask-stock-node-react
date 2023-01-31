import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserForm from "./UserForm";


const Register = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const createUser = async(user) => {
        setLoading(true);
        console.log(user);
        setMessage("");
        const response = await fetch("/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        })
        const json = await response.json()
        if (!response.ok) {setMessage(json.error); setLoading(false)}
        else {
            setLoading(false);
            setMessage("Succesful registration");
            (setTimeout(() => {
           navigate('/login') 
        }, 2500))  
        }      
    };

    return (
            <UserForm
                onCancel={() => navigate("/")}
                disabled={loading}
                onSave={createUser}
                message={message}
            />
    );

}

export default Register;
