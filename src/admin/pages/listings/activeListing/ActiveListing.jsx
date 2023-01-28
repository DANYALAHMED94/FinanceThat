import React, { Component } from "react";
import DealerActiveListing from "../../../component/listings/activeListings/DealerActiveListing";
import PrivateActiveListing from "../../../component/listings/activeListings/PrivateActiveListing";
import {
  get_listing,
  single_check_listing,
  toggle_all_check_listing,
  remove_all_state_listing,
  soft_delete_single_listing,
  archive_listing,
  soft_delete_listings,
  get_listing_pages,
} from "../../../../actions/admin/listingActions";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";

class ActiveListing extends Component {
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
      a_status: "active",
      sort_by: this.state.sort_by,
      p_size: 20,
    };
    this.props.get_listing(data);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.tab !== this.state.tab && this.state.tab !== undefined) {
      const data = {
        a_type: this.state.tab,
        a_status: "active",
        sort_by: this.state.sort_by,
        p_size: 20,
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
          <h1>Active Listings</h1>
        </div>
        <div className="Admin-ActiveList-Container">
          <ul className="nav nav-tabs TableTab" id="myTab" role="tablist">
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
            <li
              className="nav-item"
              onClick={() => this.setState({ ...this.state, tab: "private" })}
            >
              <a
                className={tab === "private" ? "active" : ""}
                id="private-tab"
                href="#private"
                data-toggle="tab"
                role="tab"
                aria-controls="private"
                aria-selected="true"
              >
                Private
              </a>
            </li>
          </ul>

          <div className="tab-content" id="myTabContent">
            {tab === "dealer" ? (
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
                <DealerActiveListing
                  {...this.props}
                  sort_by={this.state.sort_by}
                  a_status="active"
                />
              </div>
            ) : null}
            {tab === "private" ? (
              <div
                className={
                  tab === "private"
                    ? "tab-pane fade show active"
                    : "tab-pane fade"
                }
                id="private"
                role="tabpanel"
                aria-labelledby="private-tab"
              >
                <PrivateActiveListing
                  {...this.props}
                  sort_by={this.state.sort_by}
                  a_status="active"
                />
              </div>
            ) : null}
          </div>
        </div>
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    listing_detail:
      state.adminReducer.adminAccounts.listingReducer.listing_detail,
    loading: state.adminReducer.adminAccounts.listingReducer.loading,
    checkedAllDealerListing:
      state.adminReducer.adminAccounts.listingReducer.checkedAllDealerListing,
    checkedAllPendingListing:
      state.adminReducer.adminAccounts.listingReducer.checkedAllPendingListing,
    loading_listing_delete:
      state.adminReducer.adminAccounts.listingReducer.loading_listing_delete,
    loading_listing_delete_single:
      state.adminReducer.adminAccounts.listingReducer
        .loading_listing_delete_single,
    delete_listing_id:
      state.adminReducer.adminAccounts.listingReducer.delete_listing_id,
    total_count: state.adminReducer.adminAccounts.listingReducer.total_count,
    pages_urls: state.adminReducer.adminAccounts.listingReducer.total_pages,
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
})(ActiveListing);
