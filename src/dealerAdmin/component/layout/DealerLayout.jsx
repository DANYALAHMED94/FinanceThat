import React, { Component } from "react";
import TostarMessages from "../../../components/alertMessages/TostarMessages";
import { get_chat_user, change_chat_user } from "../../../actions/chatActions";
import { get_agents_screen } from "../../../actions/authActions";
import { connect } from "react-redux";
import LoadingOverlay from "react-loading-overlay";
import DMSHeader from '../header/DMSHeader'
import DMSSideBar from '../sideBar/DMSSideBar'

class AdminLayout extends Component {
  componentDidMount() {
    if (localStorage.getItem("userId") && localStorage.getItem("is_staff") === 'true') {
      this.props.get_agents_screen(localStorage.getItem("userId"));
    }
  }
  render() {
    return (
      <React.Fragment>
        <div className="bodyColor">
          <DMSHeader />
          <DMSSideBar adminScreens={this.props.adminScreens}/>
          <main className="MainBody">
            <LoadingOverlay
              active={this.props.loading_api}
              spinner
              text="Loading your content..."
            >
              {this.props.children}
              <TostarMessages />
            </LoadingOverlay>
          </main>
        </div>
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    admin: state.authReducer.authentication.admin,
    adminScreens: state.authReducer.authentication.adminScreens,
    loading_api:
      state.dealerAdminReducer.dealerCommonReducer.loading_api,
  };
};
export default connect(mapStateToProps, {
  get_chat_user,
  change_chat_user,
  get_agents_screen,
})(AdminLayout);
