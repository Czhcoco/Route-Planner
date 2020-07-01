import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import "bootstrap/dist/css/bootstrap.css";
import MainBlock from "./components/MainBlock";

ReactDOM.render(
  <React.StrictMode>
    <div className="container">
      <h1 className="row justify-content-center">Route Planner</h1>
      <MainBlock />
    </div>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
