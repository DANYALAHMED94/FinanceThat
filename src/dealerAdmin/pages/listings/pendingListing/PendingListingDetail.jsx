import React, { Component } from 'react'
import PendingListingReviews from '../../../component/listings/pendingListings/PendingListingReviews'
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
    approved_listing,
    decline_listing,
    delete_listing_image,
    add_listing_image,
    update_make_model
} from '../../../../actions/dealer/dealerListingActions'
import { update_private_account, update_dealer_account } from '../../../../actions/admin/accountActions'
import SimpleReactValidator from 'simple-react-validator';
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet';

class PendingListingDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
        const id = this.props.match.params.id !== undefined ? this.props.match.params.id : ''
        this.props.get_listing_detail(id)
        this.props.get_vehicle_type()
        this.props.get_vehicle_drive_train()
        this.props.get_vehicle_fuel_type()
        this.validator = new SimpleReactValidator({ autoForceUpdate: this });

    }
    componentWillUnmount() {
        this.props.remove_detail_edit()
        this.props.remove_all()
    }
    render() {
        return (
            <React.Fragment>
                <Helmet>
                    <title>Admin</title>
                    <meta name="description" content="" />
                </Helmet>
                <PendingListingReviews {...this.props} validator={this.validator} />
            </React.Fragment>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        loading_listing_detail: state.dealerAdminReducer.dealerListingReducer.loading_listing_detail,
        single_listing_detail: state.dealerAdminReducer.dealerListingReducer.single_listing_detail,
        loading_update_listing_detail: state.dealerAdminReducer.dealerListingReducer.loading_update_listing_detail,
        loading_update_listing_vehicle_overview: state.dealerAdminReducer.dealerListingReducer.loading_update_listing_vehicle_overview,
        loading_update_listing_vehicle_location: state.dealerAdminReducer.dealerListingReducer.loading_update_listing_vehicle_location,
        loading_update_listing_vehicle_features: state.dealerAdminReducer.dealerListingReducer.loading_update_listing_vehicle_features,
        loading_update_listing_vehicle_description: state.dealerAdminReducer.dealerListingReducer.loading_update_listing_vehicle_description,
        type_of_vehicles: state.adPostReducers.addPostReducer.type_of_vehicle,
        vehicle_makes: state.adPostReducers.addPostReducer.vehicle_make,
        vehicle_models: state.adPostReducers.addPostReducer.vehicle_model,
        vehicle_trims: state.adPostReducers.addPostReducer.vehicle_trims,
        vehicle_body: state.adPostReducers.addPostReducer.vehicle_body,
        vehicle_drive_train: state.adPostReducers.addPostReducer.vehicle_drive_train,
        vehicle_fuel_type: state.adPostReducers.addPostReducer.vehicle_fuel_type,
        vehicle_features: state.adPostReducers.addPostReducer.vehicle_features,
        user: state.authReducer.authentication.user,
        isLoading: state.adPostReducers.addPostReducer.isLoading,
        removeLoaderMake: state.adPostReducers.addPostReducer.removeLoaderMake,
        removeLoaderModel: state.adPostReducers.addPostReducer.removeLoaderModel,
        removeLoaderType: state.adPostReducers.addPostReducer.removeLoaderType,
        removeLoaderTrims: state.adPostReducers.addPostReducer.removeLoaderTrims,
        update_account: state.adminReducer.adminAccounts.pendingAccountReducer.update_account,
        update_listing_images: state.dealerAdminReducer.dealerListingReducer.update_listing_images,
        loading_listing_make_model: state.dealerAdminReducer.dealerListingReducer.loading_listing_make_model,
        success_listing_make_model: state.dealerAdminReducer.dealerListingReducer.success_listing_make_model,
        loading_listing_decline: state.dealerAdminReducer.dealerListingReducer.loading_listing_decline,
        loading_listing_approved: state.dealerAdminReducer.dealerListingReducer.loading_listing_approved,

    }
}
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
    update_private_account, update_dealer_account,
    update_listing_vehicle_detail,
    update_listing_vehicle_overview,
    update_listing_vehicle_location,
    update_listing_vehicle_features,
    update_listing_vehicle_description, approved_listing,
    decline_listing,
    delete_listing_image,
    add_listing_image,
    update_make_model
})(PendingListingDetail)
