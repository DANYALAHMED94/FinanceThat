import React, { Component } from "react";
import Select, { components } from "react-select";
import { Scrollbars } from "react-custom-scrollbars";
import NumberFormat from "react-number-format";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import MaskedInput from "react-text-mask";
import { Link } from "react-router-dom";
import $ from "jquery";
class AssetDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      screenName: "assets-detail",
    };
    $("#assets-detail").removeClass("tabDeactive");
  }
  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.updateAssetsDetail !== this.props.updateAssetsDetail &&
      this.props.updateAssetsDetail !== undefined
    ) {
      this.props.onClickChangeStep(4);
      this.props.history.push(`${this.props.url}/additional-item`);
    }
  }

  update_assets_detail = () => {
    const data = {
      id: this.props.buyerAppId,
      vehicle: this.props.assetsDetails.map((item) => {
        if (item.id === "") {
          return {
            type_of_vehicle: item.vehicleType,
            year: item.year,
            make: item.make,
            model: item.model,
            trim: item.trim,
            kilometer:
              item.kilometer === ""
                ? 0
                : item.kilometer.toString().split(",").join(""),
            vin: item.vin,
            price:
              item.price === ""
                ? 0
                : item.price.toString().split(",").join("").split("$").join(""),
            condition: item.condition,
            stock: item.stockNumber,
            is_updated: item.is_updated,
          };
        } else {
          return {
            id: item.id,
            type_of_vehicle: item.vehicleType,
            year: item.year,
            make: item.make,
            model: item.model,
            trim: item.trim,
            kilometer:
              item.kilometer === ""
                ? 0
                : item.kilometer.toString().split(",").join(""),
            vin: item.vin,
            price:
              item.price === ""
                ? 0
                : item.price.toString().split(",").join("").split("$").join(""),
            condition: item.condition,
            stock: item.stockNumber,
            is_updated: item.is_updated,
          };
        }
      }),
      additional_item: [],
    };
    console.log(data);
    this.props.update_application_detail(data, "updateAssetsDetail");
  };
  onBack = () => {
    if (this.props.coApplicant === true) {
      this.props.onClickChangeStep(2);
      this.props.history.push(`${this.props.url}/co-applicant`);
    } else {
      this.props.onClickChangeStep(1);
      this.props.history.push(`${this.props.url}/applicant-detail`);
    }
  };
  render() {
    const { Option } = components;

    const renderScrollbar = (props) => {
      return (
        <div style={{ height: 260 }}>
          <Scrollbars>{props.children}</Scrollbars>
        </div>
      );
    };
    const renderScrollbarCondition = (props) => {
      return (
        <div style={{ height: 100 }}>
          <Scrollbars>{props.children}</Scrollbars>
        </div>
      );
    };
    const renderOption = (props) => {
      return (
        <Option {...props}>
          <div>{props.data.label}</div>
        </Option>
      );
    };
    let first = this.props.applicantFirstName
      ? this.props.applicantFirstName.split(" ")[0]
      : "";
    let last = this.props.applicantLastName
      ? this.props.applicantLastName.split(" ")[0]
      : "";
    first = first ? first.charAt(0).toUpperCase() : "";
    last = last ? last.charAt(0).toUpperCase() : "";
    return (
      <React.Fragment>
        <div className="app-form-content">
          <div className="app-form-content-inner">
            <div className="admin-form-head">
              <div className="admin-form-head-inner">
                <span
                  style={{
                    backgroundImage: "url(assets/image/avatar-image.png)",
                  }}
                  className="avatar"
                >
                  {" "}
                  {`${first}${last}`}
                </span>
                <strong className="title d-inline-block">
                  {" "}
                  {`${
                    this.props.applicantFirstName != undefined &&
                    this.props.applicantFirstName != null
                      ? this.props.applicantFirstName || ""
                      : ""
                  } ${
                    this.props.applicantLastName != undefined &&
                    this.props.applicantLastName != null
                      ? this.props.applicantLastName || ""
                      : ""
                  }`}{" "}
                </strong>{" "}
                <span className="type d-inline-block"> Automotive </span>
                <p>
                  {" "}
                  <span className=""> Automotive </span>{" "}
                </p>
              </div>
            </div>
            {/* <ul className="nav nav-tabs-2 three-items" id="formAppTabs" role="tablist">
                        <li className="nav-item" onClick={() => this.changeScreen('assets-detail')}>
                            <a className={this.state.screenName === 'assets-detail' ? "nav-link active" : "nav-link"} id="assets-detail-tab" data-toggle="tab" href="#assets-detail" role="tab" aria-controls="assets-detail" aria-selected={this.state.screenName === 'assets-detail' ? "true" : "false"}> <span className="tabs-text assets-detail"> Asset Detail </span> </a>
                        </li>
                        <li className="nav-item" onClick={() => this.changeScreen('seller-information')}>
                            <a className={this.state.screenName === 'seller-information' ? "nav-link active" : "nav-link"} id="seller-information-tab" data-toggle="tab" href="#seller-information" role="tab" aria-controls="seller-information" aria-selected={this.state.screenName === 'assets-detail' ? "true" : "false"}><span className="tabs-text seller-information"> Seller information </span> </a>
                        </li>
                        <li className="nav-item" onClick={() => this.changeScreen('additional-information')}>
                            <a className={this.state.screenName === 'additional-information' ? "nav-link active" : "nav-link"} id="additional-information-tab" data-toggle="tab" href="#additional-information" role="tab" aria-controls="additional-information" aria-selected={this.state.screenName === 'assets-detail' ? "true" : "false"}><span className="tabs-text additional-information"> Additional information </span> </a>
                        </li>
                    </ul> */}
            <div className="tab-content" id="formAppTabsContent">
              <div
                className="tab-pane fade show active clearfix"
                id="assets-detail"
                role="tabpanel"
                aria-labelledby="assets-detail-tab"
              >
                {this.state.screenName === "assets-detail" ? (
                  <React.Fragment>
                    <div className="forms-head clearfix">
                      <h1> Asset Detail </h1>
                    </div>
                    {(this.props.assetsDetailsForm || []).map((item, index) => (
                      <div className="form-main" key={index}>
                        <div className="form-field-row two-col clearfix">
                          <div className="form-field-col">
                            <label> Type of vehicle </label>
                            <Select
                              placeholder="Search Vehicle"
                              id="selectedVehicle"
                              name="selectedVehicle"
                              value={item.selectedVehicle}
                              onChange={(e) =>
                                this.props.changeSelectAssets(
                                  e,
                                  "vehicleType",
                                  "selectedVehicle",
                                  index
                                )
                              }
                              options={this.props.vehicleOptions}
                              isSearchable
                              isClearable
                              className="react-select-main"
                              classNamePrefix="react-select"
                              components={{
                                Option: renderOption,
                                MenuList: renderScrollbar,
                              }}
                              captureMenuScroll={false}
                            />
                          </div>
                          <div className="form-field-col">
                            <label> Stock Number </label>
                            <NumberFormat
                              required
                              className="form-control"
                              onChange={(e) =>
                                this.props.handleOnChangeAssets(e, index)
                              }
                              value={item.stockNumber}
                              name="stockNumber"
                            />
                            {/* <input type="text" className="form-control" name="" placeholder="5768393" /> */}
                          </div>
                        </div>
                        <div className="form-field-row two-col clearfix">
                          <div className="form-field-col">
                            <label> Year </label>
                            <Select
                              placeholder="Select Year"
                              id="selectedYear"
                              name="selectedYear"
                              value={item.selectedYear}
                              onChange={(e) =>
                                this.props.changeSelectAssets(
                                  e,
                                  "year",
                                  "selectedYear",
                                  index
                                )
                              }
                              options={this.props.yearsDropDown}
                              className="react-select-main"
                              classNamePrefix="react-select"
                              components={{
                                Option: renderOption,
                                MenuList: renderScrollbar,
                              }}
                              captureMenuScroll={false}
                            />
                            {/* <input type="text" className="form-control" name="" placeholder="2020" /> */}
                          </div>
                          <div className="form-field-col">
                            <label> Make </label>
                            <Select
                              placeholder="Search Make"
                              id="selectedMake"
                              name="selectedMake"
                              value={item.selectedMake}
                              onChange={(e) =>
                                this.props.changeSelectAssets(
                                  e,
                                  "make",
                                  "selectedMake",
                                  index
                                )
                              }
                              options={item.vehicleMakes}
                              isSearchable
                              isClearable
                              className="react-select-main"
                              classNamePrefix="react-select"
                              components={{
                                Option: renderOption,
                                MenuList: renderScrollbar,
                              }}
                              captureMenuScroll={false}
                            />
                            {/* <input type="text" className="form-control" name="" placeholder="Honda" /> */}
                          </div>
                        </div>
                        <div className="form-field-row two-col clearfix">
                          <div className="form-field-col">
                            <label> Model </label>
                            <Select
                              placeholder="Search Models"
                              id="selectedModel"
                              name="selectedModel"
                              value={item.selectedModel}
                              onChange={(e) =>
                                this.props.changeSelectAssets(
                                  e,
                                  "model",
                                  "selectedModel",
                                  index
                                )
                              }
                              options={item.vehicleModel}
                              isSearchable
                              isClearable
                              className="react-select-main"
                              classNamePrefix="react-select"
                              components={{
                                Option: renderOption,
                                MenuList: renderScrollbar,
                              }}
                              captureMenuScroll={false}
                            />
                            {/* <input type="text" className="form-control" name="" placeholder="Accord" /> */}
                          </div>
                          <div className="form-field-col">
                            <label> Trim </label>
                            <Select
                              placeholder="Search Trim"
                              id="selectedTrims"
                              name="selectedTrims"
                              value={item.selectedTrims}
                              onChange={(e) =>
                                this.props.changeSelectAssets(
                                  e,
                                  "trim",
                                  "selectedTrims",
                                  index
                                )
                              }
                              options={item.vehicleTrims}
                              isSearchable
                              isClearable
                              className="react-select-main"
                              classNamePrefix="react-select"
                              components={{
                                Option: renderOption,
                                MenuList: renderScrollbar,
                              }}
                              captureMenuScroll={false}
                            />
                            {/* <input type="text" className="form-control" name="" placeholder="New" /> */}
                          </div>
                        </div>
                        <div className="form-field-row two-col clearfix">
                          <div className="form-field-col">
                            <label> KM </label>
                            <NumberFormat
                              className="form-control"
                              value={item.kilometer}
                              decimalScale={2}
                              onChange={(e) =>
                                this.props.handleOnChangeAssets(e, index)
                              }
                              thousandSeparator={true}
                              id="kilometer"
                              name="kilometer"
                              allowNegative={false}
                            />
                            {/* <input type="text" className="form-control km" name="" placeholder="200" /> */}
                          </div>
                          <div className="form-field-col">
                            <label> VIN </label>
                            <input
                              type="text"
                              className="form-control"
                              name="vin"
                              placeholder="Vin"
                              value={item.vin}
                              onChange={(e) =>
                                this.props.handleOnChangeAssets(e, index)
                              }
                              maxLength="17"
                            />
                          </div>
                        </div>
                        <div className="form-field-row two-col clearfix">
                          <div className="form-field-col">
                            <label> Price </label>
                            <NumberFormat
                              className="form-control"
                              value={item.price}
                              decimalScale={2}
                              onChange={(e) =>
                                this.props.handleOnChangeAssets(e, index)
                              }
                              thousandSeparator={true}
                              prefix={"$"}
                              id="price"
                              name="price"
                              allowNegative={false}
                            />
                            {/* <input type="text" className="form-control" name="" placeholder="$68799" /> */}
                          </div>
                          <div className="form-field-col">
                            <label> Condition </label>
                            <Select
                              placeholder="Select Condition"
                              id="selectedCondition"
                              name="selectedCondition"
                              value={item.selectedCondition}
                              onChange={(e) =>
                                this.props.changeSelectAssets(
                                  e,
                                  "condition",
                                  "selectedCondition",
                                  index
                                )
                              }
                              options={this.props.conditions}
                              className="react-select-main"
                              classNamePrefix="react-select"
                              components={{
                                Option: renderOption,
                                MenuList: renderScrollbarCondition,
                              }}
                              captureMenuScroll={false}
                            />
                          </div>
                        </div>
                        <div className="form-field-row two-col clearfix">
                          <div className="cta m-0 clearfix">
                            {item.stockNumber !== undefined &&
                            item.stockNumber !== null &&
                            item.stockNumber !== "" ? (
                              <Link to={`/ad-post/detail/${item.stockNumber}`}>
                                <button className="btn btn-primary float-left active">
                                  {" "}
                                  View listing{" "}
                                </button>
                              </Link>
                            ) : null}
                            {/* <button className="add-another float-right" onClick={this.props.addAssets}> Add Another </button>
                                                {index > 0 ? <button className="add-another float-right" onClick={() => this.props.deleteAsset(index)}><i className="fa fa-trash" aria-hidden="true"></i>
                                                </button> : null} */}
                          </div>
                        </div>
                      </div>
                    ))}
                    <div className="footer-btns-holder clearfix">
                      <button
                        className="btn btn-primary float-left"
                        onClick={this.onBack}
                      >
                        {" "}
                        Back{" "}
                      </button>
                      {this.props.loading_update === true ? (
                        <button className="btn btn-primary float-right active">
                          {" "}
                          <i
                            class="fa fa-circle-o-notch fa-spin"
                            aria-hidden="true"
                          ></i>{" "}
                        </button>
                      ) : (
                        <button
                          className="btn btn-primary float-right active"
                          onClick={this.update_assets_detail}
                        >
                          {" "}
                          Continue{" "}
                        </button>
                      )}
                    </div>
                  </React.Fragment>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default AssetDetail;
