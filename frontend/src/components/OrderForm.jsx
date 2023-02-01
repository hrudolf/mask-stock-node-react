const OrderForm = ({ user, loggedIn, maskStock }) => {

    console.log(user)

    return (

        < div className="orderpage" >
            {!loggedIn &&                             //if user is not logged in
                <h2>Please log in first</h2>
            }
            {loggedIn &&
                <div className="masks">
                    <h2 id="availablemasks">Available Masks</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Mask Type</th>
                                <th>Available</th>
                            </tr>
                        </thead>
                        <tbody>
                            {maskStock && maskStock.map(type =>
                                <tr>
                                    <td key={type.item}>{type.item}</td>
                                    <td>{type.quantity} pcs</td>
                                </tr>

                            )}
                        </tbody>
                    </table>
                    <h2>Hospitals for user {user.username}</h2>
                    <ul>
                        {user.hospitals.map(hospital =>
                            <li>{hospital}</li>
                        )}
                    </ul>
                </div>
            }
        </div >
    )
}

export default OrderForm;