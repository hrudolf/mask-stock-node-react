import { useState } from "react";
import { useEffect } from "react";

const MyOrders = ({ loggedUser }) => {
    const [orders, setOrders] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        let abortController = new AbortController();
        const fetchOrders = async () => {
            const response = await fetch(`/api/order`, {
                signal: abortController.signal,
                headers: {
                    'Authorization': `Bearer ${loggedUser.token}`
                }
            });
            const json = await response.json();
            if (!response.ok) {
                setLoading(false);
                setError(json.error)
            } else {
                console.log(json);
                setLoading(false);
                setOrders(json);
            }
        }
        fetchOrders();

        return () => {
            abortController.abort();
        }
    }, [loggedUser.token])

    return (
        <div>
            <h1>My orders</h1>
            {error && <p>{error}</p>}
            {loading && <p>Loading...</p>}
            {orders && orders.length > 0 &&
                <table>
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Hospital Name</th>
                            <th>Date</th>
                            <th>Items</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.sort((a,b) => new Date(b.date) - new Date(a.date)).map(order => {
                            return (
                                <tr key={order._id}>
                                    <td>{order.user.name}</td>
                                    <td>{order.hospital.name}</td>
                                    <td>{order.date.slice(0, 10)}</td>
                                    <td>{order.goods.map(good => {
                                        return (
                                            <p key={good._id}>{good.item.item}, {good.quantity} pieces, {good.price} HUF/pcs</p>
                                        )
                                    })}</td>
                                    <td>{order.goods.reduce((acc, curr) => acc + (curr.quantity * curr.price), 0)} HUF</td>
                                </tr>
                            )
                        })
                        }
                    </tbody>
                </table>
            }

        </div>
    );
}

export default MyOrders;