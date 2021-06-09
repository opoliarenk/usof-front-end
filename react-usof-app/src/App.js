import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Users from "./components/Users";

const App = () => {

    const login = async (user) => {
        const res = await fetch('http://localhost:3000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(user),
        });

        const data = await res.json();

        console.log(data);
    }

    const register = async (user) => {
        const res = await fetch('http://localhost:3000/api/auth/register', {
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
        const res = await fetch('http://localhost:3000/api/users');

        const data = await res.json();

        console.log(data);
        return data;
    }

  return (
      <Router>
          <Route path="/api/auth">
              <div className="container">
                  <SignIn loginUser={login}/>
                  <SignUp registerUser={register}/>
              </div>
          </Route>
          <Route path="/api/users">
              <div className="container">
                  <Users getUsers={getUsers}/>
              </div>
          </Route>
      </Router>
  );
}

export default App;
