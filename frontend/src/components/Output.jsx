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
        <BestRoute />
        <OptionalRoute />
      </div>
    );
  }
}

export default Output;
