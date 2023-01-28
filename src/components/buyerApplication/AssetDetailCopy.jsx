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
    $("#seller-information").addClass("tabDeactive");
    $("#additional-information").addClass("tabDeactive");
  }
  changeScreen = (para) => {
    if (para === "assets-detail") {
      $("#assets-detail").addClass("active");
      $("#assets-detail").addClass("show");
      $("#assets-detail").removeClass("tabDeactive");
      $("#seller-information").addClass("tabDeactive");
      $("#seller-information").removeClass("active");
      $("#seller-information").removeClass("show");
      $("#additional-information").addClass("tabDeactive");
      $("#additional-information").removeClass("active");
      $("#additional-information").removeClass("show");
      // $("#assets-detail").removeClass('tabDeactive')
      // $("#seller-information").addClass('tabDeactive')
      // $("#additional-information").addClass('tabDeactive')
    } else if (para === "seller-information") {
      $("#assets-detail").addClass("tabDeactive");
      $("#assets-detail").removeClass("active");
      $("#assets-detail").removeClass("show");
      $("#seller-information").removeClass("tabDeactive");
      $("#seller-information").addClass("active");
      $("#seller-information").addClass("show");
      $("#additional-information").addClass("tabDeactive");
      $("#additional-information").removeClass("active");
      $("#additional-information").removeClass("show");
      // $("#seller-information").removeClass('tabDeactive')
      // $("#assets-detail").addClass('tabDeactive')
      // $("#additional-information").addClass('tabDeactive')
    } else {
      $("#seller-information").addClass("tabDeactive");
      $("#seller-information").removeClass("active");
      $("#seller-information").removeClass("show");
      $("#assets-detail").addClass("tabDeactive");
      $("#assets-detail").removeClass("active");
      $("#assets-detail").removeClass("show");
      $("#additional-information").removeClass("tabDeactive");
      $("#additional-information").addClass("active");
      $("#additional-information").addClass("show");
      // $("#additional-information").removeClass('tabDeactive')
      // $("#assets-detail").addClass('tabDeactive')
      // $("#seller-information").addClass('tabDeactive')
    }
    this.setState({
      ...this.state,
      screenName: para,
    });
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.updateAssetsDetail !== this.props.updateAssetsDetail &&
      this.props.updateAssetsDetail !== undefined
    ) {
      $("#assets-detail").addClass("tabDeactive");
      $("#assets-detail").removeClass("active");
      $("#assets-detail").removeClass("show");
      $("#seller-information").removeClass("tabDeactive");
      $("#seller-information").addClass("active");
      $("#seller-information").addClass("show");
      $("#additional-information").addClass("tabDeactive");
      $("#additional-information").removeClass("active");
      $("#additional-information").removeClass("show");
      this.setState({
        ...this.state,
        screenName: "seller-information",
      });
    }
    if (
      prevProps.updateSellerDetail !== this.props.updateSellerDetail &&
      this.props.updateSellerDetail !== undefined
    ) {
      $("#seller-information").addClass("tabDeactive");
      $("#seller-information").removeClass("active");
      $("#seller-information").removeClass("show");
      $("#assets-detail").addClass("tabDeactive");
      $("#assets-detail").removeClass("active");
      $("#assets-detail").removeClass("show");
      $("#additional-information").removeClass("tabDeactive");
      $("#additional-information").addClass("active");
      $("#additional-information").addClass("show");
      this.setState({
        ...this.state,
        screenName: "additional-information",
      });
    }
    if (
      prevProps.updateAddtionalInfo !== this.props.updateAddtionalInfo &&
      this.props.updateAddtionalInfo !== undefined
    ) {
      this.props.onClickChangeStep(3, 4);
      this.props.history.push(`${this.props.url}/verify-identity`);
    }
  }

  update_assets_detail = (para) => {
    if (para === "assets-detail") {
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
                  : item.price
                      .toString()
                      .split(",")
                      .join("")
                      .split("$")
                      .join(""),
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
                  : item.price
                      .toString()
                      .split(",")
                      .join("")
                      .split("$")
                      .join(""),
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
    } else if (para === "seller-information") {
      const data = {
        id: this.props.buyerAppId,
        seller: {
          dealership_name: this.props.sellerDealerShipName,
          first_name: this.props.sellerFirstName,
          last_name: this.props.sellerLastName,
          street: this.props.sellerLocationName,
          city: this.props.sellerCity,
          province: this.props.sellerProvince,
          postal_code: this.props.sellerPostalCode,
          fax: this.props.sellerFax,
          email: this.props.sellerEmail,
          telephone: this.props.sellerTelephone,
        },
        additional_item: [],
      };
      console.log(data);
      this.props.update_application_detail(data, "updateSellerDetail");
    } else {
      // (this.props.addtionalInformation || []).map(item => {
      //     return {
      //         'id': item.id,
      //         "type": item.productType,
      //         "provider": item.infoProvider,
      //         "cost": item.infoCost.toString().split(',').join("").split('$').join(''),
      //         "is_updated": item.is_updated
      //     }
      // })
      const data = {
        id: this.props.buyerAppId,
        additional_item: (this.props.addtionalInformation || []).map((item) => {
          if (item.id === "") {
            return {
              type: item.productType,
              provider: item.infoProvider,
              cost: item.infoCost
                .toString()
                .split(",")
                .join("")
                .split("$")
                .join(""),
              is_updated: false,
            };
          } else {
            return {
              id: item.id,
              type: item.productType,
              provider: item.infoProvider,
              cost: item.infoCost
                .toString()
                .split(",")
                .join("")
                .split("$")
                .join(""),
              is_updated: item.is_updated,
            };
          }
        }),
      };
      console.log(data);
      this.props.update_application_detail(data, "updateAddtionalInfo");
    }
  };
  onBack = (para) => {
    if (para === "assets-detail") {
      $("#assets-detail").removeClass("tabDeactive");
      $("#assets-detail").addClass("active");
      $("#assets-detail").addClass("show");
      $("#seller-information").addClass("tabDeactive");
      $("#seller-information").removeClass("active");
      $("#seller-information").removeClass("show");
      $("#additional-information").addClass("tabDeactive");
      $("#additional-information").removeClass("active");
      $("#additional-information").removeClass("show");
    } else if (para === "seller-information") {
      $("#seller-information").removeClass("tabDeactive");
      $("#seller-information").addClass("active");
      $("#seller-information").addClass("show");
      $("#assets-detail").addClass("tabDeactive");
      $("#assets-detail").removeClass("active");
      $("#assets-detail").removeClass("show");
      $("#additional-information").addClass("tabDeactive");
      $("#additional-information").removeClass("active");
      $("#additional-information").removeClass("show");
    }

    this.setState({
      ...this.state,
      screenName: para,
    });
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
    return (
      <React.Fragment>
        <div className="app-form-content">
          <div className="app-form-content-inner">
            <ul
              className="nav nav-tabs-2 three-items"
              id="formAppTabs"
              role="tablist"
            >
              <li
                className="nav-item"
                onClick={() => this.changeScreen("assets-detail")}
              >
                <a
                  className={
                    this.state.screenName === "assets-detail"
                      ? "nav-link active"
                      : "nav-link"
                  }
                  id="assets-detail-tab"
                  data-toggle="tab"
                  href="#assets-detail"
                  role="tab"
                  aria-controls="assets-detail"
                  aria-selected={
                    this.state.screenName === "assets-detail" ? "true" : "false"
                  }
                >
                  {" "}
                  <span className="tabs-text assets-detail">
                    {" "}
                    Asset Detail{" "}
                  </span>{" "}
                </a>
              </li>
              <li
                className="nav-item"
                onClick={() => this.changeScreen("seller-information")}
              >
                <a
                  className={
                    this.state.screenName === "seller-information"
                      ? "nav-link active"
                      : "nav-link"
                  }
                  id="seller-information-tab"
                  data-toggle="tab"
                  href="#seller-information"
                  role="tab"
                  aria-controls="seller-information"
                  aria-selected={
                    this.state.screenName === "assets-detail" ? "true" : "false"
                  }
                >
                  <span className="tabs-text seller-information">
                    {" "}
                    Seller information{" "}
                  </span>{" "}
                </a>
              </li>
              <li
                className="nav-item"
                onClick={() => this.changeScreen("additional-information")}
              >
                <a
                  className={
                    this.state.screenName === "additional-information"
                      ? "nav-link active"
                      : "nav-link"
                  }
                  id="additional-information-tab"
                  data-toggle="tab"
                  href="#additional-information"
                  role="tab"
                  aria-controls="additional-information"
                  aria-selected={
                    this.state.screenName === "assets-detail" ? "true" : "false"
                  }
                >
                  <span className="tabs-text additional-information">
                    {" "}
                    Additional information{" "}
                  </span>{" "}
                </a>
              </li>
            </ul>
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
                            {/* {item.stockNumber !== undefined && item.stockNumber !== null && item.stockNumber !== '' ? (<Link to={`/ad-post/detail/${item.stockNumber}`}><button className="btn btn-primary float-left active"> View listing  </button></Link>) : null} */}
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
                            <button
                              className="add-another float-right"
                              onClick={this.props.addAssets}
                            >
                              {" "}
                              Add Another{" "}
                            </button>
                            {index > 0 ? (
                              this.props.loading_delete_vehicle === true ? (
                                <button className="add-another float-right">
                                  <i
                                    class="fa fa-circle-o-notch fa-spin"
                                    aria-hidden="true"
                                  ></i>
                                </button>
                              ) : (
                                <span
                                  className="del"
                                  onClick={() => this.props.deleteAsset(index)}
                                ></span>
                              )
                            ) : null}
                          </div>
                        </div>
                      </div>
                    ))}
                    <div className="footer-btns-holder clearfix">
                      {this.props.coApplicant === true ? (
                        <Link to={`${this.props.url}/co-applicant`}>
                          {" "}
                          <button
                            className="btn btn-primary float-left"
                            onClick={() => this.props.onClickChangeStep(3, 2)}
                          >
                            {" "}
                            Back{" "}
                          </button>
                        </Link>
                      ) : (
                        <Link to={`${this.props.url}/applicant-detail`}>
                          {" "}
                          <button
                            className="btn btn-primary float-left"
                            onClick={() => this.props.onClickChangeStep(3, 1)}
                          >
                            {" "}
                            Back{" "}
                          </button>
                        </Link>
                      )}
                      {/* <Link to={`${this.props.url}/applicant-detail`}> <button className="btn btn-primary float-left" onClick={() => this.props.onClickChangeStep(3, 1)}> Back  </button></Link> */}
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
                          onClick={() =>
                            this.update_assets_detail("assets-detail")
                          }
                        >
                          {" "}
                          Continue{" "}
                        </button>
                      )}
                    </div>
                  </React.Fragment>
                ) : null}
              </div>
              <div
                className="tab-pane fade"
                id="seller-information"
                role="tabpanel"
                aria-labelledby="seller-information-tab"
              >
                {this.state.screenName === "seller-information" ? (
                  <React.Fragment>
                    <div className="forms-head clearfix">
                      <h1 className=""> Seller information </h1>
                    </div>
                    <div className="form-main">
                      <div className="form-field-row clearfix">
                        <div className="form-field-col">
                          <label> Dealership Name </label>
                          <input
                            type="text"
                            className="form-control"
                            name="sellerDealerShipName"
                            placeholder="Dealer Ship Name"
                            value={this.props.sellerDealerShipName}
                            onChange={this.props.handleOnChange}
                          />
                        </div>
                      </div>
                      <div className="form-field-row two-col clearfix">
                        <div className="form-field-col">
                          <label> First Name </label>
                          <input
                            type="text"
                            className="form-control"
                            name="sellerFirstName"
                            placeholder="First Name"
                            value={this.props.sellerFirstName}
                            onChange={this.props.handleOnChange}
                          />
                        </div>
                        <div className="form-field-col">
                          <label> Last Name </label>
                          <input
                            type="text"
                            className="form-control"
                            name="sellerLastName"
                            placeholder="Last Name"
                            value={this.props.sellerLastName}
                            onChange={this.props.handleOnChange}
                          />
                        </div>
                      </div>
                      <div className="form-field-row two-col clearfix">
                        <div className="form-field-col">
                          <label> Telephone </label>
                          <NumberFormat
                            required
                            className="form-control"
                            format="+1 (###) ###-####"
                            placeholder="+1(123)456-7890"
                            onChange={this.props.handleOnChange}
                            value={this.props.sellerTelephone}
                            name="sellerTelephone"
                          />
                        </div>
                        <div className="form-field-col">
                          <label> Email </label>
                          <input
                            type="email"
                            className="form-control"
                            name="sellerEmail"
                            placeholder="Email"
                            value={this.props.sellerEmail}
                            onChange={this.props.sellerEmail}
                          />
                        </div>
                      </div>
                      <div className="form-field-row clearfix">
                        <div className="form-field-col">
                          <label> Street Address </label>
                          {/* <GooglePlacesAutocomplete required
                                                apiKey={process.env.REACT_APP_GOOGLE_API_KEY}
                                                autocompletionRequest={{
                                                    componentRestrictions: {
                                                        country: ['ca'],
                                                    }
                                                }}
                                                selectProps={{
                                                    value: (this.props.sellerAddress),
                                                    onChange: ((e) => this.props.handleLocationChange(e, 'sellerAddress')),
                                                    isClearable: true,
                                                    placeholder: 'Start typing your address here',
                                                    className: "react-location-select-main",
                                                    classNamePrefix: "react-location-select",
                                                }}

                                                onLoadFailed={(error) => (
                                                    console.error("Could not inject Google script", error)
                                                )}
                                            /> */}
                          <input
                            type="text"
                            className="form-control"
                            name="sellerLocationName"
                            placeholder="Street Address"
                            value={this.props.sellerLocationName}
                            onChange={this.props.handleOnChange}
                          />
                        </div>
                      </div>
                      <div className="form-field-row two-col clearfix">
                        <div className="form-field-col">
                          <label> City </label>
                          <input
                            type="text"
                            className="form-control"
                            name="sellerCity"
                            placeholder="City"
                            value={this.state.sellerCity}
                            onChange={this.props.handleOnChange}
                          />
                        </div>
                        <div className="form-field-col">
                          <label> Province </label>
                          <Select
                            required
                            placeholder="Select Province"
                            id="selectedSellerProvince"
                            name="selectedSellerProvince"
                            options={this.props.provinces}
                            onChange={(e) =>
                              this.props.changeSelect(
                                e,
                                "sellerProvince",
                                "selectedSellerProvince"
                              )
                            }
                            value={this.props.selectedSellerProvince}
                            className="react-select-main "
                            classNamePrefix="react-select"
                            components={{
                              Option: renderOption,
                              MenuList: renderScrollbar,
                            }}
                            captureMenuScroll={false}
                          />
                        </div>
                      </div>
                      <div className="form-field-row two-col clearfix">
                        <div className="form-field-col">
                          <label> Postal Code </label>
                          <MaskedInput
                            mask={[
                              /[a-zA-Z0-9]/i,
                              /[a-zA-Z0-9]/,
                              /[a-zA-Z0-9]/i,
                              " ",
                              /[a-zA-Z0-9]/,
                              /[a-zA-Z0-9]/i,
                              /[a-zA-Z0-9]/,
                            ]}
                            className="form-control"
                            guide={false}
                            placeholder="A2A 2A2"
                            id="sellerPostalCode"
                            name="sellerPostalCode"
                            value={this.props.sellerPostalCode}
                            onChange={this.props.handleOnChange}
                          />
                        </div>
                        <div className="form-field-col">
                          <label> Fax </label>
                          <NumberFormat
                            required
                            className="form-control"
                            format="+1 (###) ###-####"
                            placeholder="+1(123)456-7890"
                            onChange={this.props.handleOnChange}
                            value={this.props.sellerFax}
                            name="sellerFax"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="footer-btns-holder clearfix">
                      <button
                        className="btn btn-primary float-left"
                        onClick={() => this.onBack("assets-detail")}
                      >
                        {" "}
                        Back{" "}
                      </button>
                      {/* <button className="btn btn-primary float-right active"> Continue  </button> */}
                      {/* <Link to={`${this.props.url}/verify-identity`} onClick={() => this.props.onClickChangeStep(4)}><button className="btn btn-primary float-right active"> Continue  </button></Link> */}
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
                          onClick={() =>
                            this.update_assets_detail("seller-information")
                          }
                        >
                          {" "}
                          Continue{" "}
                        </button>
                      )}
                    </div>
                  </React.Fragment>
                ) : null}
              </div>
              <div
                className="tab-pane fade"
                id="additional-information"
                role="tabpanel"
                aria-labelledby="additional-information-tab"
              >
                {this.state.screenName === "additional-information" ? (
                  <React.Fragment>
                    <div className="forms-head clearfix">
                      <h1 className="">
                        {" "}
                        Additional Items{" "}
                        <span>
                          {" "}
                          Please enter all applicable third party add-ons that
                          have been included in the loan amount.{" "}
                        </span>{" "}
                      </h1>
                    </div>
                    {(this.props.addtionalInformation || []).map(
                      (item, index) => (
                        <div className="form-main" key={index}>
                          {index > 0 ? (
                            <span
                              className="del"
                              onClick={() =>
                                this.props.deleteAddtionalInfor(index)
                              }
                            ></span>
                          ) : null}
                          <div className="form-field-row three-col clearfix">
                            <div className="form-field-col">
                              <label> Type </label>
                              <Select
                                required
                                placeholder="Select Type"
                                id="selectedProductType"
                                name="selectedProductType"
                                options={this.props.addtionalTypes}
                                onChange={(e) =>
                                  this.props.changeSelectInfo(
                                    e,
                                    "productType",
                                    "selectedProductType",
                                    index
                                  )
                                }
                                value={item.selectedProductType}
                                className="react-select-main "
                                classNamePrefix="react-select"
                                components={{
                                  Option: renderOption,
                                  MenuList: renderScrollbar,
                                }}
                                captureMenuScroll={false}
                              />
                              {/* <select className="form-control">
                                                <option> Select Product </option>
                                                <option> 1 </option>
                                                <option> 2 </option>
                                            </select> */}
                            </div>
                            <div className="form-field-col">
                              <label> Provider </label>
                              <input
                                type="text"
                                className="form-control"
                                name="infoProvider"
                                placeholder="Provider"
                                value={item.infoProvider}
                                onChange={(e) =>
                                  this.props.handleOnChangeInfo(e, index)
                                }
                              />
                            </div>
                            <div className="form-field-col">
                              <label> Cost </label>
                              <NumberFormat
                                className="form-control"
                                value={item.infoCost}
                                decimalScale={2}
                                onChange={(e) =>
                                  this.props.handleOnChangeInfo(e, index)
                                }
                                thousandSeparator={true}
                                prefix={"$"}
                                id="infoCost"
                                name="infoCost"
                                allowNegative={false}
                                placeholder="Cost"
                              />
                              {/* <input type="text" className="form-control" name="" placeholder="e.g $99" /> */}
                            </div>
                          </div>
                          <div className="form-field-row two-col clearfix">
                            <div className="cta m-0 clearfix">
                              <button
                                className="add-another float-right"
                                onClick={this.props.addAddtionalInfor}
                              >
                                {" "}
                                Add Another{" "}
                              </button>
                            </div>
                          </div>
                        </div>
                      )
                    )}
                    <div className="footer-btns-holder clearfix">
                      <button
                        className="btn btn-primary float-left"
                        onClick={() => this.onBack("seller-information")}
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
                          onClick={() =>
                            this.update_assets_detail("additional-information")
                          }
                        >
                          {" "}
                          Continue{" "}
                        </button>
                      )}
                      {/* <Link to={`${this.props.url}/verify-identity`}><button className="btn btn-primary float-right active" onClick={() => this.props.onClickChangeStep(4)}> Continue  </button></Link> */}
                      {/* <button class="btn btn-primary float-left"> Back  </button>
                                <button class="btn btn-primary float-right active"> View listing  </button> */}
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

{
  /* <div className="form-main">
                                <span className="del"></span>
                                <div className="form-field-row three-col clearfix">
                                    <div className="form-field-col">
                                        <label> Type </label>
                                        <select className="form-control">
                                            <option> Select Product </option>
                                            <option> 1 </option>
                                            <option> 2 </option>
                                        </select>
                                    </div>
                                    <div className="form-field-col">
                                        <label> Provider  </label>
                                        <input type="text" className="form-control" name="" placeholder="Jahanzaib" />
                                    </div>
                                    <div className="form-field-col">
                                        <label> Cost </label>
                                        <input type="text" className="form-control" name="" placeholder="e.g $99" />
                                    </div>
                                </div>
                                <div className="form-field-row two-col clearfix">
                                    <div className="cta m-0 clearfix">
                                        <a href="#" className="add-another float-right"> Add Another </a>
                                    </div>
                                </div>
                            </div> */
}
