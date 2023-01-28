import React, { useState } from "react";
import { API_URL } from "../../../constant";
import { Link } from "react-router-dom";
import { capitalize, capsProvince } from "./../../../_helpers/capitalize";

export default function ListingCard({ data, props }) {
  const [isLiked, setIsLiked] = useState(data.saved_ad ? data.saved_ad : false);

  // console.log(data, "item data");

  const priceString = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(Number(data.price || 0));
  const price = priceString.substr(
    0,
    priceString.length - 3
  );
  return (
    <div className="featuredCard">
      <div className="distanceTag">
        {data.kilometer?.toLocaleString("en-US") || (0).toLocaleString("en-US")}{" "}
        km
      </div>
      <div
        onClick={() => {
          setIsLiked(!isLiked);
          props.toggleSavedAd(data.id, isLiked);
        }}
        className={isLiked ? "like active" : "like"}
      >
        <i className={isLiked ? "fa fa-heart" : "fa fa-heart-o"}></i>
      </div>
      <Link to={`/ad-post/detail/${data.stock_id}`}>
        <img
          src={
            data?.images[0]?.image_path
              ? API_URL + "/media/" + data?.images[0]?.image_path
              : "/assets/image/vehicle-in-area-image2.jpg"
          }
          alt="vehicle"
          className="cover"
        />
      </Link>

      <div className="detail">
        <div className="flexBetweenCenter">
          <h1>
            {data?.year} {data?.make?.make_name}
          </h1>{" "}
          <h2>
            {data.price !== null && data.price !== ""
              ? new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
                //  maximumFractionDigits:0
              }).format(Number(data.price).toFixed(0)) // '$100.00'
              : new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(0)}
          </h2>
        </div>
        <div className="flexBetweenCenter">
          <h1>{data?.model?.model_make}</h1>
          <div className="flexCenter">
            {data?.city && (
              <div className="location">
                <i class="icon-subtract-icon"></i>
              </div>
            )}
            <span>{data?.city ? `${capitalize(data?.city)}, ${capsProvince(data?.province)}` : ""}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
