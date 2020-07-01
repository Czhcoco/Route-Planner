import React, { Component } from "react";
import Map from "./Map";
import BestRoute from "./BestRoute";
import OptionalRoute from "./OptionalRoute";

class Output extends Component {
  state = {};
  render() {
    return (
      <div>
        <Map />
        <span className="row">
          <BestRoute />
          <OptionalRoute />
        </span>
      </div>
    );
  }
}

export default Output;
