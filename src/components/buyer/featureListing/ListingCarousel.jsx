import React, { useState, memo } from 'react'
import { Link } from "react-router-dom"
import FeatureListingCarsoule from './FeatureListingCarsoule'

const ListingCarousel = (props) => {
    return <>
        {props.dataArray.map((data, index) => {
            return <React.Fragment key={index}> <ListItem data={data} dataIndex={index} props={props} /></React.Fragment>
        })}
    </>
}

const ListItem = ({ data, dataIndex, props })=> {

    const [isLiked, setIsLiked] = useState(data[0] && data[0].saved_ad ? data[0].saved_ad : false)
    const [isLiked2, setIsLiked2] = useState(data[1] && data[1].saved_ad ? data[1].saved_ad : false)
    return (
      <>
        <div className="owl-item" key={dataIndex}>
          <div className="feature-slider-content clearfix">
            <div
              className="image-holder"
              style={{
                width: "100%",
              }}
            >
              {/* <FeatureListingCarsoule images={data[0].images} id={data[0].id} stock_id={data[0].stock_id} /> */}
            </div>
            <div className="text-box">
              <div className="feature-detail-top-row clearfix">
                <span className="info-btn">
                  {data[0].kilometer !== null && data[0].kilometer !== ""
                    ? data[0].kilometer.toLocaleString("en-US")
                    : (0).toLocaleString("en-US")}{" "}
                  km
                </span>
                <i
                  className={
                    !isLiked ? "fa fa-heart-o" : "fa fa-heart-o active"
                  }
                  onClick={() => {
                    setIsLiked(!isLiked);
                    props.toggleSavedAd(data[0].id, isLiked);
                    // props.toggleSavedAd(data[0].id, data[0].saved_ad == undefined || data[0].saved_ad == false ? false : true)
                  }}
                ></i>
              </div>
              <Link
                to={`/ad-post/detail/${data[0].stock_id}`}
                className="title"
              >
                {" "}
                {data[0].des_2 !== undefined && data[0].des_2 !== null
                  ? data[0].des_2 || ""
                  : data[0].des_2}{" "}
              </Link>
              <div className="price-year">
                <Link
                  to={`/ad-post/detail/${data[0].stock_id}`}
                  className="price"
                >
                  {" "}
                  {data[0].price !== null && data[0].price !== ""
                    ? new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                      }).format(Number(data[0].price)) // '$100.00'
                    : new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                      }).format(0)}{" "}
                </Link>
                <Link
                  to={`/ad-post/detail/${data[0].stock_id}`}
                  className="year"
                >
                  {" "}
                  {data[0].year !== undefined && data[0].year !== null
                    ? data[0].year
                    : ""}{" "}
                </Link>
              </div>
              <Link
                to={`/ad-post/detail/${data[0].stock_id}`}
                className="location"
              >
                {data[0] && data[0].city ? data[0].city : ""}
                {data[0] && data[0].city && data[0].province ? "," : ""}{" "}
                {data[0] && data[0].province ? data[0].province : ""}
                {/* {data[0].location !== undefined && data[0].location !== null && data[0].location !== '' ? data[0].location.split(',').slice(-3, -1)[0] + ", " + data[0].location.split(',').slice(-2, -1)[0] : ''}  */}
              </Link>
              <div className="feature-detail-footer">
                <Link
                  to={`/post-application/${data[0].stock_id}`}
                  className="finance-that-logo"
                >
                  {" "}
                  <img src="/assets/image/detail-logo.svg" />{" "}
                </Link>
                <Link
                  to={`/ad-post/detail/${data[0].stock_id}`}
                  className="btn btn-primary"
                >
                  {" "}
                  View Detail{" "}
                </Link>
              </div>
            </div>
          </div>
          {/** Second Listing */}
          {data[1] ? (
            <>
              {" "}
              <div className="feature-slider-content clearfix">
                {" "}
                <div
                  className="image-holder"
                  style={{
                    width: "100%",
                  }}
                >
                  <FeatureListingCarsoule
                    images={data[1].images}
                    id={data[1].id}
                    stock_id={data[1].stock_id}
                  />
                </div>
                <div className="text-box">
                  <div className="feature-detail-top-row clearfix">
                    <span className="info-btn">
                      {data[1].kilometer !== null && data[1].kilometer !== ""
                        ? data[1].kilometer.toLocaleString("en-US")
                        : (0).toLocaleString("en-US")}{" "}
                      km
                    </span>
                    {/* onClick={() => this.handleSavedAd(data[1].id, data[1].saved_ad == undefined || data[1].saved_ad == false ? false : true)} */}
                    {/* <i className={data[1].saved_ad == undefined || data[1].saved_ad == false ? "fa fa-heart-o" : "fa fa-heart-o active"} onClick={() => props.toggleSavedAd(data[1].id, data[1].saved_ad == undefined || data[1].saved_ad == false ? false : true)}></i> */}
                    <i
                      className={
                        !isLiked2 ? "fa fa-heart-o" : "fa fa-heart-o active"
                      }
                      onClick={() => {
                        setIsLiked2(!isLiked2);
                        props.toggleSavedAd(data[1].id, isLiked2);
                      }}
                    ></i>
                  </div>
                  <Link
                    to={`/ad-post/detail/${data[1].stock_id}`}
                    className="title"
                  >
                    {" "}
                    {data[1].des_2 !== undefined && data[1].des_2 !== null
                      ? data[1].des_2 || ""
                      : data[1].des_2}{" "}
                  </Link>
                  <div className="price-year">
                    <Link
                      to={`/ad-post/detail/${data[1].stock_id}`}
                      className="price"
                    >
                      {" "}
                      {data[1].price !== null && data[1].price !== ""
                        ? new Intl.NumberFormat("en-US", {
                            style: "currency",
                            currency: "USD",
                          }).format(Number(data[1].price)) // '$100.00'
                        : new Intl.NumberFormat("en-US", {
                            style: "currency",
                            currency: "USD",
                          }).format(0)}{" "}
                    </Link>
                    <Link
                      to={`/ad-post/detail/${data[1].stock_id}`}
                      className="year"
                    >
                      {" "}
                      {data[1].year !== undefined && data[1].year !== null
                        ? data[1].year
                        : ""}{" "}
                    </Link>
                  </div>
                  <Link
                    to={`/ad-post/detail/${data[1].stock_id}`}
                    className="location"
                  >
                    {data[1] && data[1].city ? data[1].city : ""}
                    {data[1] && data[1].city && data[1].province
                      ? ","
                      : ""}{" "}
                    {data[1] && data[1].province ? data[1].province : ""}
                    {/* {data[1].location !== undefined && data[1].location !== null && data[1].location !== '' ? data[1].location.split(',').slice(-3, -1)[0] + ", " + data[1].location.split(',').slice(-2, -1)[0] : ''}  */}
                  </Link>
                  <div className="feature-detail-footer">
                    <Link
                      to={`/post-application/${data[1].stock_id}`}
                      className="finance-that-logo"
                    >
                      {" "}
                      <img src="/assets/image/detail-logo.svg" />{" "}
                    </Link>
                    <Link
                      to={`/ad-post/detail/${data[1].stock_id}`}
                      className="btn btn-primary"
                    >
                      {" "}
                      View Detail{" "}
                    </Link>
                  </div>
                </div>
              </div>{" "}
            </>
          ) : null}
        </div>
      </>
    );

}

export default memo(ListingCarousel)