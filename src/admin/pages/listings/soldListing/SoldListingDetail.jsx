import React, { Component } from 'react'
import SoldListingReviews from '../../../component/listings/soldListings/SoldListingReviews'
import {
    get_listing_detail,
    remove_detail_edit
} from '../../../../actions/admin/listingActions'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet';

class SoldListingDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
        const id = this.props.match.params.id !== undefined ? this.props.match.params.id : ''
        this.props.get_listing_detail(id)
    }
    componentWillUnmount() {
        this.props.remove_detail_edit()
    }
    render() {
        return (
            <React.Fragment>
                <Helmet>
                    <title>Admin</title>
                    <meta name="description" content="" />
                </Helmet>
                <SoldListingReviews {...this.props} />
            </React.Fragment>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        loading_listing_detail: state.adminReducer.adminAccounts.listingReducer.loading_listing_detail,
        single_listing_detail: state.adminReducer.adminAccounts.listingReducer.single_listing_detail,
    }
}
export default connect(mapStateToProps, {
    get_listing_detail,
    remove_detail_edit
})(SoldListingDetail)