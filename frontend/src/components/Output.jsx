import React, { Component } from "react";
import Map from "./Map";
import BestRoute from "./BestRoute";
import OptionalRoute from "./OptionalRoute";

class Output extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="row justify-content-center">
        <Map />
        <BestRoute />
        <OptionalRoute />
      </div>
    );
  }
}

export default Output;
