import React from "react"
import { withScriptjs, withGoogleMap, GoogleMap, Marker, Polyline } from "react-google-maps"

class Map extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      positions: [
        { lat: 60, lng: -100 },
        { lat: 20, lng: -150 },
        { lat: -60, lng: 10 }
      ]
    }
    this.mapBoundHandler = this.mapBoundHandler.bind(this);
  }

  getInitialCenter() {
    let lat = 0, lng = 0;
    for (let index = 0; index < this.state.positions.length; index++) {
      lat += this.state.positions[index].lat;
      lng += this.state.positions[index].lng;
    }
    lat /= this.state.positions.length;
    lng /= this.state.positions.length;

    return ({
      lat: lat,
      lng: lng
    })
  }

  mapBoundHandler(map) {
    let bounds = new window.google.maps.LatLngBounds();
    for (let index = 0; index < this.state.positions.length; index++) {
      bounds.extend(this.state.positions[index])
    }
    map.fitBounds(bounds);
  }

  render() {
    const { compose } = require("recompose");

    // const myAPI = "AIzaSyBxc4-PLWx3dpX6OHaFY-2iZKl7QalbyhQ";
    const reactAPI = "AIzaSyAyesbQMyKVVbBgKVi2g6VX7mop2z96jBo";
    const googleMapURL = "https://maps.googleapis.com/maps/api/js?key=" + reactAPI + "&language=cn&region=CN";

    const MyMap = compose(
      withScriptjs,
      withGoogleMap
    )(props =>
      <GoogleMap
        onLoad={this.mapBoundHandler}
        ref={map => map && this.mapBoundHandler(map)}
        className="map"
        defaultZoom={5}
        defaultCenter={this.getInitialCenter()}
      >
        {this.state.positions.map(
          ({ lat, lng }) => {
            return <Marker position={{ lat: lat, lng: lng }} />;
          }
        )}
        <Polyline
          path={this.state.positions}
          strokeColor="#00CCFF"
          strokeOpacity={0.8}
          strokeWeight={2}
        />
      </GoogleMap>
    );

    return <MyMap
      googleMapURL={googleMapURL}
      loadingElement={<div style={{ height: '100%' }} />}
      containerElement={<div style={{ height: '100%' }} />}
      mapElement={<div
        style={{
          height: '100%',
          positions: 'relative',
          width: '98%',
          borderRadius: '10pt'
        }}
      />}
    />;
  }
}

export default Map;
