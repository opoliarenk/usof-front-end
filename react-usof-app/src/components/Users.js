import '../style/Auth.css'
import React from 'react';
// import {render} from "@testing-library/react";

const Users = ({getUsers}) => {
    const users = getUsers();

    return (
        <div className="users">
            <div className="centered">
                <p>Users</p>
                <div>
                    <button>{users}</button>
                    {users.map(person => <button>{person.fullName}</button>)}
                </div>
            </div>
        </div>
    );
}

export default Users;
