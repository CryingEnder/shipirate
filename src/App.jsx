import React, { Fragment } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Home from "./components/Home";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import PaymentForm from "./components/PaymentForm";
import NotFound from "./components/NotFound";

function App() {
  return (
    <Router>
      {/*TODO: redirect to payment etc to not rerender all the components? */}
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/login">
          <Home>
            <LoginForm />
          </Home>
        </Route>
        <Route path="/signup">
          <Home>
            <SignupForm />
          </Home>
        </Route>
        <Route path="/checkout">
          <PaymentForm />
        </Route>
        <Route path="/404">
          <NotFound />
        </Route>
        <Redirect to="/404" />
      </Switch>
    </Router>
  );
}

export default App;
