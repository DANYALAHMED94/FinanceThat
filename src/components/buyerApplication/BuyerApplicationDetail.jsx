import React, { Component } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getMonth, getYear } from "date-fns";
import range from "lodash/range";
import NumberFormat from "react-number-format";
import Select, { components } from "react-select";
import { Scrollbars } from "react-custom-scrollbars";
import MaskedInput from "react-text-mask";
import { Link } from "react-router-dom";
import $ from "jquery";
import Slider from "react-rangeslider";
import "react-rangeslider/lib/index.css";
import dateFormat from "dateformat";

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
      $("#personal-detail").addClass("active");
      $("#personal-detail").addClass("show");
      $("#personal-detail").removeClass("tabDeactive");
      $("#employment-information").addClass("tabDeactive");
      $("#employment-information").removeClass("active");
      $("#employment-information").removeClass("show");
    } else {
      $("#personal-detail").removeClass("active");
      $("#personal-detail").removeClass("show");
      $("#employment-information").removeClass("tabDeactive");
      $("#personal-detail").addClass("tabDeactive");
      $("#employment-information").addClass("active");
      $("#employment-information").addClass("show");
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
      prevProps.updateBuyerApplicationEmployement !==
        this.props.updateBuyerApplicationEmployement &&
      this.props.updateBuyerApplicationEmployement !== undefined
    ) {
      if (this.props.coApplicant === true) {
        this.props.onClickChangeStep(1, 2);
        this.props.history.push(`${this.props.url}/co-applicant`);
      } else {
        this.props.onClickChangeStep(1, 3);
        this.props.history.push(`${this.props.url}/assets-detail`);
      }
    }
  }
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
        first_name: this.props.applicantFirstName,
        last_name: this.props.applicantLastName,
        dob: dateFormat(this.props.applicantDateOfBirth, "yyyy-mm-dd"),
        telephone: this.props.applicantTelephone,
        address: this.props.applicantStreetAddress,
        province: this.props.applicantProvince,
        city: this.props.applicantCity,
        postal_code: this.props.applicantPostalCode,
        country: this.props.applicantCountry,
        status: this.props.selectedStatus,
        duration_address_mn: this.props.duration_address_mn,
        duration_address_yr: this.props.duration_address_yr,
        mortgage_amount: this.props.mortgage_amount,
        sin: this.props.applicantSin,
        marital_status: this.props.applicantMaritalStatus,
        additional_item: [],
      };
      console.log(data);
      this.props.update_application_detail(
        data,
        "updateBuyerApplicationPersonal"
      );
    } else {
      // const data = {
      //     id: this.props.buyerAppId,
      //     employement_status: this.props.employmentStatus,
      //     type_of_employment: this.props.typeOfEmployment,
      //     employer_name: this.props.employerName,
      //     occupation: this.props.occupation,
      //     employment_since: this.props.employmentSince,
      //     gross_income: this.props.grossMonthlyIncome,

      //     additional_item: []
      // }
      const data = {
        id: this.props.buyerAppId,
        employement_status: this.props.employmentStatus,
        employment_since: dateFormat(this.props.employmentSince, "yyyy-mm-dd"),
        gross_income: this.props.grossMonthlyIncome,
        additional_item: [],
      };
      if (this.props.employmentStatus === "Self employed") {
        data.business_name = this.props.employeeBusinessName;
        data.type_of_business = this.props.typeOfBusniess;
        data.employer_name = "";
        data.type_of_employment = "";
        data.occupation = "";
        data.employer_address = this.props.employerStreetAddress;
        data.employer_province = this.props.employerProvince;
        data.employer_city = this.props.employerCity;
        data.employer_email = this.props.employerEmail;
        data.employer_telephone = this.props.employerPhone;
      }
      if (this.props.employmentStatus === "Employed") {
        data.business_name = "";
        data.type_of_business = "";
        data.employer_name = this.props.employerName;
        data.type_of_employment = this.props.typeOfEmployment;
        data.occupation = this.props.occupation;
        data.employer_address = this.props.employerStreetAddress;
        data.employer_province = this.props.employerProvince;
        data.employer_city = this.props.employerCity;
        data.employer_email = this.props.employerEmail;
        data.employer_telephone = this.props.employerPhone;
      }
      if (this.props.employmentStatus === "Unemployed") {
        data.employement_status = "";
        data.occupation = "";
        data.employment_since = "";
        data.business_name = "";
        data.type_of_business = "";
        data.gross_income = "";
      }
      if (this.props.employmentStatus === "Retired") {
        data.employement_status = "";
        data.occupation = "";
        data.employment_since = "";
        data.business_name = "";
        data.type_of_business = "";
        data.gross_income = this.props.grossMonthlyIncome;
      }
      console.log(data);
      this.props.update_application_detail(
        data,
        "updateBuyerApplicationEmployement"
      );
    }
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
      0: "$0",
      [`${
        this.props.grossMonthlyIncomeSlider
          ? this.props.grossMonthlyIncomeSlider
          : 150000
      }`]: `${
        this.props.grossMonthlyIncome
          ? new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(Number(this.props.grossMonthlyIncome)) // '$100.00'
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
                    Personal Detail{" "}
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
                  {" "}
                  <span className="tabs-text employment-information">
                    {" "}
                    Employment Information{" "}
                  </span>{" "}
                </a>
              </li>
            </ul>
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
                        Detail{" "}
                      </h1>
                      {!this.props.coApplicant ? (
                        this.props.loading_edit_application ? null : (
                          <Link
                            className="nav-link"
                            to={`${this.props.url}/co-applicant`}
                            onClick={() => this.props.onClickChangeStep(1, 2)}
                          >
                            {" "}
                            <button className="btn btn-primary float-right">
                              {" "}
                              Add co-applicant{" "}
                            </button>
                          </Link>
                        )
                      ) : null}
                      {/* <button className="btn btn-primary float-right"> <i class="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i> </button> */}
                    </div>
                    <div className="form-main">
                      <div className="form-field-row two-col clearfix">
                        <div className="form-field-col">
                          <label> First Name </label>
                          <input
                            type="text"
                            required
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
                            selected={this.props.applicantDateOfBirth}
                            placeholderText="YYYY-MM-DD"
                            dateFormat="yyyy-MM-dd"
                            onChange={(e) =>
                              this.props.handleOnChangeDates(
                                e,
                                "applicantDateOfBirth"
                              )
                            }
                            maxDate={new Date()}
                            name="applicantDateOfBirth"
                            className="form-control callendar"
                          />
                        </div>
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
                            name="applicantStreetAddress"
                            placeholder="Street Address"
                            value={this.props.applicantStreetAddress}
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
                            placeholder="City"
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
                      <div className="form-field-row two-col clearfix">
                        <div className="form-field-col">
                          <label>Years at current address </label>
                          <NumberFormat
                            required
                            className="form-control"
                            value={this.props.duration_address_yr}
                            onChange={this.props.handleOnChange}
                            allowNegative={false}
                            id="duration_address_yr"
                            name="duration_address_yr"
                            placeholder="Years"
                          />
                        </div>
                        <div className="form-field-col">
                          <label> Months at current address </label>
                          <NumberFormat
                            required
                            className="form-control"
                            value={this.props.duration_address_mn}
                            onChange={this.props.handleOnChange}
                            allowNegative={false}
                            id="duration_address_mn"
                            name="duration_address_mn"
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
                            id="status"
                            name="status"
                            options={this.props.statuses}
                            onChange={(e) =>
                              this.props.changeSelect(
                                e,
                                "selectedStatus",
                                "status"
                              )
                            }
                            value={this.props.status}
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
                            value={this.props.mortgage_amount}
                            onChange={this.props.handleOnChange}
                            allowNegative={false}
                            id="mortgage_amount"
                            name="mortgage_amount"
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
                            value={this.props.applicantSin}
                            onChange={this.props.handleOnChange}
                            allowNegative={false}
                            id="applicantSin"
                            name="applicantSin"
                            placeholder="Sin"
                          />
                        </div>
                        <div className="form-field-col">
                          <label> Marital Status </label>
                          <Select
                            required
                            placeholder=""
                            id="selectApplicantMaritalStatus"
                            name="selectApplicantMaritalStatus"
                            options={this.props.maritalStatues}
                            onChange={(e) =>
                              this.props.changeSelect(
                                e,
                                "applicantMaritalStatus",
                                "selectApplicantMaritalStatus"
                              )
                            }
                            value={this.props.selectApplicantMaritalStatus}
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
                      <Link to="/buyer/my-application">
                        <button className="btn btn-primary float-left">
                          {" "}
                          Back{" "}
                        </button>
                      </Link>
                      {/* {this.props.coApplicant === true ? (<Link to={`${this.props.url}/co-applicant`}><button className="btn btn-primary float-right active" onClick={() => this.props.onClickChangeStep(2)}> Continue  </button></Link>) : (<Link to={`${this.props.url}/assets-detail`}><button className="btn btn-primary float-right active" onClick={() => this.props.onClickChangeStep(3)}> Continue  </button></Link>)} */}
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
                      <h1 className="">Applicant Employment Information </h1>
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
                                "employmentStatus",
                                "selectEmploymentStatus"
                              )
                            }
                            value={this.props.selectEmploymentStatus}
                            className="react-select-main"
                            classNamePrefix="react-select"
                            components={{
                              Option: renderOption,
                              MenuList: renderScrollbar2,
                            }}
                            captureMenuScroll={false}
                          />
                        </div>
                        {this.props.employmentStatus !== "Unemployed" &&
                        this.props.employmentStatus !== "Retired" ? (
                          this.props.employmentStatus === "Self employed" ? (
                            <div className="form-field-col">
                              <label> Business Name </label>
                              <input
                                type="text"
                                className="form-control"
                                name="employeeBusinessName"
                                placeholder="Business Name"
                                value={this.props.employeeBusinessName}
                                onChange={this.props.handleOnChange}
                              />
                            </div>
                          ) : (
                            <div className="form-field-col">
                              <label> Type of Employment </label>
                              <Select
                                required
                                placeholder=""
                                id="selectedTypeOfEmployment"
                                name="selectedTypeOfEmployment"
                                options={this.props.typeOfEmployments}
                                onChange={(e) =>
                                  this.props.changeSelect(
                                    e,
                                    "typeOfEmployment",
                                    "selectedTypeOfEmployment"
                                  )
                                }
                                value={this.props.selectedTypeOfEmployment}
                                className="react-select-main"
                                classNamePrefix="react-select"
                                components={{
                                  Option: renderOption,
                                  MenuList: renderScrollbarTypeEmployee,
                                }}
                                captureMenuScroll={false}
                              />
                            </div>
                          )
                        ) : null}
                      </div>
                      {this.props.employmentStatus === "Unemployed" ||
                      this.props.employmentStatus === "Retired" ||
                      this.props.employmentStatus === "Self employed" ? null : (
                        <div className="form-field-row two-col clearfix">
                          <div className="form-field-col">
                            <label> Employer Name </label>
                            <input
                              type="text"
                              className="form-control"
                              name="employerName"
                              placeholder="Employee Name"
                              value={this.props.employerName}
                              onChange={this.props.handleOnChange}
                            />
                          </div>
                          <div className="form-field-col">
                            <label> Occupation </label>
                            <input
                              type="text"
                              className="form-control"
                              name="occupation"
                              placeholder="Occupation"
                              value={this.props.occupation}
                              onChange={this.props.handleOnChange}
                            />
                          </div>
                        </div>
                      )}

                      <div className="form-field-row two-col clearfix">
                        {this.props.employmentStatus === "Unemployed" ||
                        this.props.employmentStatus === "Retired" ? null : (
                          <div className="form-field-col">
                            <label>
                              {this.props.employmentStatus === "Self employed"
                                ? "Duration of Business"
                                : "Employment since"}
                            </label>
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
                              selected={this.props.employmentSince}
                              placeholderText="YYYY-MM-DD"
                              dateFormat="yyyy-MM-dd"
                              onChange={(e) =>
                                this.props.handleOnChangeDates(
                                  e,
                                  "employmentSince"
                                )
                              }
                              maxDate={new Date()}
                              className="form-control"
                            />
                            {/* <label> Employment since </label>
                                        <input type="text" className="form-control" name="" placeholder="1992-01-26" /> */}
                          </div>
                        )}
                        {this.props.employmentStatus !==
                        "Self employed" ? null : (
                          <div className="form-field-col">
                            <label> Type of Business </label>
                            <input
                              type="text"
                              className="form-control"
                              name="typeOfBusniess"
                              placeholder="Type of Business"
                              value={this.props.typeOfBusniess}
                              onChange={this.props.handleOnChange}
                            />
                          </div>
                        )}
                      </div>
                      {this.props.employmentStatus === "Retired" ||
                        (this.props.employmentStatus !== "Unemployed" && (
                          <>
                            {" "}
                            <div className="PostApp-Form mt-5">
                              <div className="clearfix ">
                                <label>Employer Street Address</label>
                                <input
                                  required
                                  type="text"
                                  className="form-control"
                                  id="employerStreetAddress"
                                  name="employerStreetAddress"
                                  placeholder=""
                                  value={this.props.employerStreetAddress}
                                  onChange={this.props.handleOnChange}
                                />
                              </div>
                            </div>
                            <div className="form-field-row two-col clearfix">
                              <div className="form-field-col">
                                <label>Employer City</label>
                                <input
                                  type="text"
                                  id="employerCity"
                                  name="employerCity"
                                  className="form-control"
                                  placeholder=""
                                  value={this.props.employerCity}
                                  onChange={this.props.handleOnChange}
                                />
                              </div>
                              <div className="form-field-col">
                                <label>Employer Province</label>
                                <input
                                  type="text"
                                  id="employerProvince"
                                  name="employerProvince"
                                  className="form-control"
                                  placeholder=""
                                  value={this.props.employerProvince}
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
                                  value={this.props.employerPhone}
                                  onChange={this.props.handleOnChange}
                                  allowNegative={false}
                                  id="employerPhone"
                                  name="employerPhone"
                                  placeholder=""
                                />
                              </div>

                              <div className="form-field-col">
                                <label>Employer Email (optional)</label>
                                <input
                                  className="form-control"
                                  type="email"
                                  id="employerEmail"
                                  name="employerEmail"
                                  placeholder=""
                                  value={this.props.employerEmail}
                                  onChange={this.props.handleOnChange}
                                />
                              </div>
                            </div>{" "}
                          </>
                        ))}

                      {this.props.employmentStatus === "Unemployed" ? null : (
                        <div className="gross-monthly-income">
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
                              value={this.props.grossMonthlyIncome}
                              labels={horizontalLabels}
                              step={500}
                              // format={formatkg}
                              // handleLabel={horizontal}
                              onChange={this.props.handleChangeSlider}
                            />
                            {/* <h2> Range Slider here </h2> */}
                          </div>
                        </div>
                      )}
                    </div>
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
                          onClick={() =>
                            this.update_buyer_detail("employment-information")
                          }
                        >
                          {" "}
                          Continue{" "}
                        </button>
                      )}
                      {/* {this.props.coApplicant === true ? (<Link to={`${this.props.url}/co-applicant`}><button className="btn btn-primary float-right active" onClick={() => this.props.onClickChangeStep(2)}> Continue  </button></Link>) : (<Link to={`${this.props.url}/assets-detail`}><button className="btn btn-primary float-right active" onClick={() => this.props.onClickChangeStep(3)}> Continue  </button></Link>)} */}
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
