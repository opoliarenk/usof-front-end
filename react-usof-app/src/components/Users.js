import '../App.css'
import React from 'react';
import {render} from "@testing-library/react";

const Users = ({getUsers}) => {
    const users = getUsers();

    return (
        <div className="users">
            <ul>
                <li><a className="active" href="#home">Home</a></li>
                <li><a href="#news">News</a></li>
                <li><a href="#contact">Contact</a></li>
                <li><a href="#about">About</a></li>
            </ul>
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
