import React, { Component } from 'react'
import Map from './Map'
import { connect } from 'react-redux'
import { change_map_lng_lat, change_autoComplete_lng_lat } from '../../actions/homeActions'
var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};
function success(pos) {
  var crd = pos.coords;
  that.setState({
    ...that.state,
    lng: crd.longitude,
    lat: crd.latitude,
    loading: false
  })
  const data = {
    lng: crd.longitude,
    lat: crd.latitude
  }
  that.props.change_map_lng_lat(data)
  that.props.change_autoComplete_lng_lat(data)
  console.log("Your current position is:");
  console.log(`Latitude : ${crd.latitude}`);
  console.log(`Longitude: ${crd.longitude}`);
  console.log(`More or less ${crd.accuracy} meters.`);
}

function errors(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}
var that
class MapComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: 0,
      lng: 0,
      loading: true
    }
    that = this
  }
  componentDidMount() {
    if (this.props.latitude === '' || this.props.longitude === '') {
      // if (navigator.geolocation && navigator.permissions && navigator.permissions.query) {
      if (typeof navigator.permissions !== 'undefined' && typeof navigator.permissions !== null && typeof navigator.permissions.query !== 'undefined' && typeof navigator.permissions.query !== 'null' && typeof navigator.geolocation !== 'undefined' && typeof navigator.geolocation !== 'null') {
        navigator.permissions
          .query({ name: "geolocation" })
          .then(function (result) {
            if (result.state === "granted") {
              console.log(result.state);
              //If granted then you can directly call your function here
              navigator.geolocation.getCurrentPosition(success);
            } else if (result.state === "prompt") {
              navigator.geolocation.getCurrentPosition(success, errors, options);
            } else if (result.state === "denied") {
              //If denied then you have to show instructions to enable location
            }
            result.onchange = function () {
              console.log(result.state);
            };
          });
        this.setState({
          ...that.state,
          loading: false
        })
      } else {
        this.setState({
          ...that.state,
          loading: false
        })
        // alert("Sorry Not available!");
      }
    } else {
      this.setState({
        ...that.state,
        loading: false
      })
    }
  }
  get_default_location = () => {
    if (typeof navigator.permissions !== 'undefined' && typeof navigator.permissions !== null && typeof navigator.permissions.query !== 'undefined' && typeof navigator.permissions.query !== 'null' && typeof navigator.geolocation !== 'undefined' && typeof navigator.geolocation !== 'null') {
      // if (typeof navigator.permissions.query !== 'undefined' && typeof navigator.permissions.query !== 'null' && typeof navigator.geolocation !== 'undefined' && typeof navigator.geolocation !== 'null') {
      navigator.permissions
        .query({ name: "geolocation" })
        .then(function (result) {
          if (result.state === "granted") {
            console.log(result.state);
            //If granted then you can directly call your function here
            navigator.geolocation.getCurrentPosition(success);
          } else if (result.state === "prompt") {
            navigator.geolocation.getCurrentPosition(success, errors, options);
          } else if (result.state === "denied") {
            //If denied then you have to show instructions to enable location
          }
          result.onchange = function () {
            console.log(result.state);
          };
        });
    } else {
      alert("Sorry Not available!");
    }
  }
  render() {
    if (this.state.loading) {
      return null;
    }
    return <Map
      google={window.google}
      // center={{ lat: this.state.lat, lng: this.state.lng }}
      height='570px'
      zoom={15}
      {...this.props}
      get_default_location={this.get_default_location}
    />;

  }
}

export default connect(null, { change_map_lng_lat, change_autoComplete_lng_lat })(MapComp)
