import React from "react";
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import axios from 'axios';

import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Users from "./components/Users";
import PassReset from "./components/PassReset";


const App = () => {



    const email = async (user) => {
        const res = await fetch('http://localhost:3000/api/auth/password-reset', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(user),
        });

        const data = await res.json();

        console.log(data);
    }

    const getUsers = async () => {
        const users = axios.get('http://localhost:3000/api/users');

        return users;
    }

  return (
      <Router>
          <Switch>
              <Route path="/api/auth/login" component={SignIn} />
              <Route path="/api/auth/register" component={SignUp}/>
          </Switch>
          <Route path="/api/auth/users">
              <Users getUsers={getUsers}/>
          </Route>
          <Route path="/api/auth/password-reset">
              <PassReset resetPass={email}/>
          </Route>
      </Router>
  );
}

export default App;
