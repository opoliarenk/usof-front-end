import '../style/Auth.css'
import React from 'react';
import { useHistory } from 'react-router-dom';

const Navbar = () => {
    const history = useHistory();

    return (
        <div>
            <button onClick={() => history.push('/')}>Home</button>
            <button onClick={() => history.push('/api/auth/login')}>Sign in</button>
            <button onClick={() => history.push('/api/auth/register')}>Sign up</button>
            <button onClick={() => history.push('/api/auth/users')}>Users</button>
        </div>
    );
}

export default Navbar;