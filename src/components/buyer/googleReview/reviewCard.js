import React from "react";

function ReviewCard({ message, name, type, style }) {
  return (
    <div className="reviewCard" style={style}>
      <div className="message">{message}</div>
      <div className="title">{name}</div>
      <div className="greyText">{type}</div>
      <div className="rating">
        <i className="fa fa-star"></i>
        <i className="fa fa-star"></i>
        <i className="fa fa-star"></i>
        <i className="fa fa-star"></i>
        <i className="fa fa-star"></i>
      </div>
    </div>
  );
}

export default ReviewCard;
