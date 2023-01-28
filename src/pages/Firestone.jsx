import React, { Component } from "react";
import VehicleBudget from "../components/buyer/vehicleBudget";
import WayitShouldBe from "../components/buyer/wayitShouldBe";
import FeatureList from "../components/buyer/featureList";
import VehicleArea from "../components/buyer/vehicleArea";
import SellVehicle from "../components/buyer/sellVehicle";
// import HomeModel from "../components/buyer/HomeModel";
import ClientTestimonial from "../components/buyer/ClientTestimonials";
import HomeBanner from "../components/buyer/HomeMainFilter/HomeBanner";
import DownloadApp from "../components/buyer/downloadApp";
import {
  saved_ad_post,
  un_saved_ad_post,
  get_vehicle_type,
  saved_ad_post_vehicle_area,
  un_saved_ad_post_vehicle_area,
  change_autoComplete_lng_lat,
  change_map_lng_lat,
} from "../actions/homeActions";
import { get_list_filter_values } from "../actions/listPostActions";
import { get_chat_user, change_chat_user } from "../actions/chatActions";
import { connect } from "react-redux";
import GoogleMapModel from "../components/googleMap/GoogleMapModel";
import { Helmet } from "react-helmet";
import simpleAxios from "../_helpers/axios";
import GoogleReviews from "../components/buyer/googleReview/googleReviews";
import Footer from "../hoc/layout/footer/Footer";
import FirestonePage from "./Firestone/index";

let years = [];
let fromYear = [];

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id:
        this.props.user !== null && this.props.user !== undefined
          ? this.props.user.user_id
          : "",

      lng: localStorage.getItem("mapLng") ? localStorage.getItem("mapLng") : "",
      lat: localStorage.getItem("mapLat") ? localStorage.getItem("mapLat") : "",
      location: localStorage.getItem("mapLocation")
        ? localStorage.getItem("mapLocation")
        : "",
      distance: localStorage.getItem("mapDistance")
        ? localStorage.getItem("mapDistance")
        : 1000,
      // distance: 0,
      showDefaultModel: localStorage.getItem("showDefdaultModel")
        ? localStorage.getItem("showDefdaultModel")
        : true,
    };
    this.props.get_vehicle_type();

    let currentYear = new Date().getFullYear() + 1;
    let earliestYear = 1900;
    let countYears = 1900;
    years = [];
    fromYear = [];
    while (currentYear >= earliestYear) {
      years.push({ label: `${currentYear}`, value: currentYear });
      fromYear.push({ label: `${countYears}`, value: countYears });
      currentYear -= 1;
      countYears += 1;
    }
  }

  componentDidMount() {
    const data = {
      lat: localStorage.getItem("mapLat") ? localStorage.getItem("mapLat") : 0,
      lng: localStorage.getItem("mapLng") ? localStorage.getItem("mapLng") : 0,
    };
    this.props.change_autoComplete_lng_lat(data);
    this.props.change_map_lng_lat(data);
    if (this.state.user_id) {
      this.props.get_chat_user(this.state.user_id);
      this.props.change_chat_user(this.state.user_id);
    }
    if (!localStorage.getItem("showDefdaultModel")) {
      window.$("#homeDefaultModel").modal("show");
    }
  }

  setLocation = (location, lat, log) => {
    localStorage.setItem("mapLocation", location);
    localStorage.setItem("mapLat", lat);
    localStorage.setItem("mapLng", log);
    this.setState({
      location: location,
      lat: lat,
      lng: log,
    });
  };

  setDistance = (distance) => {
    localStorage.setItem("mapDistance", distance);
    this.setState({
      ...this.state,
      distance: distance,
    });
  };
  render() {
    return (
      <React.Fragment>
        <Helmet>
          <title>
            Finance That – #1 Marketplace to buy and sell Automotive and
            Powersports vehicles with Online Instant Financing.
          </title>
          <meta
            name="description"
            content="Finance That is a marketplace for all your powersports and automotive buying, selling and financing needs under the same roof."
          />
        </Helmet>
      <FirestonePage />    
      <Footer />

      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.authReducer.authentication.user,
    user_id: state.authReducer.authentication.user.user_id,
    lat: state.homeReducer.map_lat,
    lng: state.homeReducer.map_lng,
  };
};
export default connect(mapStateToProps, {
  get_chat_user,
  change_chat_user,
  get_vehicle_type,
  get_list_filter_values,
  saved_ad_post,
  un_saved_ad_post,
  saved_ad_post_vehicle_area,
  un_saved_ad_post_vehicle_area,
  change_autoComplete_lng_lat,
  change_map_lng_lat,
})(Home);