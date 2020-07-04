import React from "react"
import Alert from "@material-ui/lab/Alert";
import { compose } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker, Polyline } from "react-google-maps"

const myAPI = "AIzaSyBxc4-PLWx3dpX6OHaFY-2iZKl7QalbyhQ";
const API = myAPI;
const googleMapURL = "https://maps.googleapis.com/maps/api/js?key=" + API + "&language=cn&region=CN";

class Map extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      errorInfo: null
    };
    console.log(this.props.positions);
  }

  componentDidCatch(error, errorInfo) {
    // Catch errors in any components below and re-render with error message
    this.setState({
      error: error,
      errorInfo: errorInfo
    })
    // You can also log error messages to an error reporting service here
  }

  getInitialCenter() {
    let lat = 0, lng = 0;

    if (this.props.positions.length === 0 || this.props.positions[0] == undefined) {
      return ({
        lat: parseFloat(lat),
        lng: parseFloat(lng)
      })
    }

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
    console.log("map rendering")

    if (this.state.errorInfo
      || this.props.positions.length === 0
      || this.props.positions[0] == undefined) {
      return (
        <Alert variant="filled" severity="error" className="m-2">
          抱歉！加载Google地图失败！
        </Alert>
      );
    }

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
          (obj, index) => obj && (<Marker position={{ lat: obj.lat, lng: obj.lng }} key={index} />)
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
      loadingElement={<div style={{ height: '100%' }
      } />}
      containerElement={< div style={{ height: '100%' }} />}
      mapElement={< div
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
