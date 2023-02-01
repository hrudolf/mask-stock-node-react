import { useEffect, useState } from "react";
import OrderForm from "../components/OrderForm";

const Order = ({ user, loggedIn }) => {
    const [maskStock, setmaskStock] = useState(null)

    useEffect(() => {
        const controller = new AbortController();

        fetch("/api/stock").then((res) => res.json())
            .then((res) => {
                setmaskStock(res.stock);
            })
            .catch((error) => {
                if (error.name !== "AbortError") {
                    setmaskStock({});
                    throw error;
                }
            });

        return () => controller.abort();
    }, []);


    return (
        <OrderForm user={user} loggedIn={loggedIn} maskStock={maskStock} />
    )

}

export default Order;
