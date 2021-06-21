import React from 'react';
import Users from "./Users";

function UserData(props) {

    const { persons } = props

    if (!persons || persons.length === 0) return <p>Нет данных.</p>

    return (
        <div>
            <table>
                <thead>
                <tr>
                    <th>id</th>
                    <th>fullName</th>
                    <th>login</th>
                    <th>email</th>
                </tr>
                </thead>
                <tbody>
                {
                    persons.map((person) =>
                        <tr key={person.id}>
                            <td>{person.id}</td>
                            <td>{person.fullName}</td>
                            <td>{person.login}</td>
                            <td>{person.email}</td>
                        </tr>
                    )
                }
                </tbody>
            </table>
        </div>
    )
}

export default UserData