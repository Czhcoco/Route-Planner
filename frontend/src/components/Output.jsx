import React, { Component } from "react";
import Map from "./Map";
import Routes from "./Routes";

class Output extends Component {
  constructor(props) {
    super(props);
    let routes = this.props.output.sort(
      (a, b) => a.risk > b.risk ? 1 : a.risk < b.risk ? -1 : a.stops.length - b.stops.length
    );

    this.state = {
      routes: routes,
      bestRoute: routes[0]
    };
  }

  render() {
    return (
      <div className="row align-self-center justify-content-center">
        <div className="col-12 col-sm">
          <Map route={this.state.bestRoute.stops} date={this.props.date} trans={this.props.trans}/>
        </div>
        <div className="col-12 col-sm">
          <Routes routes={this.state.routes} />
        </div>
      </div>
    );
  }
}

export default Output;
