import '../style/Auth.css'
import React from 'react';

const MainPage = () => {
    return (
        <div className="sign in">
            <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/api/users">Users</a></li>
                <li><a href="/api/auth/login">Sign In</a></li>
                <li><a href="/api/auth/register">Sign Up</a></li>
            </ul>
        </div>
    );
}

export default MainPage;