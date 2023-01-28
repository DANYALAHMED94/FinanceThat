import React, { Component } from "react";
import DealerActiveListing from "../../../component/dms/Listings/DealerActiveListing";
import {
  get_listing,
  single_check_listing,
  toggle_all_check_listing,
  remove_all_state_listing,
  soft_delete_single_listing,
  archive_listing,
  soft_delete_listings,
  get_listing_pages,
} from "../../../../actions/admin/dmsListingActions";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";

class DmsListing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: "dealer",
      sort_by: "newest_first",
      dealer_id:
        this.props.match.params.dealer_id !== undefined
          ? this.props.match.params.dealer_id
          : "",
      // oldest_first
    };
  }
  componentDidMount() {
    const data = {
      a_type: this.state.tab,
      sort_by: this.state.sort_by,
      p_size: 20,
      user_id: this.state.dealer_id,
    };
    this.props.get_listing(data);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.tab !== this.state.tab && this.state.tab !== undefined) {
      const data = {
        a_type: this.state.tab,
        sort_by: this.state.sort_by,
        p_size: 20,
        user_id: this.state.dealer_id,
      };
      this.props.get_listing(data);
    }
  }

  render() {
    const { tab } = this.state;
    return (
      <React.Fragment>
        <Helmet>
          <title>Admin</title>
          <meta name="description" content="" />
        </Helmet>
        <div className="Pending-ListHead">
          <h1>Dealer Listings</h1>
        </div>
        <div className="Admin-ActiveList-Container">
          <DealerActiveListing
            {...this.props}
            sort_by={this.state.sort_by}
            dealer_id={this.state.dealer_id}
          />
        </div>
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    listing_detail:
      state.adminReducer.adminAccounts.dmsListingReducer.listing_detail,
    loading: state.adminReducer.adminAccounts.dmsListingReducer.loading,
    checkedAllDealerListing:
      state.adminReducer.adminAccounts.dmsListingReducer
        .checkedAllDealerListing,
    loading_listing_delete:
      state.adminReducer.adminAccounts.dmsListingReducer.loading_listing_delete,
    loading_listing_delete_single:
      state.adminReducer.adminAccounts.dmsListingReducer
        .loading_listing_delete_single,
    delete_listing_id:
      state.adminReducer.adminAccounts.dmsListingReducer.delete_listing_id,
    total_count: state.adminReducer.adminAccounts.dmsListingReducer.total_count,
    pages_urls: state.adminReducer.adminAccounts.dmsListingReducer.total_pages,
  };
};
export default connect(mapStateToProps, {
  get_listing,
  single_check_listing,
  toggle_all_check_listing,
  remove_all_state_listing,
  soft_delete_single_listing,
  archive_listing,
  soft_delete_listings,
  get_listing_pages,
})(DmsListing);
