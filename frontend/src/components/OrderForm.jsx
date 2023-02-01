const OrderForm = ({ user, loggedIn, maskStock, hospitalList }) => {

    return (

        < div className="orderpage" >
            {!loggedIn &&                             //if user is not logged in
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
                                            <input type="checkbox" />
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

export default OrderForm;