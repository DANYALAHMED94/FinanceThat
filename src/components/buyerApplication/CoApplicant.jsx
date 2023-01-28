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
import ConfirmModel from "../alertMessages/ConfirmModel";
import dateFormat from "dateformat";

class CoApplicant extends Component {
  constructor(props) {
    super(props);
    this.state = {
      screenName: "personal-detail",
      coId: "",
    };
    $("#personal-detail").removeClass("tabDeactive");
    $("#employment-information").addClass("tabDeactive");
  }
  changeScreen = (para) => {
    if (para === "personal-detail") {
      $("#personal-detail").addClass("active");
      $("#personal-detail").addClass("show");
      $("#personal-detail").removeClass("tabDeactive");
      $("#employment-information").addClass("tabDeactive");
      $("#employment-information").removeClass("active");
      $("#employment-information").removeClass("show");

      // $("#personal-detail").removeClass('tabDeactive')
      // $("#employment-information").addClass('tabDeactive')
    } else {
      $("#personal-detail").removeClass("active");
      $("#personal-detail").removeClass("show");
      $("#employment-information").removeClass("tabDeactive");
      $("#personal-detail").addClass("tabDeactive");
      $("#employment-information").addClass("active");
      $("#employment-information").addClass("show");

      // $("#employment-information").removeClass('tabDeactive')
      // $("#personal-detail").addClass('tabDeactive')
    }
    this.setState({
      ...this.state,
      screenName: para,
    });
  };
  onBack = () => {
    $("#personal-detail").removeClass("tabDeactive");
    $("#personal-detail").addClass("active");
    $("#personal-detail").addClass("show");
    $("#employment-information").addClass("tabDeactive");
    $("#employment-information").removeClass("active");
    $("#employment-information").removeClass("show");
    this.setState({
      ...this.state,
      screenName: "personal-detail",
    });
  };

  update_buyer_detail = (para) => {
    if (para === "personal-detail") {
      const data = {
        id: this.props.buyerAppId,
        co_applicant: {
          first_name: this.props.coApplicantFirstName,
          last_name: this.props.coApplicantLastName,
          dob: dateFormat(this.props.coApplicantDateOfBirth, "yyyy-mm-dd"),
          telephone: this.props.coApplicantTelephone,
          address: this.props.coApplicantStreetAddress,
          street_address: this.props.coApplicantLocationName,
          province: this.props.coApplicantProvince,
          city: this.props.coApplicantCity,
          postal_code: this.props.coApplicantPostalCode,
          country: this.props.coApplicantCountry,
          status: this.props.coApplicantSelectedStatus,
          duration_address_mn: this.props.coApplicantDuration_address_mn,
          duration_address_yr: this.props.duration_address_yr,
          mortgage_amount: this.props.coApplicantMortgage_amount,
          marital_status: this.props.coApplicantMaritalStatus,
          sin: this.props.coApplicantSin,
        },
        additional_item: [],
      };
      // $("#personal-detail").addClass('tabDeactive')
      // $("#personal-detail").removeClass('active')
      // $("#personal-detail").removeClass('show')
      // $("#employment-information").removeClass('tabDeactive')
      // $("#employment-information").addClass('active')
      // $("#employment-information").addClass('show')
      // this.setState({
      //     ...this.state,
      //     screenName: 'employment-information'
      // })
      console.log(data);
      this.props.update_application_detail(
        data,
        "updateCoBuyerApplicationPersonal"
      );
    } else {
      // const data = {
      //     id: this.props.buyerAppId,
      //     co_applicant: {
      //         employement_status: this.props.coApplicantEmploymentStatus,
      //         type_of_employment: this.props.coApplicantTypeOfEmployment,
      //         employer_name: this.props.coApplicantEmployerName,
      //         occupation: this.props.coApplicantOccupation,
      //         employment_since: this.props.coApplicantEmploymentSince,

      //         gross_income: this.props.coApplicantGrossMonthlyIncome,
      //     },
      //     additional_item: []
      // }
      const data = {
        id: this.props.buyerAppId,
        co_applicant: {
          employement_status: this.props.coApplicantEmploymentStatus,
          employment_since: dateFormat(
            this.props.coApplicantEmploymentSince,
            "yyyy-mm-dd"
          ),
          gross_income: this.props.coApplicantGrossMonthlyIncome,
        },
        additional_item: [],
      };
      if (this.props.coApplicantEmploymentStatus === "Self employed") {
        data.co_applicant.business_name = this.props.coApplicantBusniessName;
        data.co_applicant.type_of_business =
          this.props.coApplicantTypeOfBusniess;
        data.co_applicant.employer_name = "";
        data.co_applicant.type_of_employment = "";
        data.co_applicant.occupation = "";
        data.co_applicant.employer_address = this.props.coEmployerStreetAddress;
        data.co_applicant.employer_city = this.props.coEmployerCity;
        data.co_applicant.employer_email = this.props.coEmployerEmail;
        data.co_applicant.employer_province = this.props.coEmployerProvince;
        data.co_applicant.employer_telephone = this.props.coEmployerPhon;
      }
      if (this.props.coApplicantEmploymentStatus === "Employed") {
        data.co_applicant.business_name = "";
        data.co_applicant.type_of_business = "";
        data.co_applicant.employer_name = this.props.coApplicantEmployerName;
        data.co_applicant.type_of_employment =
          this.props.coApplicantTypeOfEmployment;
        data.co_applicant.occupation = this.props.coApplicantOccupation;
        data.co_applicant.employer_address = this.props.coEmployerStreetAddress;
        data.co_applicant.employer_city = this.props.coEmployerCity;
        data.co_applicant.employer_email = this.props.coEmployerEmail;
        data.co_applicant.employer_province = this.props.coEmployerProvince;
        data.co_applicant.employer_telephone = this.props.coEmployerPhon;
      }
      if (this.props.coApplicantEmploymentStatus === "Unemployed") {
        data.co_applicant.employement_status = "";
        data.co_applicant.occupation = "";
        data.co_applicant.employment_since = "";
        data.co_applicant.business_name = "";
        data.co_applicant.type_of_business = "";
        data.co_applicant.gross_income = "";
      }
      if (this.props.coApplicantEmploymentStatus === "Retired") {
        data.co_applicant.employement_status = "";
        data.co_applicant.occupation = "";
        data.co_applicant.employment_since = "";
        data.co_applicant.business_name = "";
        data.co_applicant.type_of_business = "";
        data.co_applicant.gross_income =
          this.props.coApplicantGrossMonthlyIncome;
      }
      console.log(data);
      this.props.update_application_detail(
        data,
        "updateCoBuyerApplicationEmployement"
      );
    }
  };
  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.updateCoBuyerApplicationPersonal !==
        this.props.updateCoBuyerApplicationPersonal &&
      this.props.updateCoBuyerApplicationPersonal !== undefined
    ) {
      $("#personal-detail").addClass("tabDeactive");
      $("#personal-detail").removeClass("active");
      $("#personal-detail").removeClass("show");
      $("#employment-information").removeClass("tabDeactive");
      $("#employment-information").addClass("active");
      $("#employment-information").addClass("show");
      this.setState({
        ...this.state,
        screenName: "employment-information",
      });
    }
    if (
      prevProps.updateCoBuyerApplicationEmployement !==
        this.props.updateCoBuyerApplicationEmployement &&
      this.props.updateCoBuyerApplicationEmployement !== undefined
    ) {
      this.props.onClickChangeStep(2, 3);
      this.props.history.push(`${this.props.url}/assets-detail`);
    }
  }
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
      0: "$0",
      [`${
        this.props.coApplicantDefaultGrossMonthlyIncome
          ? this.props.coApplicantDefaultGrossMonthlyIncome
          : 150000
      }`]: `${
        this.props.coApplicantDefaultGrossMonthlyIncome
          ? new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(Number(this.props.coApplicantGrossMonthlyIncome)) // '$100.00'
          : new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(0)
      } `,
      300000: `${new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(300000)} `,
    };
    return (
      <React.Fragment>
        <div className="app-form-content">
          <div className="app-form-content-inner">
            <ul
              className="nav nav-tabs-2 two-items"
              id="formAppTabs"
              role="tablist"
            >
              <li
                className="nav-item"
                onClick={() => this.changeScreen("personal-detail")}
              >
                <a
                  className={
                    this.state.screenName === "personal-detail"
                      ? "nav-link active"
                      : "nav-link"
                  }
                  id="personal-detail-tab"
                  data-toggle="tab"
                  href="#personal-detail"
                  role="tab"
                  aria-controls="personal-detail"
                  aria-selected={
                    this.state.screenName === "personal-detail"
                      ? "true"
                      : "false"
                  }
                >
                  {" "}
                  <span className="tabs-text personal-detail">
                    {" "}
                    Co-Applicant Personal Detail{" "}
                  </span>{" "}
                </a>
              </li>
              <li
                className="nav-item"
                onClick={() => this.changeScreen("employment-information")}
              >
                <a
                  className={
                    this.state.screenName === "employment-information"
                      ? "nav-link active"
                      : "nav-link"
                  }
                  id="employment-information-tab"
                  data-toggle="tab"
                  href="#employment-information"
                  role="tab"
                  aria-controls="employment-information"
                  aria-selected={
                    this.state.screenName === "employment-information"
                      ? "true"
                      : "false"
                  }
                >
                  <span className="tabs-text employment-information">
                    {" "}
                    Employment Information{" "}
                  </span>{" "}
                </a>
              </li>
            </ul>
            <div className="tab-content" id="formAppTabsContent">
              <div
                className="tab-pane fade show active clearfix"
                id="personal-detail"
                role="tabpanel"
                aria-labelledby="personal-detail-tab"
              >
                {this.state.screenName === "personal-detail" ? (
                  <React.Fragment>
                    <div className="forms-head clearfix">
                      <h1 className="float-left">
                        {" "}
                        Co-applicant's personal details{" "}
                      </h1>
                      {/* <Link to={`${this.props.url}/applicant-detail`} className="del" onClick={() => this.props.removeCoApplicant(1)}> <img src="/assets/image/trash-icon.svg" alt="" /> </Link> */}
                      <span
                        className="del"
                        data-toggle="modal"
                        data-target="#confirmModel"
                        onClick={() =>
                          this.setState({
                            ...this.state,
                            coId: this.props.coApplicantId,
                          })
                        }
                      >
                        {" "}
                        <img src="/assets/image/trash-icon.svg" alt="" />{" "}
                      </span>
                    </div>
                    <div className="form-main">
                      <div className="form-field-row two-col clearfix">
                        <div className="form-field-col">
                          <label> First Name </label>
                          <input
                            type="text"
                            className="form-control"
                            name="coApplicantFirstName"
                            placeholder="First Name"
                            value={this.props.coApplicantFirstName}
                            onChange={this.props.handleOnChange}
                          />
                        </div>
                        <div className="form-field-col">
                          <label> Last Name </label>
                          <input
                            type="text"
                            className="form-control"
                            name="coApplicantLastName"
                            placeholder="Last Name"
                            value={this.props.coApplicantLastName}
                            onChange={this.props.handleOnChange}
                          />
                        </div>
                      </div>
                      <div className="form-field-row two-col clearfix">
                        <div className="form-field-col">
                          <label> Date of Birth </label>
                          <DatePicker
                            required
                            renderCustomHeader={({
                              date,
                              changeYear,
                              changeMonth,
                              decreaseMonth,
                              increaseMonth,
                              prevMonthButtonDisabled,
                              nextMonthButtonDisabled,
                            }) => (
                              <div
                                style={{
                                  margin: 10,
                                  display: "flex",
                                  justifyContent: "center",
                                }}
                              >
                                <button
                                  onClick={decreaseMonth}
                                  disabled={prevMonthButtonDisabled}
                                  type="button"
                                >
                                  {"<"}
                                </button>
                                <select
                                  value={getYear(date)}
                                  onChange={({ target: { value } }) =>
                                    changeYear(value)
                                  }
                                >
                                  {years.map((option) => (
                                    <option key={option} value={option}>
                                      {option}
                                    </option>
                                  ))}
                                </select>

                                <select
                                  value={months[getMonth(date)]}
                                  onChange={({ target: { value } }) =>
                                    changeMonth(months.indexOf(value))
                                  }
                                >
                                  {months.map((option) => (
                                    <option key={option} value={option}>
                                      {option}
                                    </option>
                                  ))}
                                </select>
                                <button
                                  onClick={increaseMonth}
                                  disabled={nextMonthButtonDisabled}
                                  type="button"
                                >
                                  {">"}
                                </button>
                              </div>
                            )}
                            selected={this.props.coApplicantDateOfBirth}
                            placeholderText="YYYY-MM-DD"
                            dateFormat="yyyy-MM-dd"
                            onChange={(e) =>
                              this.props.handleOnChangeDates(
                                e,
                                "coApplicantDateOfBirth"
                              )
                            }
                            maxDate={new Date()}
                            name="coApplicantDateOfBirth"
                            className="form-control callendar"
                          />
                          {/* <input type="text" className="form-control callendar" name="" placeholder="1992-01-26" /> */}
                        </div>
                        <div className="form-field-col">
                          <label> Telephone </label>
                          <NumberFormat
                            required
                            className="form-control"
                            format="+1 (###) ###-####"
                            placeholder="+1(123)456-7890"
                            onChange={this.props.handleOnChange}
                            value={this.props.coApplicantTelephone}
                            name="coApplicantTelephone"
                          />

                          {/* <input type="text" className="form-control" name="" placeholder="+1 (123) 333-3333" /> */}
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
                                                        value: (this.props.coApplicantAddress),
                                                        onChange: ((e) => this.props.handleLocationChange(e, 'coApplicantAddress')),
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
                            name="coApplicantStreetAddress"
                            placeholder="Street Address"
                            value={this.props.coApplicantStreetAddress}
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
                            name="coApplicantCity"
                            placeholder="City"
                            value={this.props.coApplicantCity}
                            onChange={this.props.handleOnChange}
                          />
                        </div>
                        <div className="form-field-col">
                          <label> Province </label>
                          <Select
                            required
                            placeholder="Select Province"
                            id="selectedCoApplicantProvince"
                            name="selectedCoApplicantProvince"
                            options={this.props.provinces}
                            onChange={(e) =>
                              this.props.changeSelect(
                                e,
                                "coApplicantProvince",
                                "selectedCoApplicantProvince"
                              )
                            }
                            value={this.props.selectedCoApplicantProvince}
                            className="react-select-main "
                            classNamePrefix="react-select"
                            components={{
                              Option: renderOption,
                              MenuList: renderScrollbar,
                            }}
                            captureMenuScroll={false}
                          />
                          {/* <input type="text" className="form-control" name="" placeholder="Alberta" /> */}
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
                            id="coApplicantPostalCode"
                            name="coApplicantPostalCode"
                            value={this.props.coApplicantPostalCode}
                            onChange={this.props.handleOnChange}
                          />
                          {/* <input type="text" className="form-control" name="" placeholder="L6T 3J5" /> */}
                        </div>
                        <div className="form-field-col">
                          <label> Country </label>
                          <input
                            type="text"
                            className="form-control"
                            name="coApplicantCountry"
                            placeholder="Country"
                            value={this.props.coApplicantCountry}
                            onChange={this.props.handleOnChange}
                          />
                        </div>
                      </div>
                      <div className="form-field-row two-col clearfix">
                        <div className="form-field-col">
                          <label> Years at current address </label>
                          <NumberFormat
                            required
                            className="form-control"
                            value={this.props.coApplicantDuration_address_yr}
                            onChange={this.props.handleOnChange}
                            allowNegative={false}
                            id="coApplicantDuration_address_yr"
                            name="coApplicantDuration_address_yr"
                            placeholder="Years"
                          />
                        </div>
                        <div className="form-field-col">
                          <label> Months at current address </label>
                          <NumberFormat
                            required
                            className="form-control"
                            value={this.props.coApplicantDuration_address_mn}
                            onChange={this.props.handleOnChange}
                            allowNegative={false}
                            id="coApplicantDuration_address_mn"
                            name="coApplicantDuration_address_mn"
                            placeholder="Months"
                          />
                        </div>
                      </div>
                      <div className="form-field-row two-col clearfix">
                        <div className="form-field-col">
                          <label> Status </label>
                          <Select
                            required
                            placeholder=""
                            id="coApplicantStatus"
                            name="coApplicantStatus"
                            options={this.props.statuses}
                            onChange={(e) =>
                              this.props.changeSelect(
                                e,
                                "coApplicantSelectedStatus",
                                "coApplicantStatus"
                              )
                            }
                            value={this.props.coApplicantStatus}
                            className="react-select-main"
                            classNamePrefix="react-select"
                            components={{
                              Option: renderOption,
                              MenuList: renderScrollbarTypeEmployee,
                            }}
                            captureMenuScroll={false}
                          />
                        </div>
                        <div className="form-field-col">
                          <label> Mortgage Amount </label>
                          <NumberFormat
                            required
                            className="form-control"
                            value={this.props.coApplicantMortgage_amount}
                            onChange={this.props.handleOnChange}
                            allowNegative={false}
                            id="coApplicantMortgage_amount"
                            name="coApplicantMortgage_amount"
                            placeholder="Amount"
                          />
                        </div>
                      </div>
                      <div className="form-field-row two-col clearfix">
                        <div className="form-field-col">
                          <label> Social insurance number (optional) </label>
                          <NumberFormat
                            required
                            className="form-control"
                            value={this.props.coApplicantSin}
                            onChange={this.props.handleOnChange}
                            allowNegative={false}
                            id="coApplicantSin"
                            name="coApplicantSin"
                            placeholder="Sin"
                          />
                        </div>
                        <div className="form-field-col">
                          <label> Marital Status </label>
                          <Select
                            required
                            placeholder=""
                            id="selectCoApplicantMaritalStatus"
                            name="selectCoApplicantMaritalStatus"
                            options={this.props.maritalStatues}
                            onChange={(e) =>
                              this.props.changeSelect(
                                e,
                                "coApplicantMaritalStatus",
                                "selectCoApplicantMaritalStatus"
                              )
                            }
                            value={this.props.selectCoApplicantMaritalStatus}
                            className="react-select-main"
                            classNamePrefix="react-select"
                            components={{
                              Option: renderOption,
                              MenuList: renderScrollbarTypeEmployee,
                            }}
                            captureMenuScroll={false}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="footer-btns-holder clearfix">
                      <Link to={`${this.props.url}/applicant-detail`}>
                        {" "}
                        <button
                          className="btn btn-primary float-left"
                          onClick={() => this.props.onClickChangeStep(2, 1)}
                        >
                          {" "}
                          Back{" "}
                        </button>
                      </Link>
                      {/* <Link to={`${this.props.url}/assets-detail`}> */}
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
                            this.update_buyer_detail("personal-detail")
                          }
                        >
                          {" "}
                          Continue{" "}
                        </button>
                      )}
                      {/* <button className="btn btn-primary float-right active" onClick={() => this.update_buyer_detail('personal-detail')}> Continue  </button> */}
                      {/* </Link> */}
                      {/* <button className="btn btn-primary float-left"> Back  </button>
                                        <button className="btn btn-primary float-right active"> Continue  </button> */}
                    </div>
                  </React.Fragment>
                ) : null}
              </div>
              <div
                className="tab-pane fade"
                id="employment-information"
                role="tabpanel"
                aria-labelledby="employment-information-tab"
              >
                {this.state.screenName === "employment-information" ? (
                  <React.Fragment>
                    <div className="forms-head clearfix">
                      <h1 className=""> Applicant Employment Information </h1>
                    </div>
                    <div className="form-main">
                      <div className="form-field-row two-col clearfix">
                        <div className="form-field-col">
                          <label> Employment Status </label>
                          <Select
                            required
                            placeholder=""
                            id="selectEmploymentStatus"
                            name="selectEmploymentStatus"
                            options={this.props.employmentStatuses}
                            onChange={(e) =>
                              this.props.changeSelect(
                                e,
                                "coApplicantEmploymentStatus",
                                "selectCoApplicantEmploymentStatus"
                              )
                            }
                            value={this.props.selectCoApplicantEmploymentStatus}
                            className="react-select-main"
                            classNamePrefix="react-select"
                            components={{
                              Option: renderOption,
                              MenuList: renderScrollbar2,
                            }}
                            captureMenuScroll={false}
                          />
                          {/* <select className="form-control">
                                                <option> Employed </option>
                                                <option> 1 </option>
                                                <option> 2 </option>
                                            </select> */}
                        </div>
                        {this.props.coApplicantEmploymentStatus !==
                          "Unemployed" &&
                        this.props.coApplicantEmploymentStatus !== "Retired" ? (
                          this.props.coApplicantEmploymentStatus ===
                          "Self employed" ? (
                            <div className="form-field-col">
                              <label> Business Name </label>
                              <input
                                type="text"
                                className="form-control"
                                name="coApplicantBusniessName"
                                placeholder="Business Name"
                                value={this.props.coApplicantBusniessName}
                                onChange={this.props.handleOnChange}
                              />
                            </div>
                          ) : (
                            <div className="form-field-col">
                              <label> Type of Employment </label>
                              <Select
                                required
                                placeholder=""
                                id="selectedCoApplicantTypeOfEmployment"
                                name="selectedCoApplicantTypeOfEmployment"
                                options={this.props.typeOfEmployments}
                                onChange={(e) =>
                                  this.props.changeSelect(
                                    e,
                                    "coApplicantTypeOfEmployment",
                                    "selectedCoApplicantTypeOfEmployment"
                                  )
                                }
                                value={
                                  this.props.selectedCoApplicantTypeOfEmployment
                                }
                                className="react-select-main"
                                classNamePrefix="react-select"
                                components={{
                                  Option: renderOption,
                                  MenuList: renderScrollbarTypeEmployee,
                                }}
                                captureMenuScroll={false}
                              />
                              {/* <select className="form-control">
                                                <option> Full-time </option>
                                                <option> 1 </option>
                                                <option> 2 </option>
                                            </select> */}
                            </div>
                          )
                        ) : null}
                      </div>
                      {this.props.coApplicantEmploymentStatus ===
                        "Unemployed" ||
                      this.props.coApplicantEmploymentStatus === "Retired" ||
                      this.props.coApplicantEmploymentStatus ===
                        "Self employed" ? null : (
                        <div className="form-field-row two-col clearfix">
                          <div className="form-field-col">
                            <label> Employer Name </label>
                            <input
                              type="text"
                              className="form-control"
                              name="coApplicantEmployerName"
                              placeholder="Employer Name"
                              value={this.props.coApplicantEmployerName}
                              onChange={this.props.handleOnChange}
                            />
                          </div>
                          <div className="form-field-col">
                            <label> Occupation </label>
                            <input
                              type="text"
                              className="form-control"
                              name="coApplicantOccupation"
                              placeholder="Occupation"
                              value={this.props.coApplicantOccupation}
                              onChange={this.props.handleOnChange}
                            />
                          </div>
                        </div>
                      )}

                      <div className="form-field-row two-col clearfix">
                        {this.props.coApplicantEmploymentStatus ===
                          "Unemployed" ||
                        this.props.coApplicantEmploymentStatus ===
                          "Retired" ? null : (
                          <div className="form-field-col">
                            <label> Employment since </label>
                            <DatePicker
                              required
                              renderCustomHeader={({
                                date,
                                changeYear,
                                changeMonth,
                                decreaseMonth,
                                increaseMonth,
                                prevMonthButtonDisabled,
                                nextMonthButtonDisabled,
                              }) => (
                                <div
                                  style={{
                                    margin: 10,
                                    display: "flex",
                                    justifyContent: "center",
                                  }}
                                >
                                  <button
                                    onClick={decreaseMonth}
                                    disabled={prevMonthButtonDisabled}
                                    type="button"
                                  >
                                    {"<"}
                                  </button>
                                  <select
                                    value={getYear(date)}
                                    onChange={({ target: { value } }) =>
                                      changeYear(value)
                                    }
                                    dateFormat="YYYY-MM-DD"
                                  >
                                    {years.map((option) => (
                                      <option key={option} value={option}>
                                        {option}
                                      </option>
                                    ))}
                                  </select>

                                  <select
                                    value={months[getMonth(date)]}
                                    onChange={({ target: { value } }) =>
                                      changeMonth(months.indexOf(value))
                                    }
                                  >
                                    {months.map((option) => (
                                      <option key={option} value={option}>
                                        {option}
                                      </option>
                                    ))}
                                  </select>
                                  <button
                                    onClick={increaseMonth}
                                    disabled={nextMonthButtonDisabled}
                                    type="button"
                                  >
                                    {">"}
                                  </button>
                                </div>
                              )}
                              selected={this.props.coApplicantEmploymentSince}
                              placeholderText="YYYY-MM-DD"
                              dateFormat="yyyy-MM-dd"
                              onChange={(e) =>
                                this.props.handleOnChangeDates(
                                  e,
                                  "coApplicantEmploymentSince"
                                )
                              }
                              maxDate={new Date()}
                              className="form-control"
                              name="coApplicantEmploymentSince"
                            />
                            {/* <input type="text" className="form-control" name="" placeholder="1992-01-26" /> */}
                          </div>
                        )}
                        {this.props.coApplicantEmploymentStatus !==
                        "Self employed" ? null : (
                          <div className="form-field-col">
                            <label> Type of Business </label>
                            <input
                              type="text"
                              className="form-control"
                              name="coApplicantTypeOfBusniess"
                              placeholder="Type of Business"
                              value={this.props.coApplicantTypeOfBusniess}
                              onChange={this.props.handleOnChange}
                            />
                          </div>
                        )}
                      </div>

                      {this.props.coEmploymentStatus === "Retired" ||
                        (this.props.coEmploymentStatus !== "Unemployed" && (
                          <>
                            {" "}
                            <div className="PostApp-Form mt-5">
                              <div className="clearfix ">
                                <label>Employer Street Address</label>
                                <input
                                  required
                                  type="text"
                                  className="form-control"
                                  id="coEmployerStreetAddress"
                                  name="coEmployerStreetAddress"
                                  placeholder=""
                                  value={this.props.coEmployerStreetAddress}
                                  onChange={this.props.handleOnChange}
                                />
                              </div>
                            </div>
                            <div className="form-field-row two-col clearfix">
                              <div className="form-field-col">
                                <label>Employer City</label>
                                <input
                                  type="text"
                                  id="coEmployerCity"
                                  name="coEmployerCity"
                                  className="form-control"
                                  placeholder=""
                                  value={this.props.coEmployerCity}
                                  onChange={this.props.handleOnChange}
                                />
                              </div>
                              <div className="form-field-col">
                                <label>Employer Province</label>
                                <input
                                  type="text"
                                  id="coEmployerProvince"
                                  name="coEmployerProvince"
                                  className="form-control"
                                  placeholder=""
                                  value={this.props.coEmployerProvince}
                                  onChange={this.props.handleOnChange}
                                />
                              </div>
                            </div>
                            <div className="form-field-row two-col clearfix">
                              <div className="form-field-col">
                                <label>Employer Phone</label>
                                <NumberFormat
                                  required
                                  className="form-control"
                                  value={this.props.coEmployerPhone}
                                  onChange={this.props.handleOnChange}
                                  allowNegative={false}
                                  id="coEmployerPhone"
                                  name="coEmployerPhone"
                                  placeholder=""
                                />
                              </div>

                              <div className="form-field-col">
                                <label>Employer Email (optional)</label>
                                <input
                                  className="form-control"
                                  type="email"
                                  id="coEmployerEmail"
                                  name="coEmployerEmail"
                                  placeholder=""
                                  value={this.props.coEmployerEmail}
                                  onChange={this.props.handleOnChange}
                                />
                              </div>
                            </div>{" "}
                          </>
                        ))}

                      {this.props.coApplicantEmploymentStatus ===
                      "Unemployed" ? null : (
                        <div className="gross-monthly-income co-applicant-slider">
                          <h2> Gross Monthly Income </h2>
                          <p>
                            {" "}
                            This is their total verifiable gross monthly sum of
                            income, including their salary, retirement income or
                            other sources of income they wish to have considered
                            as a basis for loan repayment{" "}
                          </p>
                          <div className="range-slider">
                            <Slider
                              min={0}
                              max={300000}
                              value={this.props.coApplicantGrossMonthlyIncome}
                              labels={horizontalLabels}
                              step={500}
                              // format={formatkg}
                              // handleLabel={horizontal}
                              onChange={this.props.handleChangeCoSlider}
                            />
                            {/* <h2> Range Slider here </h2> */}
                          </div>
                          {/* <div className="range-slider">
                                                <h2> Range Slider here </h2>
                                            </div> */}
                        </div>
                      )}
                    </div>
                    <div className="footer-btns-holder clearfix">
                      {/* <button className="btn btn-primary float-left"> Back  </button> */}
                      {/* <Link to={`${this.props.url}/applicant-detail`}> */}
                      <button
                        className="btn btn-primary float-left"
                        onClick={this.onBack}
                      >
                        {" "}
                        Back{" "}
                      </button>
                      {/* </Link> */}
                      {/* <Link to={`${this.props.url}/assets-detail`}> */}
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
                            this.update_buyer_detail("employment-information")
                          }
                        >
                          {" "}
                          Continue{" "}
                        </button>
                      )}
                      {/* <button className="btn btn-primary float-right active" onClick={() => this.update_buyer_detail('employment-information')}> Continue  </button> */}
                    </div>
                  </React.Fragment>
                ) : null}
              </div>
            </div>
          </div>
        </div>
        <ConfirmModel
          buttonAction={this.props.removeCoApplicant}
          id={this.state.coId}
          heading={"Delete Co Applicant?"}
          section1={"Are you sure you want to Delete this Co Applicant?"}
          section2={""}
        />
      </React.Fragment>
    );
  }
}
export default CoApplicant;
