import React from "react";
import Alert from "@material-ui/lab/Alert";
import {
  GoogleMap,
  LoadScript,
  Marker,
  Polyline,
} from "@react-google-maps/api";

const myAPI = "AIzaSyBxc4-PLWx3dpX6OHaFY-2iZKl7QalbyhQ";
const API = myAPI;

class Map extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      errorInfo: null,
    };
  }

  componentDidCatch(error, errorInfo) {
    // Catch errors in any components below and re-render with error message
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
    // You can also log error messages to an error reporting service here
  }

  render() {
    if (
      this.state.errorInfo ||
      this.props.positions.length === 0 ||
      this.props.positions[0] === undefined
    ) {
      return (
        <Alert variant="filled" severity="error"
          className="p-3 m-2"
          style={{ borderRadius: '10pt' }}>
          抱歉！加载Google地图失败！
        </Alert>
      );
    }

    const containerStyle = {
      height: "400px",
      width: "100%",
      positions: "relative",
      borderRadius: "10pt",
    };

    const getInitialCenter = () => {
      let lat = 0,
        lng = 0;

      if (
        this.props.positions ||
        this.props.positions.length === 0 ||
        this.props.positions[0] === undefined
      ) {
        return {
          lat: parseFloat(lat),
          lng: parseFloat(lng),
        };
      }

      for (let index = 0; index < this.props.positions.length; index++) {
        lat += this.props.positions[index].lat;
        lng += this.props.positions[index].lng;
      }
      lat /= this.props.positions.length;
      lng /= this.props.positions.length;

      return {
        lat: parseFloat(lat),
        lng: parseFloat(lng),
      };
    };

    const onLoad = (map) => {
      let bounds = new window.google.maps.LatLngBounds();
      for (let index = 0; index < this.props.positions.length; index++) {
        bounds.extend(this.props.positions[index]);
      }
      map.fitBounds(bounds);
    };

    return (
      <LoadScript googleMapsApiKey={API} language="cn" region="cn">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={getInitialCenter()}
          zoom={10}
          onLoad={(map) => map && onLoad(map)}
        >
          {this.props.positions.map(
            (obj, index) =>
              obj && (
                <Marker position={{ lat: obj.lat, lng: obj.lng }} key={index} />
              )
          )}
          <Polyline
            path={this.props.positions}
            strokeColor="#00CCFF"
            strokeOpacity={0.8}
            strokeWeight={2}
          />
        </GoogleMap>
      </LoadScript>
    );
  }
}

export default Map;
