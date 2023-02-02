import { Link, useNavigate } from 'react-router-dom'

const Nav = ({ loggedIn, setLoggedIn, loggedUser, setLoggedUser }) => {
    const navigate = useNavigate();

    return (
        <nav>
            <Link to='/'>Home</Link>
            {loggedUser.isAdmin && <Link to='/admin'>Admin Page</Link>}
            {loggedUser.isAdmin && <Link to='/myorders'>All Orders</Link>}
            {loggedIn && <Link to='/order'>New order</Link>}
            {!loggedUser.isAdmin && loggedIn && <Link to='/myorders'>My orders</Link>}
            <div className='logButtons'>
                {!loggedIn &&
                    <>
                        <Link to='/register'>Sign up</Link>
                        <Link to='/login'>Log in</Link>
                    </>}
                {loggedIn &&
                    <>
                        <span>{`${loggedUser.username}`}</span>
                        <Link to='/profile'>User profile</Link>
                        <span onClick={() => {
                            setLoggedIn(false);
                            setLoggedUser('');
                            localStorage.removeItem('user');
                            navigate('/');
                        }}>Log out</span>
                    </>
                }
            </div>
        </nav>
    );
}

export default Nav;