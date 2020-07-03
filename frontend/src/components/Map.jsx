import React from "react"
import { compose } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker, Polyline } from "react-google-maps"

const myAPI = "AIzaSyBxc4-PLWx3dpX6OHaFY-2iZKl7QalbyhQ";
const reactAPI = "AIzaSyAyesbQMyKVVbBgKVi2g6VX7mop2z96jBo";
const API = reactAPI;
const googleMapURL = "https://maps.googleapis.com/maps/api/js?key=" + API + "&language=cn&region=CN";

class Map extends React.PureComponent {
  constructor(props) {
    super(props);

    console.log(this.props.positions);
    console.log(this.props.positions[0]);
    console.log(this.props.positions.length);
    console.log(this.props.positions.map(item => ({ lat: item.lat, lng: item.lng })));
  }

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
        defaultZoom={5}
        defaultCenter={this.getInitialCenter()}
      >
        {this.props.positions.map(
          obj => (<Marker position={{ lat: obj.lat, lng: obj.lng }} />)
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
