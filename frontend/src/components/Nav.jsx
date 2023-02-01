import { Link } from 'react-router-dom'

const Nav = ({ loggedIn, setLoggedIn, loggedUser, setLoggedUser }) => {

    return (
        <nav>
            <Link to='/'>Home</Link>
            <Link to='/order'>Order</Link>
            {!loggedIn &&
                <>
                    <Link to='/register'>Sign up</Link>
                    <Link to='/login'>Log in</Link>
                </>}
            {loggedIn &&
                <>
                    <span>
                        {`${loggedUser.username}`}
                        <Link to='/profile'>User profile</Link>
                    </span>
                    <button onClick={() => {
                        setLoggedIn(false);
                        setLoggedUser('');
                        localStorage.removeItem('user');
                    }}>Log out</button>
                </>
            }
        </nav>
    );
}

export default Nav;