import React, { Component } from "react";

class Routes extends Component {
  render() {
    const bestRoute = {
      routes: this.props.routes[0].stops.reduce((a, b) => a + " - " + b, "").slice(3),
      risk: this.props.routes[0].risk
    }

    let optional = this.props.routes.slice(1);
    for (let i = 0; i < optional.length; i++) {
      optional[i] = {
        routes: optional[i].stops.reduce((a, b) => a + " - " + b, "").slice(3),
        risk: optional[i].risk
      }
    }

    const optionalRoutes = (
      optional.map(
        item => (
          <div className="row justify-content-center">
            <div className="col-sm" align="center">
              {item.routes}
            </div>
            <div className="col-sm" align="center">
              {item.risk}
            </div>
          </div>
        )
      )
    );

    return (
      <div className="card bg-muted" style={{ width: '98%', height: '100%', position: 'relative', borderRadius: '10pt' }}>
        <div className="card-body row" style={{ fontSize: '18pt', border: 'none' }}>
          <div className="col-sm" align="center">
            途径
            <svg width="1em" height="1em" viewBox="0 0 12 20" className="bi bi-geo-alt" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
            </svg>
          </div>
          <div className="col-sm" align="center">
            风险系数
            <svg width="1em" height="1em" viewBox="0 0 12 20" className="bi bi-exclamation-circle" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
              <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z" />
            </svg>
          </div>
        </div>

        <div className="card-header text-info" style={{ fontSize: '18pt', border: 'none' }} align="center">
          最佳路线
          <svg width="1em" height="1em" viewBox="0 0 12 20" className="bi bi-hand-thumbs-up" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M6.956 1.745C7.021.81 7.908.087 8.864.325l.261.066c.463.116.874.456 1.012.965.22.816.533 2.511.062 4.51a9.84 9.84 0 0 1 .443-.051c.713-.065 1.669-.072 2.516.21.518.173.994.681 1.2 1.273.184.532.16 1.162-.234 1.733.058.119.103.242.138.363.077.27.113.567.113.856 0 .289-.036.586-.113.856-.039.135-.09.273-.16.404.169.387.107.819-.003 1.148a3.163 3.163 0 0 1-.488.901c.054.152.076.312.076.465 0 .305-.089.625-.253.912C13.1 15.522 12.437 16 11.5 16v-1c.563 0 .901-.272 1.066-.56a.865.865 0 0 0 .121-.416c0-.12-.035-.165-.04-.17l-.354-.354.353-.354c.202-.201.407-.511.505-.804.104-.312.043-.441-.005-.488l-.353-.354.353-.354c.043-.042.105-.14.154-.315.048-.167.075-.37.075-.581 0-.211-.027-.414-.075-.581-.05-.174-.111-.273-.154-.315L12.793 9l.353-.354c.353-.352.373-.713.267-1.02-.122-.35-.396-.593-.571-.652-.653-.217-1.447-.224-2.11-.164a8.907 8.907 0 0 0-1.094.171l-.014.003-.003.001a.5.5 0 0 1-.595-.643 8.34 8.34 0 0 0 .145-4.726c-.03-.111-.128-.215-.288-.255l-.262-.065c-.306-.077-.642.156-.667.518-.075 1.082-.239 2.15-.482 2.85-.174.502-.603 1.268-1.238 1.977-.637.712-1.519 1.41-2.614 1.708-.394.108-.62.396-.62.65v4.002c0 .26.22.515.553.55 1.293.137 1.936.53 2.491.868l.04.025c.27.164.495.296.776.393.277.095.63.163 1.14.163h3.5v1H8c-.605 0-1.07-.081-1.466-.218a4.82 4.82 0 0 1-.97-.484l-.048-.03c-.504-.307-.999-.609-2.068-.722C2.682 14.464 2 13.846 2 13V9c0-.85.685-1.432 1.357-1.615.849-.232 1.574-.787 2.132-1.41.56-.627.914-1.28 1.039-1.639.199-.575.356-1.539.428-2.59z" />
          </svg>
        </div>

        <div className="card-body">
          <div className="row justify-content-center">
            <div className="col-sm" align="center">
              {bestRoute.routes}
            </div>
            <div className="col-sm" align="center">
              {bestRoute.risk}
            </div>
          </div>
        </div>

        <div className="card-header text-info" style={{ fontSize: '18pt', border: 'none' }} align="center">
          其他路线
          <svg width="1em" height="1em" viewBox="0 0 12 20" className="bi bi-sort-down-alt" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M3 3a.5.5 0 0 1 .5.5v10a.5.5 0 0 1-1 0v-10A.5.5 0 0 1 3 3z" />
            <path fillRule="evenodd" d="M5.354 11.146a.5.5 0 0 1 0 .708l-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 0 1 .708-.708L3 12.793l1.646-1.647a.5.5 0 0 1 .708 0zM7 6.5a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 0-1h-3a.5.5 0 0 0-.5.5zm0 3a.5.5 0 0 0 .5.5h5a.5.5 0 0 0 0-1h-5a.5.5 0 0 0-.5.5zm0 3a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 0-1h-7a.5.5 0 0 0-.5.5zm0-9a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0-.5.5z" />
          </svg>
        </div>

        <div className="card-body">
          {optionalRoutes}
        </div>
      </div>
    );
  }
}

export default Routes;
