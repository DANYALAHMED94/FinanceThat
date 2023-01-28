/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { logout } from "../../../actions/authActions";

import { connect } from "react-redux";
import Dropdown from "react-bootstrap/Dropdown";
import $ from "jquery";
import { API_URL } from "../../../constant";
class DMSHeader extends Component {
  logout = () => {
    this.props.logout();
  };
  render() {
    return (
      <React.Fragment>
        <header className="AdminHeader">
          <div className="AdminTop-Container">
            <div className="AdminLogo">
              <a href="/dealer-admin/application/general">
                <img src="/assets/image/admin-logo.svg" alt="" />
              </a>
            </div>

            <div className="PrMenu-Side">
              <nav className="navbar navbar-expand-lg">

                <div
                  className="collapse navbar-collapse"
                  id="navbarSupportedContent"
                >
                  <ul className="navbar-nav mr-auto">


                    <li>
                      <div className="admin-menu-container">
                        <div className="Profiledropdown">
                          <Dropdown>
                            <Dropdown.Toggle id="dropdown-basic-button">
                              <img
                                src={
                                  localStorage.getItem("user") !== undefined &&
                                    localStorage.getItem("user") !== null
                                    ? JSON.parse(localStorage.getItem("user"))
                                      .photo !== undefined &&
                                      JSON.parse(localStorage.getItem("user"))
                                        .photo !== null
                                      ? API_URL +
                                      "/media/" +
                                      JSON.parse(
                                        localStorage.getItem("user")
                                      ).photo || ""
                                      : "/assets/image/admin-pr-icon.svg"
                                    : "/assets/image/admin-pr-icon.svg"
                                }
                                alt=""
                              />
                              <span>
                                {localStorage.getItem("user") !== undefined &&
                                  localStorage.getItem("user") !== null
                                  ? JSON.parse(localStorage.getItem("user"))
                                    .user !== undefined &&
                                    JSON.parse(localStorage.getItem("user"))
                                      .user !== null
                                    ? JSON.parse(localStorage.getItem("user"))
                                      .user || ""
                                    : "Sierra Ferguson"
                                  : ""}
                              </span>
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <Link to={`${this.props.url}/settings`}>
                                {" "}
                                <Dropdown.Item as="button">
                                  <img
                                    src="/assets/image/sprite-icon/admin-setting-icon.svg"
                                    alt=""
                                  />{" "}
                                  Setting
                                </Dropdown.Item>
                              </Link>


                              <Link to="#">
                                <Dropdown.Item
                                  as="button"
                                  className="border-bottom-0"
                                  onClick={this.logout}
                                >
                                  <img
                                    src="/assets/image/sprite-icon/admin-logout-icon.svg"
                                    alt=""
                                  />{" "}
                                  Logout
                                </Dropdown.Item>
                              </Link>
                            </Dropdown.Menu>
                          </Dropdown>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </nav>
            </div>
          </div>
        </header>
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    loggedIn: state.authReducer.authentication.loggedIn,
    total_unRead: state.chatReducer.total_unRead,
    name: state.userProfileReducer.name,
    firstName: state.userProfileReducer.firstName,
    lastName: state.userProfileReducer.lastName,
    photo: state.userProfileReducer.photo,
    app_id: state.userProfileReducer?.get_user_profile?.app_id,
    app_status: state.userProfileReducer?.get_user_profile?.app_status,
    email: state.userProfileReducer?.get_user_profile?.email,
  };
};
export default connect(mapStateToProps, { logout })(DMSHeader);
