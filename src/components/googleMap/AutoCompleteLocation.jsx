import React from "react";
import Autocomplete from "react-google-autocomplete";
import Geocode from "react-geocode";
import { connect } from "react-redux";
import {
  change_autoComplete_lng_lat,
  change_map_lng_lat,
} from "../../actions/homeActions";
import $ from "jquery";
Geocode.setApiKey(process.env.REACT_APP_GOOGLE_GEOCODE_KEY);
Geocode.enableDebug();
class AutoCompleteLocation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: "",
      city: "",
      area: "",
      state: "",
      displayAddress: "",
      mapPosition: {
        lat: this.props.map_lat,
        lng: this.props.map_lng,
      },
      markerPosition: {
        lat: this.props.map_lat,
        lng: this.props.map_lng,
      },
      // radius: 50,
      radius: 0,
      centerGps: null,
    };
    this.circleRef = React.createRef();
  }
  /**
   * Get the current address from the default map position and set those values in the state
   */
  componentDidMount() {
    console.log(this.state, "Auto Complete Location State componentDidMount");
    if (
      this.state.mapPosition.lat !== "" &&
      this.state.mapPosition.lat !== 0 &&
      this.state.mapPosition.lng !== "" &&
      this.state.mapPosition.lng !== 0
    ) {
      Geocode.fromLatLng(
        this.state.mapPosition.lat,
        this.state.mapPosition.lng
      ).then(
        // Geocode.fromAddress(this.state.address).then(
        (response) => {
          console.log(response,"re")
          const address = this.formatDisplayAddress(
            response.results[0].formatted_address
          ),
            addressArray = response.results[0].address_components,
            city = this.getCity(addressArray),
            area = this.getArea(addressArray),
            state = this.getState(addressArray);

          console.log({ address, city, area, state });
          this.setState({
            displayAddress: address,
            address: address ? address : "",
            area: area ? area : "",
            city: city ? city : "",
            state: state ? state : "",
          });
          this.props.setLocation(
            address ? address : "",
            this.state.mapPosition.lat,
            this.state.mapPosition.lng
          );
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }

  formatDisplayAddress = (address) => {
    if (!address) return "";
    let city = address.split(",").slice(-3, -1)[0];
    console.log(city.indexOf("+") > -1, "formatAddress");
    if (city.indexOf("+") > -1) {
      const splitCity = city.split(" ");
      city = splitCity.splice(1, splitCity.length - 1).join("");
    }
    let state = address.split(",").slice(-2, -1)[0].split(" ")[1];
    let formatedAddress = `${city}, ${state}`;
    return formatedAddress;
  };

  /**
   * Component should only update ( meaning re-render ), when the user selects the address, or drags the pin
   *
   * @param nextProps
   * @param nextState
   * @return {boolean}
   */
  shouldComponentUpdate(nextProps, nextState) {
    if (
      this.props.map_lat !== nextProps.map_lat ||
      this.props.map_lng !== nextProps.map_lng ||
      this.state.address !== nextState.address
      // (this.state.markerPosition.lat !== undefined && this.state.markerPosition.lat !== this.props.map_lat) ||
    ) {
      return true;
    }
    return false;
  }
  componentDidUpdate(prevProps, prevState) {
    if (
      (prevProps.map_lat !== this.props.map_lat &&
        this.props.map_lat !== undefined) ||
      (prevProps.map_lng !== this.props.map_lng &&
        this.props.map_lng !== undefined)
    ) {
      Geocode.fromLatLng(this.props.map_lat, this.props.map_lng).then(
        // Geocode.fromAddress(this.state.address).then(
        (response) => {
          console.log(response.results, "Address response.results");
          const address = this.formatDisplayAddress(
            response.results[0].formatted_address
          ),
            addressArray = response.results[0].address_components,
            city = this.getCity(addressArray),
            area = this.getArea(addressArray),
            state = this.getState(addressArray);

          console.log("Update city", city, area, state);
          $("#mapAutoSearch").val(address);
          this.setState({
            // displayAddress: (address) ? address != undefined && address !== null && address !== '' ? address.split(',').slice(-3, -1)[0] !== undefined && address.split(',').slice(-3, -1)[0] !== null ? address.split(',').slice(-3, -1)[0] : '' + ", " + address.split(',').slice(-2, -1)[0].split(' ')[1] !== undefined && address.split(',').slice(-2, -1)[0].split(' ')[1] !== null ? address.split(',').slice(-2, -1)[0].split(' ')[1] : '' : '' : '',
            displayAddress: address,
            address: address ? address : "",
            area: area ? area : "",
            city: city ? city : "",
            state: state ? state : "",
          });
          this.props.setLocation(
            address ? address : "",
            this.props.map_lat,
            this.props.map_lng
          );
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }

  /**
   * Get the city and set the city input value to the one selected
   *
   * @param addressArray
   * @return {string}
   */
  getCity = (addressArray) => {
    let city = "";
    if(addressArray?.length){
    for (let i = 0; i < addressArray?.length; i++) {
      if (
        addressArray[i].types[0] &&
        "administrative_area_level_2" === addressArray[i].types[0]
      ) {
        city = addressArray[i].long_name;
        return city;
      }
    }
  }else{
    return city;

  }
  };
  /**
   * Get the area and set the area input value to the one selected
   *
   * @param addressArray
   * @return {string}
   */
  getArea = (addressArray) => {
    let area = "";
    for (let i = 0; i < addressArray?.length; i++) {
      if (addressArray[i].types[0]) {
        for (let j = 0; j < addressArray[i].types.length; j++) {
          if (
            "sublocality_level_1" === addressArray[i].types[j] ||
            "locality" === addressArray[i].types[j]
          ) {
            area = addressArray[i].long_name;
            return area;
          }
        }
      }
    }
  };
  /**
   * Get the address and set the address input value to the one selected
   *
   * @param addressArray
   * @return {string}
   */
  getState = (addressArray) => {
    let state = "";
    for (let i = 0; i < addressArray?.length; i++) {
      for (let i = 0; i < addressArray?.length; i++) {
        if (
          addressArray[i].types[0] &&
          "administrative_area_level_1" === addressArray[i].types[0]
        ) {
          state = addressArray[i].long_name;
          return state;
        }
      }
    }
  };
  onPlaceSelected = (place) => {
    console.log(place,"place")
    if(place?.place_id){
    const address = place.formatted_address,
      addressArray = place.address_components,
      city = this.getCity(addressArray),
      area = this.getArea(addressArray),
      state = this.getState(addressArray),
      latValue = place?.geometry?.location?.lat(),
      lngValue = place?.geometry?.location?.lng();
    // Set these values in the state.
    this.setState({
      // displayAddress: (address) ? address !== undefined && address !== null && address !== '' ? address.split(',').slice(-3, -1)[0] + ", " + address.split(',').slice(-2, -1)[0].split(' ')[1] : '' : '',
      address: address ? address : "",
      area: area ? area : "",
      city: city ? city : "",
      state: state ? state : "",
      markerPosition: {
        lat: latValue,
        lng: lngValue,
      },
      mapPosition: {
        lat: latValue,
        lng: lngValue,
      },
    });
    const data = {
      lat: latValue,
      lng: lngValue,
    };

    this.props.change_autoComplete_lng_lat(data);
    this.props.change_map_lng_lat(data);
    this.props.setLocation(address ? address : "", latValue, lngValue);
    this.setState({
      ...this.state,
      showSearch: false,
    });
  }
  };

  render() {
    console.log(this.state, "Auto Select");
    return (
      <React.Fragment>
        <Autocomplete
          style={{
            // width: '100%',
            height: "40px",
            paddingLeft: "16px",
            marginTop: "2px",
            marginBottom: "100px",
          }}
          onPlaceSelected={this.onPlaceSelected}
          options={{
            // types: ['establishment'],
            types: ['geocode'],
            componentRestrictions: { country: ["ca"] },
          }}
          defaultValue={this.state.displayAddress}
          id="mapAutoSearch"
        />
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    map_lng: state.homeReducer.map_lng,
    map_lat: state.homeReducer.map_lat,
  };
};
export default connect(mapStateToProps, {
  change_autoComplete_lng_lat,
  change_map_lng_lat,
})(AutoCompleteLocation);
