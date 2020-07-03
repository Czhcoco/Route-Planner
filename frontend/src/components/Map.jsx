import React from "react"
import { compose } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker, Polyline } from "react-google-maps"

const myAPI = "AIzaSyBxc4-PLWx3dpX6OHaFY-2iZKl7QalbyhQ";
const API = myAPI;
const googleMapURL = "https://maps.googleapis.com/maps/api/js?key=" + API + "&language=cn&region=CN";

class Map extends React.PureComponent {
  getInitialCenter() {
    let lat = 0, lng = 0;
    console.log(this.props.positions.length);
    for (let index = 0; index < this.props.positions.length; index++) {
      lat += this.props.positions[index].lat;
      lng += this.props.positions[index].lng;
    }
    lat /= this.props.positions.length;
    lng /= this.props.positions.length;
    console.log(lat);

    return ({
      lat: parseFloat(lat),
      lng: parseFloat(lng)
    })
  }

  mapBoundHandler(map) {
    let bounds = new window.google.maps.LatLngBounds();
    for (let index = 0; index < this.props.positions.length; index++) {
      bounds.extend(this.props.positions[index])
    }
    map.fitBounds(bounds);
  }

  render() {

    const MyMap = compose(
      withScriptjs,
      withGoogleMap
    )(props =>
      <GoogleMap
        onLoad={this.mapBoundHandler}
        ref={map => map && this.mapBoundHandler(map)}
        className="map"
        defaultZoom={8}
        defaultCenter={this.getInitialCenter()}
      >
        {this.props.positions.map(
          (obj, index) => (<Marker position={{ lat: obj.lat, lng: obj.lng }} key={index} />)
        )}
        <Polyline
          path={this.props.positions}
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
          height: '98%',
          positions: 'relative',
          width: '98%',
          borderRadius: '10pt'
        }}
      />}
    />;
  }
}

export default Map;
