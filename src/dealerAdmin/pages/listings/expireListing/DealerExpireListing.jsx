import React, { Component } from "react";
import DealerExpireListingTable from "../../../component/listings/expireListings/DealerExpireListing";
import {
  get_listing,
  single_check_listing,
  toggle_all_check_listing,
  remove_all_state_listing,
  soft_delete_single_listing,
  archive_listing,
  soft_delete_listings,
} from "../../../../actions/dealer/dealerListingActions";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";

class DealerExpireListing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: "dealer",
      sort_by: "newest_first",
      // oldest_first
    };
  }
  componentDidMount() {
    const data = {
      a_type: this.state.tab,
      a_status: "expired",
      sort_by: this.state.sort_by,
      // oldest_first
      p_size: 20,
    };
    if(localStorage.getItem("staff_dealer")){
      data.dealer_id = localStorage.getItem("staff_dealer")
    }
    this.props.get_listing(data);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.tab !== this.state.tab && this.state.tab !== undefined) {
      const data = {
        a_type: this.state.tab,
        a_status: "expired",
        sort_by: this.state.sort_by,
        // oldest_first
        p_size: 20,
      };
      if(localStorage.getItem("staff_dealer")){
        data.dealer_id = localStorage.getItem("staff_dealer")
      }
      this.props.get_listing(data);
    }
  }

  render() {
    const { tab } = this.state;
    return (
      <React.Fragment>
        <Helmet>
          <title>Dealer Admin</title>
          <meta name="description" content="" />
        </Helmet>
        <div className="Pending-ListHead">
          <h1>Expire Listings</h1>
        </div>
        <div className="Admin-ActiveList-Container">
          {/* <ul className="nav nav-tabs TableTab" id="myTab" role="tablist">
            <li
              className="nav-item"
              onClick={() => this.setState({ ...this.state, tab: "dealer" })}
            >
              <a
                className={tab === "dealer" ? "active" : ""}
                id="dealer-tab"
                href="#dealer"
                data-toggle="tab"
                role="tab"
                aria-controls="dealer"
                aria-selected="false"
              >
                Dealers
              </a>
            </li>
          </ul> */}

          <div className="tab-content" id="myTabContent">
            <div
              className={
                tab === "dealer"
                  ? "tab-pane fade show active"
                  : "tab-pane fade"
              }
              id="dealer"
              role="tabpanel"
              aria-labelledby="dealer-tab"
            >
              <DealerExpireListingTable
                {...this.props}
                sort_by={this.state.sort_by}
                a_status="expired"
              />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    listing_detail:
      state.dealerAdminReducer.dealerListingReducer.listing_detail,
    loading: state.dealerAdminReducer.dealerListingReducer.loading,
    checkedAllDealerListing:
      state.dealerAdminReducer.dealerListingReducer.checkedAllDealerListing,
    checkedAllPendingListing:
      state.dealerAdminReducer.dealerListingReducer.checkedAllPendingListing,
    loading_listing_delete:
      state.dealerAdminReducer.dealerListingReducer.loading_listing_delete,
    loading_listing_delete_single:
      state.dealerAdminReducer.dealerListingReducer
        .loading_listing_delete_single,
    delete_listing_id:
      state.dealerAdminReducer.dealerListingReducer.delete_listing_id,
    total_count: state.dealerAdminReducer.dealerListingReducer.total_count,
    pages_urls: state.dealerAdminReducer.dealerListingReducer.total_pages,
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
})(DealerExpireListing);
