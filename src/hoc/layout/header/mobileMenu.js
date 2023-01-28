import React, { useState } from "react";
import { history } from "../../../_helpers";
import { Link } from "react-router-dom";
export default function MobileMenu(props) {
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  // main return
  return (
    <>
      <div
        onClick={() => {
          props.carHeaderActive
            ? props.carHeaderActiveCallback()
            : setShowMobileMenu((prev) => !prev);
        }}
        className={
          showMobileMenu
            ? "menueBurger open"
            : props.carHeaderActive
            ? "menueBurger open"
            : "menueBurger"
        }
      >
        <div className="line line1"></div>
        <div className="line line2"></div>
        <div className="line line3"></div>
      </div>

      <div className={showMobileMenu ? "howItWorks open" : "howItWorks"}>
        <h1>How it works for:</h1>
        <div className="items" onClick={() => setShowMobileMenu(false)}>
          <Link to="/how-it-works" className="item">
            Buyers
          </Link>
          <Link to="/how-it-works" className="item">
            Sellers
          </Link>
          <Link to="/dealer-how-it-work" className="item">
            Dealers
          </Link>
        </div>

        <button
          onClick={() => {
            setShowMobileMenu(false);
            history.push("/seller/add-post");
          }}
          className="postAd"
        >
          <img
            src="/assets/image/postAdBtnIcon.svg"
            className="postAdIcon mr-2"
          />
          <span>Post Ad</span>
        </button>
        <button
          onClick={() => {
            setShowMobileMenu(false);
            history.push("/applynow/1");
          }}
          className="getFinancing"
        >
          <img
            src="/assets/image/getFinanceIcon.svg"
            className="getFinanceIcon mr-2"
          />
          <span>Get Financing</span>
        </button>
      </div>
    </>
  );
}
