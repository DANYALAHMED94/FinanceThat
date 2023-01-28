/* eslint-disable jsx-a11y/no-redundant-roles */
import React, { useEffect, memo } from "react";
import { Link } from "react-router-dom";
import Select from "react-select";
import $ from "jquery";
import { history } from "../../../_helpers/history";
const Banner = (props) => {
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    props.chnageStateValue(name, value);
  };
  useEffect(() => {
    if (props.categoryFilter) {
      const categoryName =
        props.categoryFilter !== ""
          ? (props.type_of_vehicle || [])
            .filter((item) => item.id == props.categoryFilter)
            .map((item) => {
              return item.name;
            })[0] == undefined
            ? ""
            : (props.type_of_vehicle || [])
              .filter((item) => item.id == props.categoryFilter)
              .map((item) => {
                return item.name;
              })[0]
          : "";
      props.chnageStateValue("categoryFilterName", categoryName);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.categoryFilter]);

  const toggleGoogleMap = () => {
    window.$("#googleMapModelHome").modal("show");
  };
  const handleChangeSelect = (e, inputName, filterId, filterName) => {
    props.changeSelectBanner(inputName, filterId, e);
  };
  const mobileMoreFilter = () => {
    $("body").css({ overflow: "hidden" });
    props.changeShowMore();
  };

  return (
    <>
      <section className="SectionBanner first-banner">
        <div className="banner-filters-content-main">
          <div className="banner-filters-content-inner">
            <div className="NavBanner-Head">
              <h1>
                Buy and sell used vehicles
                <br /> with instant online financing!
              </h1>
            </div>
            <div className="centerFlex">
              <div className="bannerButtons">
                <button onClick={() => history.push("/Ad-post/list")}>
                  Browse All Vehicles
                </button>
                <span className="text"> or </span>
                <button onClick={() => history.push("/applynow/1")}>
                  Get Financing
                </button>
              </div>
            </div>

            <div className="MobileSearch">
              <input
                type="text"
                id="search1"
                name="search"
                placeholder="Search by make, model or keyword"
                value={props.search}
                onChange={handleOnChange}
              />
              <Link
                to={{
                  pathname: "/Ad-post/list",
                  query: {
                    location: props.location,
                    search: props.search,
                    latitude: props.latitude,
                    longitude: props.longitude,
                    distance: props.distance,
                  },
                }}
              >
                <img
                  src="/assets/image/search-icon-responsive.svg"
                  alt="search-icon-responsive"
                />
              </Link>

              <div className="ShowFilter-Head">
                <button role="button" onClick={mobileMoreFilter}>
                  Show More Filters <i className="icon-arrow-down"></i>
                </button>
              </div>
            </div>

            <div className="SearchFilter-Container clearfix">
              <div className="SearchFilter-form search">
                <input
                  type="text"
                  id="search"
                  name="search"
                  value={props.search}
                  onChange={handleOnChange}
                  placeholder="Search by make, model or keyword"
                />
              </div>

              <div className="SearchFilter-form categories">
                <Select
                  placeholder="All Categories"
                  isSearchable={false}
                  className="banner-react-select-main"
                  classNamePrefix="banner-react-select"
                  closeMenuOnSelect
                  options={props.vehicleOptions}
                  required
                  name="vehicleCategory"
                  value={props.vehicleCategory}
                  onChange={(e) =>
                    handleChangeSelect(
                      e,
                      "vehicleCategory",
                      "categoryFilter",
                      "categoryFilterName"
                    )
                  }
                />
              </div>

              <div
                className="AddLocation-Form location"
                onClick={toggleGoogleMap}
              >
                <i className="icon-subtract-icon"></i>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={
                    props.location !== undefined &&
                      props.location !== null &&
                      props.location !== ""
                      ? props.location
                      : ""
                  }
                  onChange={handleOnChange}
                  placeholder="Add Location"
                  disabled
                  style={{ cursor: "pointer" }}
                />
              </div>
              <Link
                to={{
                  pathname: "/Ad-post/list",
                  query: {
                    location: props.location,
                    search: props.search,
                    category: props.categoryFilter,
                    categoryFilterName: props.categoryFilterName,
                    latitude: props.latitude,
                    longitude: props.longitude,
                    fromKilometer:
                      props.maxKm !== null && props.maxKm !== ""
                        ? props.maxKm.toLocaleString("en-US")
                        : "",
                    distance: props.distance,
                  },
                }}
                className="btn btn-primary"
                id="searchHomeButton"
              >
                Search
              </Link>
              <div className="ShowFilter-Head">
                <button role="button" onClick={props.changeShowMore}>
                  Show More Filters <i className="icon-arrow-down"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="ft__heroBannerWrapper div__margin">
                <div className="row">
                  <div className="col-md-6 order-2 order-md-1">
                    <div className="ft__bannerDescriptionWrapper">
                    <img src='/public/assets/p-img/icon-emergency-expenses.svg' alt=''/>
                        <h1 style={{fontFamily:"BasisGrotesquePro-Black,sans-serif",color: "#3F2355"}}>Personal loans<br/>up to $20,000</h1>
                        <h4 style={{fontFamily:"BasisGrotesquePro-Medium", fontSize:"30px"}}>We offer personal loans that range from $500 up to $20,000.</h4>
                        <p style={{fontFamily: "basis_grotesque_proregular"}}>We offer personalized products and affordable payment plans. We work with our customers to
                            find a plan that best suits their needs and budget with terms up to 84 months</p>
                            <Link to="/personal-loans/1"><button className="primaryButton continueBtn" style={{fontfamily: "basis_grotesque_probold", height:"80px",maxWidth:"300px",padding:"19px 50px 19px 25px", textAlign: "center",fontSize:"22px"}}>
    <span></span> <span>  Get Started</span>
    <img style={{position:"absolute",marginTop:"3px",marginLeft:"44px",width:"28px"}} src="/assets/p-img/icon-arrow-right.svg" alt=""/>
  </button></Link>
                    </div>
                </div>
                <div className="col-md-6 order-1 order-md-2">
                   <div className="ft__infoBannerInfographWrap">
                   <img src='/assets/p-img/hero-banner-image.png' alt=''/>
                    </div>
                </div>
            </div>

        </section>
    </>
  );
};

export default memo(Banner);
