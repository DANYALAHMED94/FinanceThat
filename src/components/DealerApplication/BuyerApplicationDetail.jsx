import React, { Component } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getMonth, getYear } from "date-fns";
import range from "lodash/range";
import NumberFormat from "react-number-format";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import Select, { components } from "react-select";
import { Scrollbars } from "react-custom-scrollbars";
import MaskedInput from "react-text-mask";
import { Link } from "react-router-dom";
import $ from "jquery";
import Slider from "react-rangeslider";
import "react-rangeslider/lib/index.css";
import { API_URL } from "../../constant";
var that;
class BuyerApplicationDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      screenName: "personal-detail",
    };
    that = this;
    $("#personal-detail").removeClass("tabDeactive");
    $("#employment-information").addClass("tabDeactive");
  }
  changeScreen = (para) => {
    if (para === "personal-detail") {
      $("#personal-detail").removeClass("tabDeactive");
      $("#employment-information").addClass("tabDeactive");
    } else {
      $("#employment-information").removeClass("tabDeactive");
      $("#personal-detail").addClass("tabDeactive");
    }
    this.setState({
      ...this.state,
      screenName: para,
    });
  };
  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.updateBuyerApplicationPersonal !==
        this.props.updateBuyerApplicationPersonal &&
      this.props.updateBuyerApplicationPersonal !== undefined
    ) {
      if (this.props.coApplicant === true) {
        this.props.onClickChangeStep(2);
        this.props.history.push(`${this.props.url}/co-applicant`);
      } else {
        this.props.onClickChangeStep(3);
        this.props.history.push(`${this.props.url}/assets-detail`);
      }
    }
  }

  update_buyer_detail = (para) => {
    const data = {
      id: this.props.buyerAppId,
      first_name: this.props.applicantFirstName,
      last_name: this.props.applicantLastName,
      dob: this.props.applicantDateOfBirth,
      telephone: this.props.applicantTelephone,
      address: this.props.applicantLocationName,
      province: this.props.applicantProvince,
      city: this.props.applicantCity,
      postal_code: this.props.applicantPostalCode,
      country: this.props.applicantCountry,
      additional_item: [],
    };
    console.log(data);
    this.props.update_application_detail(
      data,
      "updateBuyerApplicationPersonal"
    );
  };

  render() {
    const years = range(1900, getYear(new Date()) + 1, 1);
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const { Option } = components;

    const renderScrollbar = (props) => {
      return (
        <div style={{ height: 260 }}>
          <Scrollbars>{props.children}</Scrollbars>
        </div>
      );
    };
    const renderScrollbar2 = (props) => {
      return (
        <div style={{ height: 225 }}>
          <Scrollbars>{props.children}</Scrollbars>
        </div>
      );
    };
    const renderScrollbarTypeEmployee = (props) => {
      return (
        <div style={{ height: 150 }}>
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
    const horizontalLabels = {
      0: "$0 Monthly",
      50: `${
        this.props.grossMonthlyIncomeSlider !== null &&
        this.props.grossMonthlyIncomeSlider !== ""
          ? new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(Number(this.props.grossMonthlyIncomeSlider)) // '$100.00'
          : new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(0)
      } Gross Monthly Income`,
      [`${this.props.grossMonthlyIncomeSlider}`]: `${
        this.props.grossMonthlyIncomeSlider !== null &&
        this.props.grossMonthlyIncomeSlider !== ""
          ? new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(Number(this.props.grossMonthlyIncomeSlider)) // '$100.00'
          : new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(0)
      } Gross Income`,
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
            <div className="admin-form-head-inner">
              {this.props.photo ? (
                <span
                  style={{
                    backgroundImage: `url(${
                      API_URL + "/media/" + this.props.photo
                    })`,
                  }}
                  className="avatar"
                ></span>
              ) : (
                <span className="avatar">{`${first}${last}`} </span>
              )}
              <strong className="title d-inline-block">
                {" "}
                {`${
                  this.props.applicantFirstName
                    ? this.props.applicantFirstName || ""
                    : ""
                } ${
                  this.props.applicantLastName
                    ? this.props.applicantLastName || ""
                    : ""
                }`}{" "}
              </strong>{" "}
              <span className="type d-inline-block">
                {" "}
                {this.props.firstTypeOfVehicle}{" "}
              </span>
              {/* <p> <span className="">  {this.props.firstTypeOfVehicle} </span>  </p> */}
            </div>
            {/* <ul className="nav nav-tabs-2 two-items" id="formAppTabs" role="tablist">
                        <li className="nav-item" onClick={() => this.changeScreen('personal-detail')}>
                            <a className={this.state.screenName === 'personal-detail' ? "nav-link active" : "nav-link"} id="personal-detail-tab" data-toggle="tab" href="#personal-detail" role="tab" aria-controls="personal-detail" aria-selected={this.state.screenName === 'personal-detail' ? "true" : "false"} > <span className="tabs-text personal-detail"> Personal Detail </span> </a>
                        </li>
                        <li className="nav-item" onClick={() => this.changeScreen('employment-information')}>
                            <a className={this.state.screenName === 'employment-information' ? "nav-link active" : "nav-link"} id="employment-information-tab" data-toggle="tab" href="#employment-information" role="tab" aria-controls="employment-information" aria-selected={this.state.screenName === 'employment-information' ? "true" : "false"}  > <span className="tabs-text employment-information"> Employment Information </span> </a>
                        </li>
                    </ul> */}
            <div className="tab-content" id="formAppTabsContent">
              {/* <div className="tab-pane fade show active clearfix" id="personal-detail" role="tabpanel" aria-labelledby="personal-detail-tab"> */}
              <div
                className="tab-pane fade active show clearfix"
                id="personal-detail"
                role="tabpanel"
                aria-labelledby="personal-detail-tab"
              >
                {this.state.screenName === "personal-detail" ? (
                  <React.Fragment>
                    <div className="forms-head clearfix">
                      <h1 className="float-left">
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
                        Details{" "}
                      </h1>
                      {/* {!this.props.coApplicant ? this.props.loading_edit_application ? (null) : ((<Link className="nav-link" to={`${this.props.url}/co-applicant`} onClick={() => this.props.onClickChangeStep(2)}> <button className="btn btn-primary float-right"> Add co-applicant </button></Link>)) : null} */}
                    </div>
                    <div className="form-main">
                      {/* <div className="form-field-row clearfix">
                                        <div className="form-field-col">
                                            <label> Dealership Name </label>
                                            <input type="text" className="form-control" name="dealerShipName" placeholder="Dealer Ship Name" value={this.props.dealerShipName} onChange={this.props.handleOnChange} />
                                        </div>
                                    </div> */}

                      <div className="form-field-row two-col clearfix">
                        <div className="form-field-col">
                          <label> First Name </label>
                          <input
                            type="text"
                            className="form-control"
                            name="applicantFirstName"
                            placeholder="First Name"
                            value={this.props.applicantFirstName}
                            onChange={this.props.handleOnChange}
                          />
                        </div>
                        <div className="form-field-col">
                          <label> Last Name </label>
                          <input
                            type="text"
                            className="form-control"
                            name="applicantLastName"
                            placeholder="Last Name"
                            value={this.props.applicantLastName}
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
                            value={this.props.applicantTelephone}
                            name="applicantTelephone"
                          />
                        </div>
                        <div className="form-field-col">
                          <label> Email </label>
                          <input
                            type="text"
                            className="form-control"
                            name="applicantEmail"
                            placeholder="Email"
                            value={this.props.applicantEmail}
                            onChange={this.props.handleOnChange}
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
                                                    value: (this.props.applicantAddress),
                                                    onChange: ((e) => this.props.handleLocationChange(e, 'applicantAddress')),
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
                            name="applicantLocationName"
                            placeholder="Street Address"
                            value={this.props.applicantLocationName}
                            onChange={this.props.handleOnChange}
                          />
                        </div>
                      </div>

                      <div className="form-field-row two-col clearfix">
                        <div className="form-field-col">
                          <label> City </label>
                          <input
                            required
                            type="text"
                            id="applicantCity"
                            name="applicantCity"
                            city="City"
                            className="form-control"
                            onChange={this.props.handleOnChange}
                            value={this.props.applicantCity}
                          />
                        </div>
                        <div className="form-field-col">
                          <label> Province </label>
                          <Select
                            required
                            placeholder="Select Province"
                            id="selectedProvince"
                            name="selectedProvince"
                            options={this.props.provinces}
                            onChange={(e) =>
                              this.props.changeSelect(
                                e,
                                "applicantProvince",
                                "selectedProvince"
                              )
                            }
                            value={this.props.selectedProvince}
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
                            id="applicantPostalCode"
                            name="applicantPostalCode"
                            value={this.props.applicantPostalCode}
                            onChange={this.props.handleOnChange}
                          />
                        </div>
                        <div className="form-field-col">
                          <label> Country </label>
                          <input
                            required
                            type="text"
                            className="form-control"
                            id="applicantCountry"
                            name="applicantCountry"
                            placeholder="Country"
                            value={this.props.applicantCountry}
                            onChange={this.props.handleOnChange}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="footer-btns-holder clearfix">
                      <Link to="/buyer/my-application">
                        <button className="btn btn-primary float-left">
                          {" "}
                          Back{" "}
                        </button>
                      </Link>
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
                          onClick={this.update_buyer_detail}
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
export default BuyerApplicationDetail;
