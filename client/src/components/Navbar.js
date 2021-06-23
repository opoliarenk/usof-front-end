import '../style/Auth.css'
import React from 'react';
import { useHistory } from 'react-router-dom';

const Navbar = () => {
    const history = useHistory();

    return (
        <div>
            <button className="navBar" onClick={() => history.push('/')}>Home</button>
            <button className="navBar" onClick={() => history.push('/api/auth/login')}>Sign in</button>
            <button className="navBar" onClick={() => history.push('/api/auth/register')}>Sign up</button>
            <button className="navBar" onClick={() => history.push('/api/users')}>Users</button>
        </div>
    );
}

export default Navbar;