import { Link } from 'react-router-dom'

const Nav = ({ loggedIn, setLoggedIn, loggedUser, setLoggedUser }) => {

    return (
        <nav>
            <Link to='/'>Home</Link>
            {loggedUser.isAdmin && <Link to='/admin'>Userlist</Link>}
            {loggedUser.isAdmin && <Link to='/myorders'>All Orders</Link>}
            {!loggedUser.isAdmin && loggedIn && <Link to='/order'>New order</Link>}
            {!loggedUser.isAdmin && loggedIn && <Link to='/myorders'>Order history</Link>}
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
                        }}>Log out</button>
                    </>
                }
            </span>
        </nav>
    );
}

export default Nav;