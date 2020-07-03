import React, { Component } from "react";

class Route extends Component {
  render() {
    const route = {
      stops: this.props.route.stops.reduce((a, b) => a + " - " + b, "").slice(3),
      risk: this.props.route.risk
    }

    return (
      <div className="row justify-content-center">
        <div className="col-sm" align="center">
          {route.stops}
        </div>
        <div className="col-sm" align="center">
          {route.risk}
        </div>
      </div>
    );
  }
}

export default Route;
