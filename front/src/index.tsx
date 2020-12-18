import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./reset.css";
import Home from "./screens";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Route exact path="/" component={Home} />
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
