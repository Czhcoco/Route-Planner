import React, { Component } from "react";

class Routes extends Component {
  render() {
    const bestRoute = {
      stops: this.props.routes[0].stops.reduce((a, b) => a + " -> " + b, "").slice(4),
      risk: this.props.routes[0].risk
    }

    let optional = this.props.routes.slice(1);
    for (let i = 0; i < optional.length; i++) {
      optional[i] = {
        stops: optional[i].stops.reduce((a, b) => a + " -> " + b, "").slice(4),
        risk: optional[i].risk
      }
    }

    const optionalRoutes = (
      optional.map(
        item => (
          <div className="row justify-content-center">
            <div className="col-sm" align="center">
              {item.stops}
            </div>
            <div className="col-sm" align="center">
              {item.risk}
            </div>
          </div>
        )
      )
    );

    return (
      <div className="card bg-muted" style={{ width: '90%', height: '100%', position: 'relative' }}>
        <div className="card-body row" style={{ fontSize: '18pt', border: 'none' }}>
          <div className="col-sm text-info" align="center">
            Stops
          </div>
          <div className="col-sm text-danger" align="center">
            Risk
          </div>
        </div>

        <div className="card-header text-success" style={{ fontSize: '18pt', border: 'none' }}>Best Route</div>

        <div className="card-body">
          <div className="row justify-content-center">
            <div className="col-sm" align="center">
              {bestRoute.stops}
            </div>
            <div className="col-sm" align="center">
              {bestRoute.risk}
            </div>
          </div>
        </div>

        <div className="card-header text-warning" style={{ fontSize: '18pt', border: 'none' }}>Optional Routes</div>

        <div className="card-body">
          {optionalRoutes}
        </div>
      </div>
    );
  }
}

export default Routes;
