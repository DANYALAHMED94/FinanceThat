import React from "react";
import ReviewCard from "./reviewCard";
import { reviews } from "./reviewsData";
import ReviewSlider from "./reviewSlider";

export default function GoogleReviews() {
  const cloneReviews = [...reviews];
  const tabletReviews =
    cloneReviews.length > 0
      ? [cloneReviews[0], cloneReviews[1], cloneReviews[4], cloneReviews[5]]
      : [];

  return (
    <div className="google-review-sec">
      <div className="first-header">
        <div className="title">Don’t take our word for it.</div>
        <div className="title primary">Trust our customers</div>
      </div>

      <div className="review-bg">
        <div className="centerFlex">
          <div className="google-header">
            <img
              src="/assets/image/googleLogo.svg"
              alt="logo"
              className="googleLogo"
            ></img>
            <div className="ratingWrapper">
              <ul>
                <li className="rated">
                  <i className="fa fa-star"></i>
                </li>
                <li className="rated">
                  <i className="fa fa-star"></i>
                </li>
                <li className="rated">
                  <i className="fa fa-star"></i>
                </li>
                <li className="rated">
                  <i className="fa fa-star"></i>
                </li>
                <li className="rated">
                  <i className="fa fa-star"></i>
                </li>
              </ul>
              <span>4.6 out of 5</span>
            </div>
          </div>
        </div>
        <div className="d-block d-md-none">
          <ReviewSlider />
        </div>
        <div className="d-none d-md-block d-xl-none">
          <div className="reviewContainer">
            {tabletReviews.map((item, index) => (
              <ReviewCard
                {...item}
                key={index}
                style={
                  [2].includes(index)
                    ? { marginTop: "-70px" }
                    : index === 3
                    ? { marginTop: "25px" }
                    : {}
                }
              />
            ))}
          </div>
        </div>
        <div className="d-none d-xl-block">
          <div className="reviewContainer">
            {reviews.map((item, index) => (
              <ReviewCard
                {...item}
                key={index}
                style={{ marginTop: item?.margin }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
