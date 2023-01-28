import React, { Component } from "react";
import AdminHeader from "../header/AdminHeader";
import AdminSideBar from "../sideBar/AdminSideBar";
import TostarMessages from "../../../components/alertMessages/TostarMessages";
import { get_chat_user, change_chat_user } from "../../../actions/chatActions";
import { get_agents_screen } from "../../../actions/authActions";
import { connect } from "react-redux";
import LoadingOverlay from "react-loading-overlay";
import loadjs from 'loadjs'
class AdminLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id:
        this.props.admin !== null && this.props.admin !== undefined
          ? this.props.admin.user_id
          : "",
    };
  }
  componentDidMount() {
    console.log(document.getElementById("freshchat-js-sdk"), "freshchat-js-sdk")
    this.removejscssfile("/assets/js/thirdPartyScript", "js");
    this.removejscssfile("/assets/admin/js/slidenav", "js");
    this.removejscssfile("/assets/admin/js/admin-menu", "js");
    loadjs("/assets/admin/js/slidenav.js", () => {
      loadjs("/assets/admin/js/admin-menu.js", () => { });
    });

    if (this.state.user_id) {
      // this.props.get_chat_user(this.state.user_id)
      // this.props.change_chat_user(this.state.user_id)
      this.props.get_agents_screen(this.state.user_id);
    }
  }
  removejscssfile = (filename, filetype) => {
    var targetelement =
      filetype === "js" ? "script" : filetype === "css" ? "link" : "none"; //determine element type to create nodelist from
    var targetattr =
      filetype === "js" ? "src" : filetype === "css" ? "href" : "none"; //determine corresponding attribute to test for
    var allsuspects = document.getElementsByTagName(targetelement);
    for (var i = allsuspects.length; i >= 0; i--) {
      //search backwards within nodelist for matching elements to remove
      if (
        allsuspects[i] &&
        allsuspects[i].getAttribute(targetattr) != null &&
        allsuspects[i].getAttribute(targetattr).indexOf(filename) != -1
      )
        allsuspects[i].parentNode.removeChild(allsuspects[i]); //remove element by calling parentNode.removeChild()
    }
  };
  render() {
    console.log(this.props, "admin hoc", this.props.adminScreens);
    return (
      <React.Fragment>
        <div className="bodyColor">
          <AdminHeader />
          <AdminSideBar adminScreens={this.props.adminScreens} />
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
      state.adminReducer.adminAccounts.adminCommonReducer.loading_api,
  };
};
export default connect(mapStateToProps, {
  get_chat_user,
  change_chat_user,
  get_agents_screen,
})(AdminLayout);
