import { useEffect, useState } from "react";
import OrderForm from "../components/OrderForm";


const Order = ({ user, loggedIn }) => {
    const [maskStock, setMaskStock] = useState(null)
    const [hospitalList, setHospitalList] = useState(null);
    const [chosenHospital, setChosenHospital] = useState(null);

    useEffect(() => {
        const controller = new AbortController();
        fetch("/api/hospitals")
            .then(res => res.json())
            .then(res => {
                setHospitalList(res)
            })
            .catch((error) => {
                if (error.name !== "AbortError") {
                    setHospitalList(null);
                    throw error;
                }
            });


        fetch("/api/stock").then((res) => res.json())
            .then((res) => {
                setMaskStock(res);
            })
            .catch((error) => {
                if (error.name !== "AbortError") {
                    setMaskStock(null);
                    throw error;
                }
            });

        return () => controller.abort();
    }, []);


    return (
        < div className="orderpage" >
            {!loggedIn &&
                <h2>Please log in first</h2>
            }
            {loggedIn &&
                <div className="masks">
                    <table>
                        <thead>
                            <tr key="head">
                                <th>Hospitals for user {user.username}</th>
                                <th>Select</th>
                            </tr>
                        </thead>
                        <tbody>
                            {hospitalList &&
                                hospitalList.filter(hosp => user.hospitals.includes(hosp._id)).map(hosp =>
                                    <tr key={hosp._id}>
                                        <td>{hosp.name}</td>
                                        <td>
                                            <input type="checkbox" onChange={() => setChosenHospital(hosp._id)}/>
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                    <h2 id="availablemasks">Available Masks</h2>
                    <table>
                        <thead>
                            <tr key="maskHead">
                                <th>Mask Type</th>
                                <th>Available</th>
                                <th>Quantity</th>
                            </tr>
                        </thead>
                        <tbody>
                            {maskStock && maskStock.map(type =>
                                <tr key={type.item}>
                                    <td key={type.item}>{type.item}</td>
                                    <td>{type.quantity} pcs</td>
                                    <td>
                                        <input type="number" />
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            }
        </div >
    )

}

export default Order;
