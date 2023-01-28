import React, { Component } from "react";
import OwlCarousel from "react-owl-carousel2";
import { Link } from "react-router-dom";
import { API_URL } from "../../constant";
import { connect } from "react-redux";
import { toastr } from "react-redux-toastr";
import { capitalize, capsProvince } from "./../../_helpers/capitalize";

import {
  saved_ad_post_top_add,
  un_saved_ad_post_top_add,
} from "../../actions/listPostActions";
import GridPostPlaceHolder from "../../components/placeHolder/GridPostPlaceHolder";
class TopAdPost extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  handleSavedAd = (ad_id, status) => {
    const data = {
      user_id: this.props.user_id,
      ad_id: ad_id,
    };
    if (
      this.props.user_id == undefined ||
      this.props.user_id == null ||
      this.props.user_id == ""
    ) {
      toastr.error("Error", "User Have To Login First");
      return false;
    }
    if (status == false) {
      this.props.saved_ad_post_top_add(data);
    } else {
      this.props.un_saved_ad_post_top_add(data);
    }
  };
  render() {
    return (
      <React.Fragment>
        {/* <div className="right-grid-view-main top-ads pb-0"> */}
        <div className="grid-view-top-col">
          <div className="ResultHead top-ads-head clearfix">
            <h3>Top Ads</h3>
          </div>
        </div>
        {/* <div className="top-ads clearfix"> */}
        <div className="clearfix">
          {this.props.top_ads_loading === false ? (
            (this.props.top_ads || []).map((item, index) => (
              <React.Fragment key={index}>
                <div className="search-grid-col">
                  <div className="ProdThum-Service">
                    <div
                      className="IconBadge"
                      onClick={() =>
                        this.handleSavedAd(
                          item.id,
                          item.saved_ad == undefined || item.saved_ad == false
                            ? false
                            : true
                        )
                      }
                    >
                      {this.props.loading_saved_ad &&
                      Number(item.id) === Number(this.props.grid_ad_id) ? (
                        <i
                          class="fa fa-circle-o-notch fa-spin"
                          aria-hidden="true"
                        ></i>
                      ) : (
                        <i
                          className={
                            item.saved_ad == undefined || item.saved_ad == false
                              ? "fa fa-heart-o"
                              : "fa fa-heart-o active"
                          }
                        ></i>
                      )}
                      {/* <i className={item.saved_ad == undefined || item.saved_ad == false ? "fa fa-heart-o" : "fa fa-heart-o active"}></i> */}
                    </div>
                    {/* <Link to={{ pathname: `/ad-post/detail/${item.stock_id}`, state: { prevPath: this.props.location.pathname } }}> */}
                    <div
                      onClick={() => this.props.openModal(item.stock_id)}
                      className="pointer"
                    >
                      <h4>
                        {" "}
                        {item.kilometer !== null && item.kilometer !== ""
                          ? item.kilometer.toLocaleString("en-US")
                          : (0).toLocaleString("en-US")}{" "}
                        km
                      </h4>
                      <div className="thumb-image">
                        {(item.images || []).length === 0 ? (
                          <React.Fragment>
                            <img
                              src={"/assets/image/no_image.png"}
                              width="328"
                              height="276"
                              alt="No Image"
                            />
                          </React.Fragment>
                        ) : item.images != undefined && item.images != null ? (
                          item.images[0].image_path !== undefined &&
                          item.images[0].image_path !== null ? (
                            <img
                              src={`${API_URL}/media/${item.images[0].image_path}`}
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "/assets/image/no_image.png";
                              }}
                              width="328"
                              height="276"
                              alt="Image"
                              key={1}
                            />
                          ) : (
                            <img
                              src={"/assets/image/no_image.png"}
                              width="328"
                              height="276"
                              alt="No Image"
                            />
                          )
                        ) : (
                          <img
                            src={"/assets/image/no_image.png"}
                            width="328"
                            height="276"
                            alt="No Image"
                          />
                        )}
                      </div>
                      <div className="image-overlay"></div>

                      <div className="ProdHead">
                        <div className="disc-row">
                          <h2>
                            {item.des_2 !== undefined && item.des_2 !== null
                              ? item.des_2
                              : ""}
                          </h2>
                          <span className="year">
                            {" "}
                            {item.year !== undefined && item.year !== null
                              ? item.year
                              : ""}{" "}
                          </span>
                        </div>
                        <div className="disc-row">
                          <span className="location">
                            <i className="icon-subtract-icon"></i>
                            {item && item.city ? capitalize(item.city) : ""}
                            {item && item.city && item.province ? "," : ""}{" "}
                            {item && item.province ? capsProvince(item.province) : ""}
                          </span>
                          <span className="price-tag">
                            {item.price !== null && item.price !== ""
                              ? new Intl.NumberFormat("en-US", {
                                  style: "currency",
                                  currency: "USD",
                                }).format(item.price) // '$100.00'
                              : new Intl.NumberFormat("en-US", {
                                  style: "currency",
                                  currency: "USD",
                                }).format(0)}
                          </span>
                        </div>
                      </div>
                    </div>
                    {/* </Link> */}
                  </div>
                </div>
              </React.Fragment>
            ))
          ) : (
            <>
              <GridPostPlaceHolder />
              <GridPostPlaceHolder />
              <GridPostPlaceHolder />
              <GridPostPlaceHolder />
              <GridPostPlaceHolder />
              <GridPostPlaceHolder />
              <GridPostPlaceHolder />
              <GridPostPlaceHolder />
              <GridPostPlaceHolder />
            </>
          )}
        </div>
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    user_id: state.authReducer.authentication.user.user_id,
    loading_saved_ad: state.adPostReducers.listPostReducer.loading_saved_ad,
    grid_ad_id: state.adPostReducers.listPostReducer.grid_ad_id,
  };
};
export default connect(mapStateToProps, {
  saved_ad_post_top_add,
  un_saved_ad_post_top_add,
})(TopAdPost);
