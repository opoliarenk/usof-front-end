import React from "react";
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";

import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Users from "./components/Users";
import PassReset from "./components/PassReset";
import Navbar from "./components/Navbar";
// import PublicRoute from "./components/PublicRoute";

const App = () => {
  return (
      <Router>
          <Navbar />
          <Switch>
              <Route exact path="/api/auth/login" component={SignIn}/>
              <Route exact path="/api/auth/register" component={SignUp}/>
              <Route exact path="/api/users" component={Users}/>
              <Route exact path="/api/auth/password-reset" component={PassReset}/>
          </Switch>
      </Router>
  );
}

export default App;
