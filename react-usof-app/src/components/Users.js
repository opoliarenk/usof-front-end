import '../style/Auth.css'
import React from 'react';
import axios from "axios";
// import {render} from "@testing-library/react";

const Users = () => {
    const users = getUsers();

    const getUsers = async () => {
        const users = axios.get('http://localhost:3000/api/users');

        return users;
    }

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
