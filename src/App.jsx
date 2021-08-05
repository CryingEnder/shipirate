import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Home from "./components/Home";
import Logout from "./components/Logout";
import PaymentForm from "./components/PaymentForm";
import NotFound from "./components/NotFound";
import auth from "./services/authService";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userFound = auth.getCurrentUser();
    setUser(userFound);
  }, []);

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home user={user} />
        </Route>
        <Route path="/logout">
          <Logout />
        </Route>
        <Route path="/checkout">
          <PaymentForm />
        </Route>
        <Route path="/404">
          <NotFound />
        </Route>
        <Redirect from="/login" exact to="/" />
        <Redirect from="/signup" exact to="/" />
        <Redirect to="/404" />
      </Switch>
    </Router>
  );
}

export default App;
