import React from "react";
import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import HomePage from "./components/homePage";
import Waiting from "./components/waiting";
import Connecting from "./components/connecting";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/waiting" component={Waiting} />
          <Route path="/connecting" component={Connecting} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
