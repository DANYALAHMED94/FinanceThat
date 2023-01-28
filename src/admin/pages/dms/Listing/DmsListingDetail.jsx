import React, { Component } from "react";
import ActiveListingReviews from "../../../component/dms/Listings/ActiveListingReviews";
import {
  get_listing_detail,
  remove_detail_edit,
  get_vehicle_type,
  get_vehicle_make,
  get_vehicle_model,
  get_vehicle_body_type,
  get_vehicle_fuel_type,
  get_vehicle_drive_train,
  get_vehicle_feature,
  toggle_vehicle_features,
  get_sub_type_vehicle_make,
  remove_all,
  get_vehicle_trims,
  update_listing_vehicle_detail,
  update_listing_vehicle_overview,
  update_listing_vehicle_location,
  update_listing_vehicle_features,
  update_listing_vehicle_description,
  delete_listing_image,
  add_listing_image,
} from "../../../../actions/admin/dmsListingActions";
import {
  update_private_account,
  update_dealer_account,
} from "../../../../actions/admin/accountActions";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";

class DmsListingDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    const id =
      this.props.match.params.listing_id !== undefined
        ? this.props.match.params.listing_id
        : "";
    this.props.get_listing_detail(id);
    this.props.get_vehicle_type();
    this.props.get_vehicle_drive_train();
    this.props.get_vehicle_fuel_type();
  }
  componentWillUnmount() {
    this.props.remove_detail_edit();
    this.props.remove_all();
  }
  render() {
    return (
      <React.Fragment>
        <Helmet>
          <title>Admin</title>
          <meta name="description" content="" />
        </Helmet>
        <ActiveListingReviews {...this.props} />
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    loading_listing_detail:
      state.adminReducer.adminAccounts.dmsListingReducer.loading_listing_detail,
    single_listing_detail:
      state.adminReducer.adminAccounts.dmsListingReducer.single_listing_detail,
    loading_update_listing_detail:
      state.adminReducer.adminAccounts.dmsListingReducer
        .loading_update_listing_detail,
    loading_update_listing_vehicle_overview:
      state.adminReducer.adminAccounts.dmsListingReducer
        .loading_update_listing_vehicle_overview,
    loading_update_listing_vehicle_location:
      state.adminReducer.adminAccounts.dmsListingReducer
        .loading_update_listing_vehicle_location,
    loading_update_listing_vehicle_features:
      state.adminReducer.adminAccounts.dmsListingReducer
        .loading_update_listing_vehicle_features,
    loading_update_listing_vehicle_description:
      state.adminReducer.adminAccounts.dmsListingReducer
        .loading_update_listing_vehicle_description,
    type_of_vehicles: state.adPostReducers.addPostReducer.type_of_vehicle,
    vehicle_makes: state.adPostReducers.addPostReducer.vehicle_make,
    vehicle_models: state.adPostReducers.addPostReducer.vehicle_model,
    vehicle_trims: state.adPostReducers.addPostReducer.vehicle_trims,
    vehicle_body: state.adPostReducers.addPostReducer.vehicle_body,
    vehicle_drive_train:
      state.adPostReducers.addPostReducer.vehicle_drive_train,
    vehicle_fuel_type: state.adPostReducers.addPostReducer.vehicle_fuel_type,
    vehicle_features: state.adPostReducers.addPostReducer.vehicle_features,
    user: state.authReducer.authentication.user,
    isLoading: state.adPostReducers.addPostReducer.isLoading,
    removeLoaderMake: state.adPostReducers.addPostReducer.removeLoaderMake,
    removeLoaderModel: state.adPostReducers.addPostReducer.removeLoaderModel,
    removeLoaderType: state.adPostReducers.addPostReducer.removeLoaderType,
    removeLoaderTrims: state.adPostReducers.addPostReducer.removeLoaderTrims,
    update_account:
      state.adminReducer.adminAccounts.pendingAccountReducer.update_account,
    update_listing_images:
      state.adminReducer.adminAccounts.dmsListingReducer.update_listing_images,
  };
};
export default connect(mapStateToProps, {
  get_listing_detail,
  remove_detail_edit,
  get_vehicle_type,
  get_vehicle_make,
  get_vehicle_model,
  get_vehicle_body_type,
  get_vehicle_fuel_type,
  get_vehicle_drive_train,
  get_vehicle_feature,
  toggle_vehicle_features,
  get_sub_type_vehicle_make,
  remove_all,
  get_vehicle_trims,
  update_private_account,
  update_dealer_account,
  update_listing_vehicle_detail,
  update_listing_vehicle_overview,
  update_listing_vehicle_location,
  update_listing_vehicle_features,
  update_listing_vehicle_description,
  delete_listing_image,
  add_listing_image,
})(DmsListingDetail);
