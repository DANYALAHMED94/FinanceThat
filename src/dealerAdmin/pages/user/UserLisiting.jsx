import React, { Component } from "react";
import UsersListing from "../../component/user/UsersListing";
import {
  get_users,
  single_check_user,
  toggle_all_check_user,
  remove_all_state_user,
  delete_single_user,
  delete_multi_user,
  get_users_pages,
  get_dealer_admin_users,
} from "../../../actions/dealer/dealerUserActions";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";

class UserListing extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    const data = {
      search: "",
      sort_by: "newest_accounts",
      p_size: 20,
      dealer_id: localStorage.getItem('userId')
      // localStorage.getItem('userId')
    };
    if(localStorage.getItem("staff_dealer")){
      data.dealer_id = localStorage.getItem("staff_dealer")
      this.props.get_dealer_admin_users(data)
    }else {
      this.props.get_dealer_admin_users(data);
    }
  }
  componentWillUnmount() {
    this.props.remove_all_state_user()
  }
  render() {
    return (
      <React.Fragment>
        <Helmet>
          <title>User List</title>
          <meta name="description" content="" />
        </Helmet>
        <UsersListing {...this.props} />
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    loading: state.dealerAdminReducer.dealerUserReducer.loading,
    user_listing: state.dealerAdminReducer.dealerUserReducer.user_listing,
    checkedAllUser:
      state.dealerAdminReducer.dealerUserReducer.checkedAllUser,
    loading_deleteing:
      state.dealerAdminReducer.dealerUserReducer.loading_deleteing,
    delete_user_id:
      state.dealerAdminReducer.dealerUserReducer.delete_user_id,
    total_count: state.dealerAdminReducer.dealerUserReducer.total_count,
    pages_urls: state.dealerAdminReducer.dealerUserReducer.total_pages,
  };
};
export default connect(mapStateToProps, {
  get_users,
  single_check_user,
  toggle_all_check_user,
  remove_all_state_user,
  delete_single_user,
  delete_multi_user,
  get_users_pages,
  get_dealer_admin_users
})(UserListing);
