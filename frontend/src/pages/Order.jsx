import { useEffect, useState } from "react";

const Order = ({ user, loggedIn }) => {
    const [maskStock, setMaskStock] = useState(null)
    const [hospitalList, setHospitalList] = useState(null);
    const [chosenHospital, setChosenHospital] = useState(null);
    const [order, setOrder] = useState([]);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleCheckBox = (hospitalID) => {
        setChosenHospital(hospitalID)
    }

    const handleQuantityChange = (e, type) => {

        const filteredOrder = JSON.parse(JSON.stringify(order)).filter(item => item.item !== type._id);

        if (Number(e.target.value) !== 0) {

            const addToOrder = {
                item: type._id,
                quantity: e.target.value
            }
            filteredOrder.push(addToOrder)
        }
        setOrder(filteredOrder)
    }

    const handleSubmit = async () => {

        setError('');
        setMessage('');

        if (chosenHospital && user && order.length > 0) {
            const newOrder = {
                user: user._id,
                hospital: chosenHospital,
                goods: order
            }
            const response = await fetch("/api/order", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newOrder)
            })
            const json = await response.json()
            if (response.ok) {
                setMessage('Order succesfully created!')
            } else {
                setError(json.error)
            }
        } else {
            if (!(order.length > 0)) {
                setError('Your cart is empty!')
            }
            if (!chosenHospital) {
                setError('You have not selected any hospitals!')
            }
        }
    }

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
                            {hospitalList && user &&
                                hospitalList.filter(hosp => user.hospitals.includes(hosp._id)).map(hosp =>
                                    <tr key={hosp._id}>
                                        <td>{hosp.name}</td>
                                        <td>
                                            <input type="radio" name="checked" defaultChecked={false} onChange={() => handleCheckBox(hosp._id)} />
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
                                        <input type="number" onChange={(e) => handleQuantityChange(e, type)} />
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    <button onClick={handleSubmit}>Submit</button>
                    {message && <div className="message">{message}</div>}
                    {error && <div className="error">{error}</div>}
                </div>
            }
        </div >
    )

}

export default Order;
