import '../style/Auth.css'
import React, {useState} from 'react';
import axios from "axios";

const Users = () => {
    const [users, setUsers] = useState();

    function axiosTest() {
        const promise = axios('http://localhost:3000/api/users');
        const dataPromise = promise.then((response) => response.data);

        return dataPromise;
    }


    function tryFub() {
        axiosTest()
            .then(data => {
                const user = data.data;
                setUsers(user);
                console.log(data.data)
            })
            .catch(err => console.log(err))
    }
    function check() {
        console.log('try -> ' + users);
    }

    return (
        <div className="users">
            <div className="centered">
                <p>Users</p>
                <div>
                    <button onClick={tryFub}/>
                    <button onClick={check}/>
                    {/*{tryFub}*/}
                    {/*<DataLoading isLoading={appState.loading} persons={appState.persons} />*/}
                </div>
            </div>
        </div>
    );
}

export default Users;
