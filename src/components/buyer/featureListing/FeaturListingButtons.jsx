import React, { useState, useEffect } from "react";
import $ from "jquery";
const FeaturListingButtons = ({ category, setCatgory }) => {
  const tabData = [
    { title: "Powersport", name: "Powersport" },
    { title: "Auto", name: "Automotive" },
    { title: "Motorcycle", name: "Motorcycle" },
    { title: "Boat", name: "Boat" },
    { title: "RV", name: "RV" },
    { title: "Trailer", name: "Trailer" },
    { title: "Small Equipment", name: "Small Equipment" },
  ];

  return (
    <>
      <ul
        className="nav nav-tabs d-none d-md-block"
        id="nav-tab"
        role="tablist"
      >
        {tabData?.map((item, index) => {
          return (
            <li key={index} className="nav-item pointer">
              <a
                className={
                  category === item.name ? "nav-link active" : "nav-link"
                }
                data-toggle="tab"
                role="tab"
                aria-selected="true"
                onClick={() => setCatgory(item.name)}
              >
                <span className="tab-text"> {item.title} </span>
              </a>
            </li>
          );
        })}
      </ul>
    </>
  );
};


export default FeaturListingButtons;