import { useState } from "react";

const Checkbox = ({ hospital, usersHospitals, setUsersHospitals }) => {
    const [checked, setChecked] = useState(usersHospitals.includes(hospital._id));

    const handleChange = () => {
        let updatedHospitals = [...usersHospitals];
        if (checked) {
            updatedHospitals = updatedHospitals.filter(id => id !== hospital._id)
        } else {
            updatedHospitals.push(hospital._id)
        }
        setUsersHospitals(updatedHospitals);
        setChecked(!checked);
    };

    return (
        <div>
            <input className={"checkmark"} type="checkbox" name={hospital.name} id={hospital._id} checked={checked} onChange={handleChange} />
            <label htmlFor={hospital._id}>{hospital.name}</label>
        </div>
    );
}

export default Checkbox;