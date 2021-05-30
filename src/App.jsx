import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Home from "./components/Home";
import PaymentForm from "./components/PaymentForm";
import NotFound from "./components/NotFound";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
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
