import React, { Component } from "react";
import { Link } from "react-router-dom";
import { logout } from "../../../actions/authActions";
import { connect } from "react-redux";
import Dropdown from "react-bootstrap/Dropdown";
import Lottie from "react-lottie";
import $ from "jquery";
import { API_URL } from "../../../constant";
import { history } from "../../../_helpers";
import "./headerMobile.css";
import MobileMenu from "./mobileMenu";
import UserMobileMenu from "./userMobileMenu";
import CarIconHeader from "./carIconHeader";
import animationData from "../../../assets/lotties/financethatLogo.json";

$(window).click(function (e) {
  if ($(".navbar-collapse").hasClass("show")) {
    $(".navbar-collapse").removeClass("show");
    $(".navbar-toggler").addClass("collapsed");
    e.preventDefault();
  }
});
$(".navbar-collapse").click(function (event) {
  event.stopPropagation();
});
class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navItems: [
        {
          name: "My Profile",
          link: "/buyer",
          img: "/assets/image/profileMenuIcon.svg",
          new: false,
        },
        {
          name: "My Applications",
          link: "/buyer/my-application",
          img: "/assets/image/applicationMenuIcon.svg",
          new: false,
        },
        {
          name: "My Ads",
          link: "/buyer/my-ads",
          img: "/assets/image/adsMenuIcon.svg",
          new: false,
        },
        {
          name: "Saved Ads",
          link: "/buyer/saved-ads",
          img: "/assets/image/savedMenuIcon.svg",
          new: false,
        },
        {
          name: "Messages",
          link: "/messages",
          img: "/assets/image/messageMenuIcon.svg",
          new: false,
        },
        {
          name: "Settings",
          link: "/buyer/settings",
          img: "/assets/image/settingMenuIcon.svg",
          new: false,
        },
      ],

      carHeaderActive: false,
    };
  }
  removeDrop = () => {
    $("#dropAccount").hide();
  };
  logout = () => {
    this.props.logout();
  };

  shouldComponentUpdate(nextProps, nextState) {
    if (
      this.props.name !== nextProps.name ||
      this.props.photo !== nextProps.photo ||
      this.state.preview !== nextState.preview ||
      this.props.total_unRead !== nextProps.total_unRead ||
      this.props.loggedIn !== nextProps.loggedIn ||
      this.state.navItems !== nextState.navItems ||
      this.state.carHeaderActive !== nextState.carHeaderActive
    ) {
      return true;
    }
    return false;
  }

  activeCallback = (val) => {
    console.log("working");
    this.setState({
      carHeaderActive: val,
    });
  };
  componentDidUpdate() {
    if (
      this.props.total_unRead !== undefined &&
      this.props.total_unRead !== null &&
      Number(this.props.total_unRead) !== 0
    ) {
      if (this.state.navItems[4].new !== true) {
        const newNavItems = this.state.navItems.filter((el, i) => {
          if (i === 4) el.new = true;
          return el;
        });

        console.log("new Nav items", newNavItems);
        this.setState({
          navItems: newNavItems,
        });
      }
    }
  }
  renderStatusTag = () => {
    const { app_status } = this.props;
    let status = "";
    let statusText = "";
    switch (app_status) {
      case "1":
        status = "unverified";
        statusText = "Credit Unknown";
        break;
      case "2":
        status = "conditionally-approved";
        statusText = "Cond. Approved";
        break;
      case "3":
        status = "pre-approved";
        statusText = "Pre-approved";
        break;
      case "4":
        status = "declinded";
        statusText = "Declinded";
        break;
      case "5":
        status = "approved";
        statusText = "Approved";
        break;
      case "6":
        status = "funded";
        statusText = "Booked";
        break;
      case "7":
          status="withdraw"
          statusText = "Withdraw"
          break;
      case "11":
          status="declinded"
          statusText = "Credit Unverified"
          break;
      case "pending":
        status = "declinded";
        statusText = "Credit Unknown";
        break;

      default:
        break;
    }

    return <div className={`status ${status} `}>{statusText}</div>;
  };

  emptyFun = () => {
    return false;
  };
  render() {
    // let first = this.props.name !== undefined && this.props.name !== null && this.props.name !== '' ? this.props.name.split(' ')[0] : ''
    // let last = this.props.name !== undefined && this.props.name !== null && this.props.name !== '' ? this.props.name.split(' ')[1] : ''
    let first = this.props.firstName !== undefined && this.props.firstName !== null && this.props.firstName !== '' ? this.props.firstName : ''
    let last = this.props.lastName !== undefined && this.props.lastName !== null && this.props.lastName !== '' ? this.props.lastName : ''
    first = first ? first.charAt(0).toUpperCase() : ''
    last = last ? last.charAt(0).toUpperCase() : ''
    const defaultOptionsLottie = {
      loop: true,
      autoplay: true,
      animationData: animationData,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
      },
    };
    console.log(history.location.pathname,"history.location.pathname")
    return (
      <header>
        <section className="SectionHeader">
          <div className="WebLogo" onClick={()=>window.location.href="/"}>
            {/* <Link to="/"> */}
              {/* <img src="/assets/image/financethat-logo.svg" alt="" /> */}
              <Lottie
                options={defaultOptionsLottie}
                height={"100%"}
                width={"100%"}
              />
            {/* </Link> */}
          </div>

          <div className="inner-nav-wrapper">
          {history.location.pathname !== "/secure/admin-login" && (
            <>
            <div className="how-it-work-nav ">
              <div className="nav-item ">
                <div style={{fontSize:"15px"}} className="nav-link noHover">How it works for</div>
              </div>
              <div style={{fontSize:"15px"}} className="nav-item active">
                <Link to="/buyer-how-it-work" className="nav-link">
                  buyers
                </Link>
              </div>
              <div style={{fontSize:"15px"}} className="nav-item active">
                <Link to="/seller-how-it-work" className="nav-link">
                  sellers
                </Link>
              </div>
              <div style={{fontSize:"15px"}} className="nav-item active">
                <Link to="/dealer-how-it-work" className="nav-link">
                  dealers
                </Link>
              </div>
            </div>
            <div className="post-navigation-sec">
              <Link to="/personal-loans/1" className="text-decoration-none">
                <button type="button" className="Header-AddPost">
                  <img
                    src="/assets/image/perimg.svg"
                    alt="carICon"
                    className="headerIcon"
                  />
                  <span style={{color:"#fb5100"}}>Personal Loan</span>
                </button>
              </Link>
              <Link to="/seller/add-post" className="text-decoration-none">
                <button type="button" className="Header-AddPost">
                  <img
                    src="/assets/image/headerCarIcon.svg"
                    alt="carICon"
                    className="headerIcon"
                  />
                  <span>Post Ad</span>
                </button>
              </Link>
              <Link to="/Ad-post/list" className="text-decoration-none">
                <button type="button" className="Header-AddPost">
                  <img
                    src="/assets/image/headerCarIcon.svg"
                    alt="carICon"
                    className="headerIcon"
                  />
                  <span> Search Vehicles</span>
                </button>
              </Link>
              {this.props.loggedIn || (
                <div className="sign-up-header">
                  <img
                    src="/assets/image/headerProfileIcon.svg"
                    alt="carICon"
                    className="headerIcon"
                  />
                  <span>Sign In</span>
                  <i class="fa fa-angle-down"></i>
                  <div style={{height:"150px"}} className="sign-up-header-dropdown">
                    <div className="centerFlex">
                      <button
                        onClick={() => history.push("/login")}
                        type="button"
                        className="sign-in-button"
                      >
                        Sign In
                      </button>
                    </div>
                    <div className="centerFlex" style={{paddingTop:"10px"}}>
                      <button
                        onClick={() => history.push("/dealer-login")}
                        type="button"
                        className="sign-in-button"
                      >
                        Dealer Login
                      </button>
                    </div>
                    <p>
                      Don’t have an account ?
                      <span
                        onClick={() => history.push("/register")}
                        className="nav-link"
                      >
                        {" "}
                        Sign Up
                      </span>
                    </p>
                  </div>
                </div>
              )}

              {this.props.loggedIn && (
                <div className="d-flex align-items-center">
                  <Link to="/messages">
                    <div className="messageSec">
                      <img
                        src="/assets/image/message-header.svg"
                        alt=""
                        className="messageIcon"
                      />
                      {this.props.total_unRead !== undefined &&
                        this.props.total_unRead !== null &&
                        Number(this.props.total_unRead) !== 0 ? (
                        <div className="Badge"></div>
                      ) : null}
                    </div>
                  </Link>
                  <div className="Profiledropdown">
                    {" "}
                    {!this.props.photo && !this.state.preview ? (
                      <span className="pr-avtar"> {`${first}${last}`} </span>
                    ) : (
                      <span className="pr-avtar">
                        <img
                          src={
                            !this.state.preview
                              ? !this.props.photo
                                ? "/assets/image/profile-img.png"
                                : `${API_URL}${this.props.photo}`
                              : this.state.preview
                          }
                          alt="profile_Image"
                        />
                      </span>
                    )}
                    <div className="dropdownMenu">
                      <div className="profile-header">
                        <div className="detailDiv">
                          {!this.props.photo && !this.state.preview ? (
                            <span className="pr-avtar">
                              {" "}
                              {`${first}${last}`}{" "}
                            </span>
                          ) : (
                            <span className="pr-avtar">
                              <img
                                src={
                                  !this.state.preview
                                    ? !this.props.photo
                                      ? "/assets/image/profile-img.png"
                                      : `${API_URL}${this.props.photo}`
                                    : this.state.preview
                                }
                                alt="profile_Image"
                              />
                            </span>
                          )}

                          <div>
                            <h2>{this.props.name}</h2>
                            <p>{this.props.email}</p>
                          </div>
                        </div>

                        {this.props.app_id && (
                          <div className="d-flex align-items-center application-tag">
                            <h2>Application {this.props.app_id}</h2>
                            {this.renderStatusTag()}
                          </div>
                        )}
                      </div>
                      <div className="itemWrapper">

                        {(Number(localStorage.getItem('user_type')) === 2) ?
                          (<Link
                            to="/dealer-admin/application/general"
                            className="item"
                          >
                            <div className="imageWrapper">
                              <img
                                src={"/assets/image/settingMenuIcon.svg"}
                                alt="icon"
                                className="menuIcon"
                              />
                            </div>
                            <span>Dealer</span>
                          </Link>) :
                          this.state.navItems.map((item) => {
                            return (
                              <Link to={item.link} className="item">
                                <div className="imageWrapper">
                                  <img
                                    src={item.img}
                                    alt="icon"
                                    className="menuIcon"
                                  />
                                </div>
                                <span>{item.name}</span>
                                {item.new && <div className="new"> </div>}
                              </Link>
                            );
                          })}
                      </div>
                      <div className="centerFlex">
                        <button onClick={this.logout} className="logout">
                          Log Out
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="header-finance-sec">
                <Link to="/applynow/1">
                  <button type="button" className="active">
                    Get Financing
                  </button>
                </Link>
              </div>
            </div>
            </>)}

          </div>
        </section>

        <div className="MobileNav" id="MobileNav">
          <nav className="mobileNav">
            <Link className="navbar-logo" to="/">
              <Lottie
                options={defaultOptionsLottie}
                height={"100%"}
                width={"100%"}
              />
            </Link>

            <div className="actions">
              {this.props.loggedIn && (
                <Link to="/messages">
                  <div className="messageSec">
                    <img
                      src="/assets/image/message-header.svg"
                      alt=""
                      className="messageIcon"
                    />
                    {this.props.total_unRead !== undefined &&
                      this.props.total_unRead !== null &&
                      Number(this.props.total_unRead) !== 0 ? (
                      <div className="Badge"></div>
                    ) : null}
                  </div>
                </Link>
              )}
              <CarIconHeader
                activeCallback={this.activeCallback}
                carHeaderActive={this.state.carHeaderActive}
              />

              <UserMobileMenu
                {...this.props}
                {...this.state}
                first={first}
                last={last}
                renderStatusTag={this.renderStatusTag}
              />

              <MobileMenu
                carHeaderActive={this.state.carHeaderActive}
                carHeaderActiveCallback={() =>
                  this.setState({
                    carHeaderActive: false,
                  })
                }
              />
            </div>
          </nav>
        </div>
      </header>
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
export default connect(mapStateToProps, { logout })(Header);
