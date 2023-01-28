import React, { useState } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../../../constant";
import { history } from "../../../_helpers";

export default function UserMobileMenu(props) {
  const [showMenu, setShowMenu] = useState(false);

  // return
  return (
    <>
      {!props.loggedIn ? (
        <div className="sign-up-header">
          <img
            onClick={() => setShowMenu((prev) => !prev)}
            src={
              showMenu
                ? "/assets/image/profile-header-active.svg"
                : "/assets/image/headerProfileIcon.svg"
            }
            alt="carICon"
            className="userIcon"
          />
        </div>
      ) : (
        <div
          onClick={() => setShowMenu((prev) => !prev)}
          className="Profiledropdown"
        >
          {" "}
          {!props.photo && !props.preview ? (
            <span className="pr-avtar"> {`${props.first}${props.last}`} </span>
          ) : (
            <span className="pr-avtar">
              <img
                src={
                  !props.preview
                    ? !props.photo
                      ? "/assets/image/profile-img.png"
                      : `${API_URL}${props.photo}`
                    : props.preview
                }
                alt="profile_Image"
              />
            </span>
          )}
        </div>
      )}
      {props.loggedIn || (
        <div
          className={
            showMenu
              ? "sign-up-header-dropdown open"
              : "sign-up-header-dropdown"
          }
        >
          <div className="textHeader">
            <h4>Profile</h4>
            <img
              className="mr-2 pointer"
              src="/assets/image/closeIcon.svg"
              onClick={() => {
                setShowMenu(false);
              }}
            ></img>
          </div>
          <div className="centerFlex">
            <button
              onClick={() => {
                setShowMenu(false);
                history.push("/login");
              }}
              type="button"
              className="sign-in-button"
            >
              Sign In
            </button>
          </div>
          <div className="centerFlex mt-2">
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
              onClick={() => {
                setShowMenu(false);
                history.push("/register");
              }}
              className="nav-link"
            >
              {" "}
              Sign Up
            </span>
          </p>
        </div>
      )}

      {/* profile dropdownMenu */}
      {props.loggedIn && (
        <div
          className={showMenu ? "Profiledropdown active" : "Profiledropdown"}
          style={{ position: "static", width: "100%" }}
        >
          <div className="dropdownMenu">
            <div className="profile-header">
              <img
                className="mr-2 pointer"
                src="/assets/image/closeIcon.svg"
                onClick={() => {
                  setShowMenu(false);
                }}
                style={{ float: "right" }}
              ></img>
              <div className="detailDiv">
                {!props.photo && !props.preview ? (
                  <span className="pr-avtar">
                    {" "}
                    {`${props.first}${props.last}`}{" "}
                  </span>
                ) : (
                  <span className="pr-avtar">
                    <img
                      src={
                        !props.preview
                          ? !props.photo
                            ? "/assets/image/profile-img.png"
                            : `${API_URL}${props.photo}`
                          : props.preview
                      }
                      alt="profile_Image"
                    />
                  </span>
                )}

                <div>
                  <h2>{props.name}</h2>
                  <p>{props.email}</p>
                </div>
              </div>

              {props.app_id && (
                <div className="d-flex align-items-center application-tag">
                  <h2>Application {props.app_id}</h2>
                  {props.renderStatusTag()}
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
                          </Link>) :props.navItems.map((item) => {
                return (
                  <Link
                    onClick={() => setShowMenu(false)}
                    to={item.link}
                    className="item"
                  >
                    <img src={item.img} alt="icon" className="menuIcon" />
                    <span>{item.name}</span>
                    {item.new && <div className="new"> </div>}
                  </Link>
                );
              })}
            </div>
            <div className="centerFlex">
              <button
                onClick={() => {
                  setShowMenu(false);
                  props.logout();
                }}
                className="logout"
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
