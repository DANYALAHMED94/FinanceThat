/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { admin_logout } from "../../../actions/authActions";
import { connect } from "react-redux";
import Dropdown from "react-bootstrap/Dropdown";
import $ from "jquery";
import { API_URL } from "../../../constant";
class AdminHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allowScreens: {
        settings:
          (this.props.adminScreens || []).length > 0
            ? (this.props.adminScreens || [])[0] !== undefined &&
              (this.props.adminScreens || [])[0] !== null
              ? (this.props.adminScreens || [])[0].settings
              : false
            : true,
      },
    };
  }
  logout = () => {
    this.props.admin_logout();
  };
  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.adminScreens !== this.props.adminScreens &&
      this.props.adminScreens !== undefined
    ) {
      const allowScreens = {
        settings:
          (this.props.adminScreens || []).length > 0
            ? (this.props.adminScreens || [])[0] !== undefined &&
              (this.props.adminScreens || [])[0] !== null
              ? (this.props.adminScreens || [])[0].settings
              : false
            : false,
      };
      this.setState({
        ...this.state,
        allowScreens: allowScreens,
      });
    }
  }
  render() {
    return (
      <React.Fragment>
        <header className="AdminHeader">
          <div className="AdminTop-Container">
            <div className="AdminLogo">
              <a href="/admin">
                <img src="/assets/image/admin-logo.svg" alt="" />
              </a>
            </div>

            <div className="PrMenu-Side">
              <nav className="navbar navbar-expand-lg">
                <button
                  className="navbar-toggler"
                  type="button"
                  data-toggle="collapse"
                  data-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span className="navbar-toggler-icon"></span>
                </button>

                <div
                  className="collapse navbar-collapse"
                  id="navbarSupportedContent"
                >
                  <ul className="navbar-nav mr-auto">
                    <li className="nav-item dropdown">
                      <a
                        className="Notify-icon"
                        id="navbarDropdown1"
                        role="button"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        <img src="/assets/image/icon-notify.svg" alt="" />
                        {this.props.total_unRead !== undefined &&
                        this.props.total_unRead !== null &&
                        Number(this.props.total_unRead) !== 0 ? (
                          <span>{this.props.total_unRead || 0}</span>
                        ) : null}
                      </a>
                    </li>

                    <li>
                      <div className="admin-menu-container">
                        <div className="Profiledropdown">
                          <Dropdown>
                            <Dropdown.Toggle id="dropdown-basic-button">
                              <img
                                src={
                                  localStorage.getItem("admin") !== undefined &&
                                  localStorage.getItem("admin") !== null
                                    ? JSON.parse(localStorage.getItem("admin"))
                                        .photo !== undefined &&
                                      JSON.parse(localStorage.getItem("admin"))
                                        .photo !== null
                                      ? API_URL +
                                          "/media/" +
                                          JSON.parse(
                                            localStorage.getItem("admin")
                                          ).photo || ""
                                      : "/assets/image/admin-pr-icon.svg"
                                    : "/assets/image/admin-pr-icon.svg"
                                }
                                alt=""
                              />
                              <span>
                                {localStorage.getItem("admin") !== undefined &&
                                localStorage.getItem("admin") !== null
                                  ? JSON.parse(localStorage.getItem("admin"))
                                      .user !== undefined &&
                                    JSON.parse(localStorage.getItem("admin"))
                                      .user !== null
                                    ? JSON.parse(localStorage.getItem("admin"))
                                        .user || ""
                                    : "Sierra Ferguson"
                                  : ""}
                              </span>
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              {this.state.allowScreens ? (
                                this.state.allowScreens.settings ? (
                                  <Link to="/admin/settings">
                                    {" "}
                                    <Dropdown.Item as="button">
                                      <img
                                        src="/assets/image/sprite-icon/admin-setting-icon.svg"
                                        alt=""
                                      />{" "}
                                      Setting
                                    </Dropdown.Item>
                                  </Link>
                                ) : (
                                  <Link to="#">
                                    {" "}
                                    <Dropdown.Item as="button">
                                      <img
                                        src="/assets/image/sprite-icon/admin-setting-icon.svg"
                                        alt=""
                                      />{" "}
                                      Setting
                                    </Dropdown.Item>
                                  </Link>
                                )
                              ) : (
                                <Link to="#">
                                  {" "}
                                  <Dropdown.Item as="button">
                                    <img
                                      src="/assets/image/sprite-icon/admin-setting-icon.svg"
                                      alt=""
                                    />{" "}
                                    Setting
                                  </Dropdown.Item>
                                </Link>
                              )}

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
    adminScreens: state.authReducer.authentication.adminScreens,
  };
};
export default connect(mapStateToProps, { admin_logout })(AdminHeader);
