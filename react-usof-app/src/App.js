import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";

const App = () => {

    const login = async () => {
        const res = await fetch('http://localhost:3000/api/post/')

        const data = await res.json();

        console.log(data);
    }


    // const login = async (user) => {
    //     const res = await fetch('http://localhost:3000/api/auth/login', {
    //         method: 'POST',
    //         body: JSON.stringify(user),
    //     })
    //
    //     const data = await res.json();
    //
    //     console.log(data);
    // }

  return (
      <Router>
          <Route path="/api/auth">
              <div className="container">
                  <SignIn loginUser={login}/>
                  <SignUp/>
              </div>
          </Route>
      </Router>
  );
}

export default App;
