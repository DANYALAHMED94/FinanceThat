import React, { Component } from "react";
import DealerActiveAccounts from "../../../component/accounts/activeAccount/DealerActiveAccounts";
import PrivateActiveAccounts from "../../../component/accounts/activeAccount/PrivateActiveAccounts";
import {
  get_pending_active_accounts,
  single_check_pending,
  toggle_all_check,
  update_account_row_data,
  remove_all_state_accounts,
  delete_single_account,
  delete_multiple_account,
  get_pending_active_accounts_pages,
} from "../../../../actions/admin/accountActions";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";

class ActiveAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: "dealer",
      sort_by: "newest_accounts_first",
      // oldest_accounts_first
    };
  }
  componentDidMount() {
    let data = {
      a_type: this.state.tab,
      a_status: "approved",
      sort_by: this.state.sort_by,
      p_size: 20,
    };
    if(localStorage.getItem("staff_dealer")){
      data.dealer_id = localStorage.getItem("staff_dealer")
    }
    this.props.get_pending_active_accounts(data);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.tab !== this.state.tab && this.state.tab !== undefined) {
      let data = {
        a_type: this.state.tab,
        a_status: "approved",
        sort_by: this.state.sort_by,
        p_size: 20,
      };
      if(localStorage.getItem("staff_dealer")){
        data.dealer_id = localStorage.getItem("staff_dealer")
      }
      this.props.get_pending_active_accounts(data);
    }
  }
  componentWillUnmount() {
    this.props.remove_all_state_accounts();
  }
  emptyFun = () => {
    return true;
  };
  render() {
    const { tab } = this.state;
    return (
      <React.Fragment>
        <Helmet>
          <title>Active Dealer List</title>
          <meta name="description" content="" />
        </Helmet>
        <div className="Pending-ListHead">
          <h1>Active Accounts</h1>
        </div>
        <div className="Admin-ActiveList-Container">
          <ul className="nav nav-tabs TableTab" id="myTab" role="tablist">
            <li
              className="nav-item"
              onClick={
                this.props.loading === true
                  ? this.emptyFun
                  : () => this.setState({ ...this.state, tab: "dealer" })
              }
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
              onClick={
                this.props.loading === true
                  ? this.emptyFun
                  : () => this.setState({ ...this.state, tab: "private" })
              }
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
                <DealerActiveAccounts
                  {...this.props}
                  sort_by={this.state.sort_by}
                  a_status="approved"
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
                <PrivateActiveAccounts
                  {...this.props}
                  sort_by={this.state.sort_by}
                  a_status="approved"
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
    active_pending_accounts:
      state.adminReducer.adminAccounts.pendingAccountReducer
        .active_pending_accounts,
    checkedAllDealerAccount:
      state.adminReducer.adminAccounts.pendingAccountReducer
        .checkedAllDealerAccount,
    checkedAllPendingAccount:
      state.adminReducer.adminAccounts.pendingAccountReducer
        .checkedAllPendingAccount,
    loading: state.adminReducer.adminAccounts.pendingAccountReducer.loading,
    delete_account_loading:
      state.adminReducer.adminAccounts.pendingAccountReducer
        .delete_account_loading,
    delete_account_id:
      state.adminReducer.adminAccounts.pendingAccountReducer.delete_account_id,
    total_count:
      state.adminReducer.adminAccounts.pendingAccountReducer.total_count,
    pages_urls:
      state.adminReducer.adminAccounts.pendingAccountReducer.total_pages,
  };
};
export default connect(mapStateToProps, {
  get_pending_active_accounts,
  single_check_pending,
  toggle_all_check,
  update_account_row_data,
  remove_all_state_accounts,
  delete_single_account,
  delete_multiple_account,

  get_pending_active_accounts_pages,
})(ActiveAccount);
