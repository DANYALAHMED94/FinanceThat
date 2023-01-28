/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { memo } from "react";
import { Link } from "react-router-dom";
import Select from "react-select";
import { Scrollbars } from "react-custom-scrollbars";
import { useSelector } from "react-redux";
import $ from "jquery";
import { history } from "../../../_helpers";

const MoreFilter = (props) => {
  const reduxState = useSelector((state) => {
    return {
      removeLoaderMake: state.adPostReducers.addPostReducer.removeLoaderMake,
      removeLoaderModel: state.homeReducer.removeLoaderModel,
    };
  });
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    props.chnageStateValue(name, value);
  };
  const toTitleCase = (str) => {
    return str.toLowerCase().replace(/(?:^|[\s-/])\w/g, function (match) {
      return match.toUpperCase();
    });
  };
  const toggleGoogleMap = () => {
    window.$("#googleMapModelHome").modal("show");
  };
  const handleChangeSelect = (e, inputName, filterId, filterName) => {
    props.changeMoreFilterValues(e, inputName, filterId, filterName);
  };
  const handleChangeSelectColor = (e, inputName, filterId, filterName) => {
    props.changeColor(e, inputName, filterId);
  };
  const handleChangeSelectVehicle = (e, inputName, filterId, filterName) => {
    props.changeMoreFilterValues(e, inputName, filterId, filterName);
  };
  const handleChangeSelectDate = (e, inputName, formName) => {
    props.ChangeDate(e, inputName, formName);
  };
  const formatOptionLabel = ({ value, label, colorName }) => (
    <div className="colors-manu">
      <span className={colorName}></span>
      {label}
    </div>
  );
  const mobileMoreFilter = () => {
    $("body").css({ overflow: "" });
    props.changeShowMore();
  };
  const changeMobileModel = () => {
    $("body").css({ overflow: "overlay" });
    mobileMoreFilter();
    toggleGoogleMap();
  };
  const onClickMobileSearch = () => {
    $("body").css({ overflow: "overlay" });
  };
  const data = {
    location: props.location,
    search: props.search,
    categoryFilterName: props.categoryFilterName,
    color: props.vehicleColor ? props.vehicleColor : "",
    fromKilometer:
      props.maxKm !== null && props.maxKm !== ""
        ? props.maxKm.toLocaleString("en-US")
        : "",
    fromRange: props.maxPrice,
    fromYear: props.vehicleYear,
    toYear: props.toYear,
    makeFilterName: props.makeFilterName ? props.makeFilterName : "",
    modalFilterName: props.modelFilterName ? props.modelFilterName : "",
    category: props.categoryFilter,
    latitude: props.latitude,
    longitude: props.longitude,
    vehicleModel: props.modelFilter ? props.modelFilter : "",
    vehicleMake: props.makeFilter ? props.makeFilter : "",
    distance: props.distance,
  };
  return (
    <>
      <section className="SectionBanner">
        <div className="banner-filters-content-main">
          <div className="banner-filters-content-inner">
            <div className="col-md-12 col-sm-12 col-12">
              <div className="NavBanner-Head">
                <h1>
                  Buy and sell used vehicles
                  <br /> with instant online financing!
                </h1>
              </div>
            </div>
            <div className="centerFlex">
              <div className="bannerButtons">
                <button onClick={() => history.push("/Ad-post/list")}>
                  Browse All Vehicles
                </button>
                <span className="text"> or </span>
                <button onClick={() => history.push("/in-application/1")}>
                  Get Financing
                </button>
              </div>
            </div>

            <div className="LeftMenu-Container morefilter-mobile-view">
              <div class="mobilesearch" onClick={mobileMoreFilter}>
                <div class="cross-list-mobile-two"></div>
              </div>

              <div className="morefilter-inner-mobile">
                <div className="accordion" id="accordionExample">
                  <div className="card">
                    <div className="card-header" id="headingTwo">
                      <h2 className="mb-0">
                        <button
                          className="btn btn-link btn-block text-left collapsed"
                          type="button"
                          data-toggle="collapse"
                          data-target="#collapseTwo"
                          aria-expanded="true"
                          aria-controls="collapseOne"
                        >
                          All Categories
                        </button>
                      </h2>
                    </div>

                    <div
                      id="collapseTwo"
                      className="collapse"
                      aria-labelledby="headingTwo"
                      data-parent="#accordionExample"
                    >
                      <div className="card-body">
                        <div
                          className={
                            "filter-two-col filters-vehicle-type clearfix show"
                          }
                        >
                          <React.Fragment>
                            {(props.type_of_vehicle || []).map(
                              (item, index) => (
                                <div
                                  className="filters-inner-col"
                                  onClick={() =>
                                    handleChangeSelectVehicle(
                                      { value: item.id, label: item.name },
                                      "vehicleCategory",
                                      "categoryFilter",
                                      "categoryFilterName"
                                    )
                                  }
                                  key={index}
                                >
                                  <div
                                    title={item.name}
                                    className={
                                      props.categoryFilterName === item.name
                                        ? "vehicle-type-box active"
                                        : "vehicle-type-box"
                                    }
                                  >
                                    <div className="vehicle-type-image">
                                      <img
                                        src={item.image_path}
                                        alt={item.name}
                                      />
                                    </div>
                                    <div className="vehicle-type-description">
                                      <strong>
                                        <span>({item.vt_count})</span>
                                      </strong>
                                    </div>
                                  </div>
                                </div>
                              )
                            )}
                          </React.Fragment>
                          <div
                            className={
                              props.allCategory === true
                                ? "filters-inner-col active"
                                : "filters-inner-col"
                            }
                            onClick={() =>
                              props.selectAll("categoryFilterName")
                            }
                          >
                            <div
                              title={"View All"}
                              className="vehicle-type-box"
                            >
                              <div className="vehicle-type-image">{ }</div>
                              <div className="vehicle-type-description">
                                <strong>{"View All"}</strong>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="card">
                    <div className="card-header" id="headingthree">
                      <h2 className="mb-0">
                        <button
                          className="btn btn-link btn-block text-left collapsed"
                          type="button"
                          data-toggle="collapse"
                          data-target="#collapsethree"
                          aria-expanded="true"
                          aria-controls="collapseOne"
                        >
                          Year
                        </button>
                      </h2>
                    </div>

                    <div
                      id="collapsethree"
                      className="collapse"
                      aria-labelledby="headingthree"
                      data-parent="#accordionExample"
                    >
                      <div className="card-body">
                        <div className={"filter-two-col"}>
                          <React.Fragment>
                            <div className="filters-inner-col">
                              <label>From</label>
                              <Select
                                isSearchable={false}
                                className="banner-react-select-main"
                                classNamePrefix="banner-react-select"
                                closeMenuOnSelect
                                options={props.fromYearDropDown}
                                required
                                name="selectedToYear"
                                value={props.selectedToYear}
                                onChange={(e) =>
                                  handleChangeSelectDate(
                                    e,
                                    "selectedToYear",
                                    "toYear"
                                  )
                                }
                              // onChange={(e) => handleChangeSelectDate(e, 'yearFilter', 'vehicleYear')}
                              />
                            </div>
                            <div className="filters-inner-col">
                              <label>To</label>
                              <Select
                                isSearchable={false}
                                className="banner-react-select-main"
                                classNamePrefix="banner-react-select"
                                closeMenuOnSelect
                                options={props.yearsDropDown}
                                required
                                name="yearFilter"
                                value={props.yearFilter}
                                onChange={(e) =>
                                  handleChangeSelectDate(
                                    e,
                                    "yearFilter",
                                    "vehicleYear"
                                  )
                                }
                              />
                            </div>
                          </React.Fragment>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="card">
                    <div className="card-header" id="headingfour">
                      <h2 className="mb-0">
                        <button
                          className="btn btn-link btn-block text-left collapsed"
                          type="button"
                          data-toggle="collapse"
                          data-target="#collapsefour"
                          aria-expanded="true"
                          aria-controls="collapseOne"
                        >
                          Make
                        </button>
                      </h2>
                    </div>

                    <div
                      id="collapsefour"
                      className="collapse"
                      aria-labelledby="headingfour"
                      data-parent="#accordionExample"
                    >
                      <div className="card-body">
                        {reduxState.removeLoaderMake === false ? (
                          <div className="filters-preloader">
                            <div className="spinner"></div>
                          </div>
                        ) : null}
                        <Scrollbars
                          autoHeight
                          autoHeightMin="100%"
                          autoHeightMax="374px"
                          className="MakeMenu-List filters-list"
                        >
                          {/* <h1>POPULAR MAKES</h1> */}
                          <ul>
                            {(props.vehicle_makes || []).length > 0 ? (
                              <li
                                onClick={() =>
                                  props.selectAll("makeFilterName")
                                }
                                className={
                                  props.allMake === true ? "active" : ""
                                }
                              >
                                <a>
                                  <span className="bullet"></span>
                                  {"All Makes"}
                                  {(props.vehicle_make || []) !== undefined &&
                                    (props.vehicle_make || []) !== null &&
                                    (props.vehicle_make || []).length > 0 ? (
                                    (props.vehicle_make || [])[0] !==
                                      undefined &&
                                      (props.vehicle_make || [])[0] !== null ? (
                                      (props.vehicle_make || [])[0]
                                        .total_makes !== undefined &&
                                        (props.vehicle_make || [])[0]
                                          .total_makes !== null &&
                                        Number(
                                          (props.vehicle_make || [])[0]
                                            .total_makes
                                        ) !== 0 ? (
                                        <span>
                                          (
                                          {
                                            (props.vehicle_make || [])[0]
                                              .total_makes
                                          }
                                          )
                                        </span>
                                      ) : (
                                        <span>(0)</span>
                                      )
                                    ) : (
                                      <span></span>
                                    )
                                  ) : (
                                    <span></span>
                                  )}
                                </a>
                              </li>
                            ) : null}
                            {(props.vehicle_makes || []).map((item, index) => {
                              return (
                                <li
                                  key={index}
                                  onClick={() =>
                                    handleChangeSelectVehicle(
                                      {
                                        value: item.value,
                                        label: item.label,
                                        name: item.name,
                                        mk_count: item.mk_count,
                                      },
                                      "vehicleMake",
                                      "makeFilter",
                                      "makeFilterName"
                                    )
                                  }
                                  className={
                                    Number(props.makeFilter) ===
                                      Number(item.value)
                                      ? "active"
                                      : ""
                                  }
                                >
                                  <a>
                                    <span className="bullet"></span>
                                    {item.label !== undefined &&
                                      item.label !== null
                                      ? toTitleCase(item.label)
                                      : ""}
                                    {item.mk_count !== undefined &&
                                      item.mk_count !== null &&
                                      Number(item.mk_count) !== 0 ? (
                                      <span>({item.mk_count})</span>
                                    ) : (
                                      <span>(0)</span>
                                    )}
                                  </a>
                                </li>
                              );
                            })}
                          </ul>
                        </Scrollbars>
                      </div>
                    </div>
                  </div>

                  <div className="card">
                    <div className="card-header" id="headingfive">
                      <h2 className="mb-0">
                        <button
                          className="btn btn-link btn-block text-left collapsed"
                          type="button"
                          data-toggle="collapse"
                          data-target="#collapsefive"
                          aria-expanded="true"
                          aria-controls="collapseOne"
                        >
                          Model
                        </button>
                      </h2>
                    </div>

                    <div
                      id="collapsefive"
                      className="collapse"
                      aria-labelledby="headingfive"
                      data-parent="#accordionExample"
                    >
                      <div className="card-body">
                        {reduxState.removeLoaderModel === false ? (
                          <div className="filters-preloader">
                            <div className="spinner"></div>
                          </div>
                        ) : null}
                        <Scrollbars
                          autoHeight
                          autoHeightMin="100%"
                          autoHeightMax="374px"
                          className="model-List filters-list"
                        >
                          <ul>
                            {(props.vehicleModelOptions || []).length > 0 ? (
                              <li
                                onClick={() =>
                                  props.selectAll("modelFilterName")
                                }
                                className={
                                  props.allModels === true ? "active" : ""
                                }
                              >
                                <a>
                                  <span className="bullet"></span>
                                  All
                                </a>
                              </li>
                            ) : null}
                            {(props.vehicleModelOptions || []).map(
                              (item, index) => {
                                return (
                                  <li
                                    key={index}
                                    onClick={() =>
                                      handleChangeSelectVehicle(
                                        {
                                          value: item.value,
                                          label: item.label,
                                          name: item.name,
                                          md_count: item.md_count,
                                        },
                                        "vehicleModel",
                                        "modelFilter",
                                        "modelFilterName"
                                      )
                                    }
                                    className={
                                      Number(props.modelFilter) ===
                                        Number(item.value)
                                        ? "active"
                                        : ""
                                    }
                                  >
                                    <a>
                                      <span className="bullet"></span>
                                      {item.label !== undefined &&
                                        item.label !== null
                                        ? toTitleCase(item.label)
                                        : ""}
                                      {item.md_count !== undefined &&
                                        item.md_count !== null &&
                                        Number(item.md_count) !== 0 ? (
                                        <span>({item.md_count})</span>
                                      ) : (
                                        <span>(0)</span>
                                      )}
                                    </a>
                                  </li>
                                );
                              }
                            )}
                          </ul>
                        </Scrollbars>
                      </div>
                    </div>
                  </div>

                  <div className="card">
                    <div className="card-header" id="headingsix">
                      <h2 className="mb-0">
                        <button
                          className="btn btn-link btn-block text-left collapsed"
                          type="button"
                          data-toggle="collapse"
                          data-target="#collapsesix"
                          aria-expanded="true"
                          aria-controls="collapseOne"
                        >
                          Color
                        </button>
                      </h2>
                    </div>

                    <div
                      id="collapsesix"
                      className="collapse"
                      aria-labelledby="headingsix"
                      data-parent="#accordionExample"
                    >
                      <div className="card-body">
                        <Scrollbars
                          autoHeight
                          autoHeightMin="100%"
                          autoHeightMax="374px"
                          className="MakeMenu-List filters-list"
                        >
                          {/* <h1>POPULAR MAKES</h1> */}
                          <ul>
                            {(props.colors || []).length > 0 ? (
                              <li
                                onClick={() => props.selectAll("vehicleColor")}
                                className={
                                  props.allColor === true ? "active" : ""
                                }
                              >
                                <a>
                                  <span className="bullet"></span>
                                  {"All Color"}
                                </a>
                              </li>
                            ) : null}
                            {(props.colors || []).map((item, index) => {
                              return (
                                <li
                                  key={index}
                                  onClick={() =>
                                    handleChangeSelectVehicle(
                                      {
                                        value: item.value,
                                        label: item.label,
                                        colorName: item.colorName,
                                      },
                                      "color",
                                      "vehicleColor",
                                      "vehicleColor"
                                    )
                                  }
                                  className={
                                    props.vehicleColor === item.value
                                      ? "active"
                                      : ""
                                  }
                                >
                                  <a>
                                    <span className="bullet"></span>
                                    {item.label !== undefined &&
                                      item.label !== null
                                      ? toTitleCase(item.label)
                                      : ""}
                                  </a>
                                </li>
                              );
                            })}
                          </ul>
                        </Scrollbars>
                      </div>
                    </div>
                  </div>

                  <div
                    className="mobile-location-input"
                    onClick={changeMobileModel}
                  >
                    <label>Search by location</label>
                    <input
                      type="text"
                      id="location1"
                      name="location"
                      placeholder="Start typing your address here"
                      value={
                        props.location !== undefined &&
                          props.location !== null &&
                          props.location !== ""
                          ? props.location
                          : ""
                      }
                      disabled
                      style={{ cursor: "pointer" }}
                    />
                    <i className="icon-subtract-icon"></i>
                  </div>

                  <div className="mobile-location-input">
                    <Link
                      to={{
                        pathname: "/Ad-post/list",
                        query: data,
                      }}
                      id="searchHomeButton"
                      onClick={onClickMobileSearch}
                    >
                      <button type="button">Search</button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="SearchFilter-Container more-filters clearfix">
              <div className="showless-filter" onClick={props.changeShowMore}>
                <a role="button">
                  Show less Filters <i className="fa fa-angle-up"></i>
                </a>
              </div>

              <div className="hm-filters-row border-row clearfix">
                <div className="hm-filters-col all-categories">
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
                      handleChangeSelectVehicle(
                        e,
                        "vehicleCategory",
                        "categoryFilter",
                        "categoryFilterName"
                      )
                    }
                  />
                </div>

                <div className="hm-filters-col year">
                  <div className="indexfilter-form">
                    <Select
                      placeholder="Year"
                      isSearchable={false}
                      className="banner-react-select-main"
                      classNamePrefix="banner-react-select"
                      closeMenuOnSelect
                      options={props.yearsDropDown}
                      required
                      name="yearFilter"
                      value={props.yearFilter}
                      onChange={(e) =>
                        handleChangeSelect(e, "yearFilter", "vehicleYear", "")
                      }
                    />
                  </div>
                </div>

                <div className="hm-filters-col makes">
                  <div className="indexfilter-form">
                    <Select
                      placeholder="All Makes"
                      isSearchable={false}
                      className="banner-react-select-main"
                      classNamePrefix="banner-react-select"
                      closeMenuOnSelect
                      options={props.vehicleMakeOptions}
                      required
                      name="vehicleMake"
                      value={props.vehicleMake}
                      onChange={(e) =>
                        handleChangeSelect(
                          e,
                          "vehicleMake",
                          "makeFilter",
                          "makeFilterName"
                        )
                      }
                    />
                  </div>
                </div>

                <div className="hm-filters-col models">
                  <div className="modalfilter-form">
                    <Select
                      placeholder="All Model"
                      isSearchable={false}
                      className="banner-react-select-main"
                      classNamePrefix="banner-react-select"
                      closeMenuOnSelect
                      options={props.vehicleModelOptions}
                      required
                      name="vehicleModel"
                      value={props.vehicleModel}
                      onChange={(e) =>
                        handleChangeSelect(
                          e,
                          "vehicleModel",
                          "modelFilter",
                          "modelFilterName"
                        )
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="hm-filters-row clearfix">
                <div className="hm-filters-col max-price">
                  <div className="MaxPrice-form">
                    <input
                      type="text"
                      id="maxPrice"
                      name="maxPrice"
                      value={props.maxPrice}
                      placeholder="Max Price"
                      onChange={handleOnChange}
                    />
                    <img src="assets/image/filters-max-price-icon.svg" alt="" />
                  </div>
                </div>

                <div className="hm-filters-col max-km">
                  <div className="MaxPrice-form">
                    <input
                      type="text"
                      id="maxKm"
                      name="maxKm"
                      placeholder="Max KM"
                      value={props.maxKm}
                      onChange={handleOnChange}
                    />
                    <img src="assets/image/filters-max-km-icon.svg" alt="" />
                  </div>
                </div>

                <div className="hm-filters-col colors">
                  <Select
                    placeholder="Color"
                    isSearchable={false}
                    formatOptionLabel={formatOptionLabel}
                    className="banner-react-select-main"
                    classNamePrefix="banner-react-select"
                    closeMenuOnSelect
                    options={props.colors}
                    required
                    value={props.color}
                    onChange={(e) =>
                      handleChangeSelectColor(
                        e,
                        "color",
                        "vehicleColor",
                        "colors"
                      )
                    }
                  />
                </div>

                <div className="hm-filters-col location">
                  <div className="filteradd-location" onClick={toggleGoogleMap}>
                    <i className="icon-subtract-icon"></i>
                    <input
                      type="text"
                      id="location"
                      name="location"
                      placeholder="Add Location"
                      onChange={handleOnChange}
                      value={
                        props.location !== undefined &&
                          props.location !== null &&
                          props.location !== ""
                          ? props.location
                          : ""
                      }
                      disabled
                      style={{ cursor: "pointer" }}
                    />
                  </div>

                  <div className="filteradd-location SearchBtn">
                    <Link
                      to={{
                        pathname: "/Ad-post/list",
                        query: data,
                      }}
                      id="searchHomeButton"
                    >
                      <button type="button">Search</button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default memo(MoreFilter);
