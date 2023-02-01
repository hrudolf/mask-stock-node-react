const OrderForm = ({ user, loggedIn, maskStock }) => {

    console.log(maskStock)

    return (

        < div className="orderpage" >
            {!loggedIn &&                             //if user is not logged in
                <h2>Please log in first</h2>
            }
            {loggedIn &&
                <div className="masks">
                    {maskStock && maskStock.map(type => <p key={type.item}>{type.item}</p>)}
                </div>
            }
        </div >
    )
}

export default OrderForm;