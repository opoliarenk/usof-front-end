import '../style/Auth.css'
import React, { useEffect, useState } from 'react';
import axios from "axios";
import UserData from "./UserData";
import OnLoadingUserData from "./LoadingPersonsData";
// import {render} from "@testing-library/react";

const Users = () => {

    const DataLoading =  OnLoadingUserData(UserData);

    const [appState, setAppState] = useState({
        loading: false,
        persons: null,
    });

    useEffect(() => {
        setAppState({loading: true})
        const apiUrl = 'http://localhost:3000/api/users';
        axios.get(apiUrl).then((resp) => {
            const allPersons = resp.data;
            setAppState({
                loading: false,
                persons: allPersons
            });
        });
    }, [setAppState]);



    return (
        <div className="users">
            <div className="centered">
                <p>Users</p>
                <div>
                    <DataLoading isLoading={appState.loading} persons={appState.persons} />
                </div>
            </div>
        </div>
    );
}

export default Users;
