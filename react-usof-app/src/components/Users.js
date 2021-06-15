import '../style/Auth.css'
import React from 'react';
import {render} from "@testing-library/react";

const Users = ({getUsers}) => {
    const users = getUsers();

    return (
        <div className="users">
            <div className="centered">
                <p>Users</p>
                <ul>
                    {/*<li>{users}</li>*/}
                    {/*{users.map(person => <li>{person.fullName}</li>)}*/}
                </ul>
            </div>
        </div>
    );
}

export default Users;
