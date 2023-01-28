import React, { useState, useEffect } from "react";
import { history } from "../../../_helpers";

export default function CarIconHeader(props) {
  console.log("asdsdasd", props, `propssssssssss`);

  return (
    <>
      <button
        onClick={() => {
          props.activeCallback(!props.carHeaderActive);
        }}
        className="carIcon"
      >
        <img
          src={
            props.carHeaderActive
              ? "/assets/image/headerCarActiveIcon.svg"
              : "/assets/image/headerCarIcon.svg"
          }
          alt="carICon"
          className="headerIcon"
        />
      </button>

      <div
        className={
          props.carHeaderActive ? "carHeaderDropDown open" : "carHeaderDropDown"
        }
      >
        <div
          onClick={() => {
            history.push("/Ad-post/list");
            props.activeCallback(!props.carHeaderActive);
          }}
          className="item"
        >
          <img src="/assets/image/headerCarIcon.svg" alt="icon"></img>
          <span>Search Vehicles</span>
        </div>
        <div
          onClick={() => {
            history.push("/seller/add-post");
            props.activeCallback(!props.carHeaderActive);
          }}
          className="item"
        >
          <img src="/assets/image/headerCarIcon.svg" alt="icon"></img>
          <span>Post Ad</span>
        </div>
      </div>
    </>
  );
}
