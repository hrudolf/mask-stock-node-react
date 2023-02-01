import { Link, useNavigate } from 'react-router-dom'

const Nav = ({ loggedIn, setLoggedIn, loggedUser, setLoggedUser }) => {
    const navigate = useNavigate();

    return (
        <nav>
            <Link to='/'>Home</Link>
            {loggedUser.isAdmin && <Link to='/admin'>Userlist</Link>}
            {loggedUser.isAdmin && <Link to='/myorders'>All Orders</Link>}
            {loggedIn && <Link to='/order'>New order</Link>}
            {!loggedUser.isAdmin && loggedIn && <Link to='/myorders'>My orders</Link>}
            <span>
                {!loggedIn &&
                    <>
                        <Link to='/register'>Sign up</Link>
                        <Link to='/login'>Log in</Link>
                    </>}
                {loggedIn &&
                    <>
                        {`${loggedUser.username}`}
                        <Link to='/profile'>User profile</Link>
                        <button onClick={() => {
                            setLoggedIn(false);
                            setLoggedUser('');
                            localStorage.removeItem('user');
                            navigate('/');
                        }}>Log out</button>
                    </>
                }
            </span>
        </nav>
    );
}

export default Nav;