import React, { Component } from "react";
import { Map, GoogleApiWrapper, Polyline } from 'google-maps-react';

class MapContainer extends Component {
  render() {
    var triangleCoords = [
      { lat: 25.774, lng: -80.190 },
      { lat: 18.466, lng: -66.118 },
      { lat: 32.321, lng: -64.757 },
      { lat: 25.774, lng: -80.190 }
    ];
    return (
      <Map google={this.props.google}
        style={{ width: '90%', height: '100%', position: 'relative' }}
        className={'map'}
        zoom={14}>
        <Polyline
          paths={triangleCoords}
          strokeColor="#0000FF"
          strokeOpacity={1}
          strokeWeight={2} />
      </Map>
    )
  }
}

export default GoogleApiWrapper({
  // apiKey: 'AIzaSyBxc4-PLWx3dpX6OHaFY-2iZKl7QalbyhQ'
})(MapContainer);
