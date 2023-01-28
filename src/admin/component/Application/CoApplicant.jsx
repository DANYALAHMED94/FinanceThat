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
import moment from "moment";
import Slider from "react-rangeslider";
import "react-rangeslider/lib/index.css";
import ConfirmModel from "../alertModel/ConfirmModel";
import { API_URL } from "../../../constant";
import dateFormat from "dateformat";
import ApplicationHeaderAdmin from "./ApplicationHeaderAdmin";
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
    var previousApplicantAddress = {};
    if (
      this.props.coApplicantDuration_address_yr > 0 &&
      this.props.coApplicantDuration_address_yr < 2
    ) {
      previousApplicantAddress = {
        street_address: this.props.coApplicantPreviousStreetAddress || "",
        street_address_2: this.props.coApplicantPreviousStreetAddress2 || "",
        city: this.props.coPreviousCity || "",
        postal_code: this.props.coPreviousPostalCode || "",
        province: this.props.coPreviousProvince || "",
        status: this.props.coPreviousStatus || "",
        duration_address_mn: this.props.coDurationAtPreviousAddressMonth || "",
        duration_address_yr: this.props.coDurationAtPreviousAddress || "",
        mortgage_amount: this.props.coPreviousMortgageAmount || "",
        country: this.props.coPreviousCountry || "",
      };
    }
    var previousEmploymentAddress = {};
    if (
      this.props.coEmploymentSinceYear > 0 &&
      this.props.coEmploymentSinceYear < 2
    ) {
      previousEmploymentAddress = {
        employement_status: this.props.previousCoEmploymentStatus || "",
        // employment_since: dateFormat(this.props.previous, "yyyy-mm-dd"),
        gross_income: this.props.coApplicantPreviousMonthlyGrossIncome || "",
        employer_address: this.props.previousCoEmployerStreetAddress || "",
        employer_city: this.props.previousCoEmployerCity || "",
        employer_email: this.props.previousCoEmployerEmail || "",
        employer_province: this.props.previousCoEmployerProvince || "",
        employer_telephone: this.props.previousCoEmployerPhone || "",
      };
      if (this.props.previousCoEmploymentStatus === "Self employed") {
        previousEmploymentAddress.business_name =
          this.props.previousCoEmployeeBusinessName || "";
        previousEmploymentAddress.type_of_business =
          this.props.coApplicantTypeOfBusniess || "";
        previousEmploymentAddress.employer_name = "";
        previousEmploymentAddress.type_of_employment = "";
        previousEmploymentAddress.occupation = "";
        previousEmploymentAddress.employer_address =
          this.props.previousCoEmployerStreetAddress || "";
        previousEmploymentAddress.employer_city =
          this.props.previousCoEmployerCity || "";
        previousEmploymentAddress.employer_email =
          this.props.previousCoEmployerEmail || "";
        previousEmploymentAddress.employer_province =
          this.props.previousCoEmployerProvince || "";
        previousEmploymentAddress.employer_telephone =
          this.props.previousCoEmployerPhone || "";
      }
      if (this.props.previousCoEmploymentStatus === "Employed") {
        previousEmploymentAddress.business_name = "";
        previousEmploymentAddress.type_of_business = "";
        previousEmploymentAddress.employer_name =
          this.props.previousCoEmployerName || "";
        previousEmploymentAddress.type_of_employment =
          this.props.coApplicantTypeOfEmployment || "";
        previousEmploymentAddress.occupation =
          this.props.previousCoOccupation || "";
        previousEmploymentAddress.employer_address =
          this.props.previousCoEmployerStreetAddress || "";
        previousEmploymentAddress.employer_city =
          this.props.previousCoEmployerCity || "";
        previousEmploymentAddress.employer_email =
          this.props.previousCoEmployerEmail || "";
        previousEmploymentAddress.employer_province =
          this.props.previousCoEmployerProvince || "";
        previousEmploymentAddress.employer_telephone =
          this.props.previousCoEmployerPhone || "";
      }
      if (this.props.previousCoEmploymentStatus === "Unemployed") {
        previousEmploymentAddress.employement_status = "";
        previousEmploymentAddress.occupation = "";
        previousEmploymentAddress.employment_since = "";
        previousEmploymentAddress.business_name = "";
        previousEmploymentAddress.type_of_business = "";
        previousEmploymentAddress.gross_income = "";
      }
      if (this.props.previousCoEmploymentStatus === "Retired") {
        previousEmploymentAddress.employement_status = "";
        previousEmploymentAddress.occupation = "";
        previousEmploymentAddress.employment_since = "";
        previousEmploymentAddress.business_name = "";
        previousEmploymentAddress.type_of_business = "";
        previousEmploymentAddress.gross_income =
          this.props.coApplicantPreviousMonthlyGrossIncome || "";
      }
    }
    if (para === "personal-detail") {
      const data = {
        id: this.props.buyerAppId,
        admin_user_type: localStorage.getItem("admin_user_type"),
        co_applicant: {
          salutation: this.props.coSalutation || "",
          first_name: this.props.coApplicantFirstName || "",
          last_name: this.props.coApplicantLastName || "",
          gender: this.props.coGender || "",
          dob:
            dateFormat(this.props.coApplicantDateOfBirth, "yyyy-mm-dd") || "",
          telephone: this.props.coApplicantTelephone || "",
          address: this.props.coApplicantStreetAddress || "",
          province: this.props.coApplicantProvince || "",
          city: this.props.coApplicantCity || "",
          postal_code: this.props.coApplicantPostalCode || "",
          country: this.props.coApplicantCountry || "",
          status: this.props.coApplicantSelectedStatus || "",
          duration_address_mn: this.props.coApplicantDuration_address_mn || "",
          duration_address_yr: this.props.coApplicantDuration_address_yr || "",
          mortgage_amount: this.props.coApplicantMortgage_amount || "",
          marital_status: this.props.coApplicantMaritalStatus || "",
          sin: this.props.coApplicantSin || "",
          previous_applicant_address: { ...(previousApplicantAddress || {}) },
          previous_employer_address: { ...(previousEmploymentAddress || {}) },
        },
        additional_item: [],
      };
      console.log(data);
      this.props.update_application_detail(
        data,
        "updateCoBuyerApplicationPersonal"
      );
    } else {
      const data = {
        id: this.props.buyerAppId,
        admin_user_type: localStorage.getItem("admin_user_type"),
        co_applicant: {
          employement_status: this.props.coApplicantEmploymentStatus || "",
          employment_since: dateFormat(
            this.props.coApplicantEmploymentSince,
            "yyyy-mm-dd"
          ),
          gross_income: this.props.coApplicantMonthlyGrossIncome || "",
        },
        previous_applicant_address: { ...(previousApplicantAddress || {}) },
        previous_employer_address: { ...(previousEmploymentAddress || {}) },
        additional_item: [],
      };
      if (this.props.coApplicantEmploymentStatus === "Self employed") {
        data.co_applicant.business_name =
          this.props.coApplicantBusniessName || "";
        data.co_applicant.type_of_business =
          this.props.coApplicantTypeOfBusniess || "";
        data.co_applicant.employer_name = "";
        data.co_applicant.type_of_employment = "";
        data.co_applicant.occupation = "";
        data.co_applicant.employer_address =
          this.props.coEmployerStreetAddress || "";
        data.co_applicant.employer_city = this.props.coEmployerCity || "";
        data.co_applicant.employer_email = this.props.coEmployerEmail || "";
        data.co_applicant.employer_province =
          this.props.coEmployerProvince || "";
        data.co_applicant.employer_telephone = this.props.coEmployerPhon || "";
      }
      if (this.props.coApplicantEmploymentStatus === "Employed") {
        data.co_applicant.business_name = "";
        data.co_applicant.type_of_business = "";
        data.co_applicant.employer_name =
          this.props.coApplicantEmployerName || "";
        data.co_applicant.type_of_employment =
          this.props.coApplicantTypeOfEmployment || "";
        data.co_applicant.occupation = this.props.coApplicantOccupation || "";
        data.co_applicant.employer_address =
          this.props.coEmployerStreetAddress || "";
        data.co_applicant.employer_city = this.props.coEmployerCity || "";
        data.co_applicant.employer_email = this.props.coEmployerEmail || "";
        data.co_applicant.employer_province =
          this.props.coEmployerProvince || "";
        data.co_applicant.employer_telephone = this.props.coEmployerPhon || "";
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
          this.props.coApplicantMonthlyGrossIncome || "";
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
    const renderScrollbarSalutation = (props) => {
      return (
        <div style={{ height: 105 }}>
          <Scrollbars>{props.children}</Scrollbars>
        </div>
      );
    };
    const horizontalLabels = {
      0: "$0",
      [`${
        this.props.coApplicantDefaultGrossMonthlyIncome !== null &&
        this.props.coApplicantDefaultGrossMonthlyIncome !== ""
          ? this.props.coApplicantDefaultGrossMonthlyIncome
          : 150000
      }`]: `${
        this.props.coApplicantDefaultGrossMonthlyIncome !== null &&
        this.props.coApplicantDefaultGrossMonthlyIncome !== ""
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
    let first = this.props.coApplicantFirstName
      ? this.props.coApplicantFirstName.split(" ")[0]
      : "";
    let last = this.props.coApplicantLastName
      ? this.props.coApplicantLastName.split(" ")[0]
      : "";
    first = first ? first.charAt(0).toUpperCase() : "";
    last = last ? last.charAt(0).toUpperCase() : "";
    return (
      <React.Fragment>
        <div className="app-form-content">
          <div className="app-form-content-inner">
          <ApplicationHeaderAdmin {...this.props} />

            {/* <div className="admin-form-head">
              <div className="admin-form-head-inner">
                {/* <span style={{ backgroundImage: 'url(/assets/image/avatar-image.png)' }} className="avatar"> *
                {/* </span> *
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
                {/* {`${first}${last}`} *
                <strong className="title d-inline-block">
                  {" "}
                  {`${
                    this.props.coApplicantFirstName != undefined &&
                    this.props.coApplicantFirstName != null
                      ? this.props.coApplicantFirstName || ""
                      : ""
                  } ${
                    this.props.coApplicantLastName != undefined &&
                    this.props.coApplicantLastName != null
                      ? this.props.coApplicantLastName || ""
                      : ""
                  }`}{" "}
                </strong>
                {/* <span className="date d-inline-block"> {this.props.created_at != null && this.props.created_at != undefined && this.props.created_at !== '' ? moment(this.props.created_at).format('ll') : ''} </span>  *
                <span className="type d-inline-block">
                  {" "}
                  {this.props.firstTypeOfVehicle}{" "}
                </span>
                <span className="type d-inline-block">
                  {" "}
                  {`ID: ${this.props.buyerAppId}`}{" "}
                </span>
                <p>
                  {" "}
                  <span className="">
                    {" "}
                    <em>PH:</em>{" "}
                    {this.props.coApplicantTelephone
                      ? this.props.coApplicantTelephone || ""
                      : ""}{" "}
                  </span>
                  <span className="">
                    {" "}
                    <em>SIN:</em>{" "}
                    {this.props.coApplicantSin
                      ? this.props.coApplicantSin || ""
                      : ""}{" "}
                  </span>
                  {/* <span className=""> <em>E:</em>{this.props.coApplicantEmail != undefined && this.props.coApplicantEmail != null ? this.props.coApplicantEmail || '' : ''} </span> *
                </p>
                {this.props.selectedAgent &&
                Object.keys(this.props.selectedAgent).length > 0 ? (
                  <Link
                    className="nav-link"
                    to={`${this.props.url}/assign-agent`}
                  >
                    {" "}
                    <span className="name">
                      {" "}
                      {`${
                        this.props.selectedAgent &&
                        Object.keys(this.props.selectedAgent).length > 0
                          ? this.props.selectedAgent.label
                          : ""
                      } `}{" "}
                    </span>
                  </Link>
                ) : null}
                {/* <span className="name"> {`${this.props.coApplicantFirstName != undefined && this.props.coApplicantFirstName != null ? this.props.coApplicantFirstName || '' : ''} ${this.props.coApplicantLastName != undefined && this.props.coApplicantLastName != null ? this.props.coApplicantLastName || '' : ''}`} </span> *
              </div>
            </div> */}
            <ul
              className="nav nav-tabs-2 admin-tabs two-items co-applicant"
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
                      {/* {this.props.coApplicantId ? (
                        <Link
                          to={
                            "/admin/application/co-applicant-credit-report/" +
                            this.props.buyerAppId
                          }
                          className="btn btn-primary"
                          target="_blank"
                        >
                          {" "}
                          Co Applicant Credit Report{" "}
                        </Link>
                      ) : null} */}
                      <span
                        className="del"
                        data-toggle="modal"
                        data-target="#confirmModelAdmin"
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
                          <label>Salutation</label>
                          <Select
                            required
                            placeholder="Select Salutation"
                            id="selectCoSalutation"
                            name="coSalutation"
                            options={this.props.salutations}
                            onChange={(e) =>
                              this.props.changeSelect(
                                e,
                                "coSalutation",
                                "selectCoSalutation"
                              )
                            }
                            value={this.props.selectCoSalutation}
                            className="react-select-main"
                            classNamePrefix="react-select"
                            components={{
                              Option: renderOption,
                              MenuList: renderScrollbarSalutation,
                            }}
                            captureMenuScroll={false}
                          />
                        </div>
                      </div>
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
                          <label> Telephone</label>
                          <NumberFormat
                            required
                            className="form-control"
                            format="+1 (###) ###-####"
                            placeholder="+1 (123) 456-7890"
                            onChange={this.props.handleOnChange}
                            value={this.props.coApplicantTelephone}
                            name="coApplicantTelephone"
                          />
                        </div>
                      </div>

                      <div className="form-field-row two-col clearfix">
                        <div className="form-field-col">
                          <label> Gender </label>
                          <Select
                            required
                            placeholder="Gender"
                            id="selectCoGender"
                            name="coGender"
                            options={this.props.genders}
                            onChange={(e) =>
                              this.props.changeSelect(
                                e,
                                "coGender",
                                "selectCoGender"
                              )
                            }
                            value={this.props.selectCoGender}
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
                          <label> Email</label>
                          <input
                            type="email"
                            className="form-control"
                            name="coApplicantEmail"
                            placeholder="Email"
                            value={this.props.coApplicantEmail}
                            onChange={this.props.handleOnChange}
                          />
                        </div>
                      </div>
                      <h1 className="mt-5 pt-4" style={{ fontSize: "18px" }}>
                        Current Address
                      </h1>
                      <div className="form-field-row clearfix">
                        <div className="form-field-col">
                          <label> Street Address </label>
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
                      <div className="form-field-row clearfix">
                        <div className="form-field-col">
                          <label> Street Address Line 2 </label>
                          <input
                            type="text"
                            className="form-control"
                            name="coApplicantStreetAddress2"
                            placeholder="Street Address Line 2 (Suite, unit etc...)"
                            value={this.props.coApplicantStreetAddress2}
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
                            placeholder="Wellington"
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
                            placeholder="Canada"
                            value={this.props.coApplicantCountry}
                            onChange={this.props.handleOnChange}
                          />
                        </div>
                      </div>
                      <div className="form-field-row two-col clearfix">
                        <div className="form-field-col">
                          <label> Years at current address </label>
                          <Select
                            required
                            placeholder=""
                            options={[
                              { label: "Less than 1 year", value: "1" },
                              { label: "1 - 3 years", value: "1-3" },
                              { label: "3 - 5 years", value: "3-5" },
                              { label: "5 or more years", value: "5+" },
                            ]}
                            onChange={(e) =>
                              this.props.handleOnChangeYears(
                                e,
                                "coApplicantDuration_address_yr"
                              )
                            }
                            value={
                              [
                                { label: "Less than 1 year", value: "-1" },
                                { label: "1 - 3 years", value: "1-3" },
                                { label: "3 - 5 years", value: "3-5" },
                                { label: "5 or more years", value: "5+" },
                              ].filter(
                                (item) =>
                                  item.value ===
                                  this.props.coApplicantDuration_address_yr
                              )?.[0]
                            }
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
                      </div>
                      <div className="form-field-row two-col clearfix">
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

                      {this.props.coApplicantDuration_address_yr &&
                        this.props.coApplicantDuration_address_yr < 2 && (
                          <>
                            <h1
                              className="mt-5 pt-4"
                              style={{ fontSize: "18px" }}
                            >
                              Previous Address
                            </h1>
                            <div className="form-field-row clearfix">
                              <div className="form-field-col">
                                <label>Previous Street Address </label>

                                <input
                                  type="text"
                                  className="form-control"
                                  name="coApplicantPreviousStreetAddress"
                                  placeholder="Street Address"
                                  value={
                                    this.props.coApplicantPreviousStreetAddress
                                  }
                                  onChange={this.props.handleOnChange}
                                />
                              </div>
                            </div>
                            <div className="form-field-row clearfix">
                              <div className="form-field-col">
                                <label>Previous Street Address Line 2 </label>

                                <input
                                  type="text"
                                  className="form-control"
                                  name="coApplicantPreviousStreetAddress2"
                                  placeholder="Street Address Line 2 (Suite, unit etc...)"
                                  value={
                                    this.props.coApplicantPreviousStreetAddress2
                                  }
                                  onChange={this.props.handleOnChange}
                                />
                              </div>
                            </div>
                            <div className="form-field-row two-col clearfix">
                              <div className="form-field-col">
                                <label>Previous City </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  name="coPreviousCity"
                                  placeholder="City"
                                  value={this.props.coPreviousCity}
                                  onChange={this.props.handleOnChange}
                                />
                              </div>
                              <div className="form-field-col">
                                <label>Previous Province </label>
                                <Select
                                  required
                                  placeholder="Select Province"
                                  id="selectedPreviousCoApplicantProvince"
                                  name="selectedPreviousCoApplicantProvince"
                                  options={this.props.provinces}
                                  onChange={(e) =>
                                    this.props.changeSelect(
                                      e,
                                      "coPreviousProvince",
                                      "selectedPreviousCoApplicantProvince"
                                    )
                                  }
                                  value={
                                    this.props
                                      .selectedPreviousCoApplicantProvince
                                  }
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
                                <label> Previous Postal Code </label>
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
                                  id="coPreviousPostalCode"
                                  name="coPreviousPostalCode"
                                  value={this.props.coPreviousPostalCode}
                                  onChange={this.props.handleOnChange}
                                />
                                {/* <input type="text" className="form-control" name="" placeholder="L6T 3J5" /> */}
                              </div>
                              <div className="form-field-col">
                                <label>Previous Country </label>
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
                                <label> Years at previous address </label>
                                <NumberFormat
                                  required
                                  className="form-control"
                                  value={this.props.coDurationAtPreviousAddress}
                                  onChange={this.props.handleOnChange}
                                  allowNegative={false}
                                  id="coDurationAtPreviousAddress"
                                  name="coDurationAtPreviousAddress"
                                  placeholder="Years"
                                />
                              </div>
                              <div className="form-field-col">
                                <label> Months at current address </label>
                                <NumberFormat
                                  required
                                  className="form-control"
                                  value={
                                    this.props.coDurationAtPreviousAddressMonth
                                  }
                                  onChange={this.props.handleOnChange}
                                  allowNegative={false}
                                  id="coDurationAtPreviousAddressMonth"
                                  name="coDurationAtPreviousAddressMonth"
                                  placeholder="Months"
                                />
                              </div>
                            </div>
                            <div className="form-field-row two-col clearfix">
                              <div className="form-field-col">
                                <label>Previous Status </label>
                                <Select
                                  required
                                  placeholder="Select Previous Status"
                                  id="coApplicantPreviousStatus"
                                  name="coApplicantPreviousStatus"
                                  options={this.props.statuses}
                                  onChange={(e) =>
                                    this.props.changeSelect(
                                      e,
                                      "coPreviousStatus",
                                      "coApplicantPreviousStatus"
                                    )
                                  }
                                  value={this.props.coApplicantPreviousStatus}
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
                                  value={this.props.coPreviousMortgageAmount}
                                  onChange={this.props.handleOnChange}
                                  allowNegative={false}
                                  id="coPreviousMortgageAmount"
                                  name="coPreviousMortgageAmount"
                                  placeholder="Amount"
                                />
                              </div>
                            </div>
                          </>
                        )}
                    </div>
                    <div class="switch-holder">
                      <input
                        id="swicth"
                        type="checkbox"
                        name="co_personal_complete"
                        checked={this.props.co_personal_complete}
                        onChange={(e) =>
                          this.props.changeCompleteStatus(
                            e,
                            "co_personal_complete"
                          )
                        }
                      />
                      <label for="swicth" class="switch">
                        <div></div>
                      </label>
                      <span class="switch-label"> Complete </span>
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
                      <h1 className="">
                        {" "}
                        Co-applicant's Employment Information{" "}
                      </h1>
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
                                <Select
                                  required
                                  placeholder="Select Province"
                                  id="selectedCoEmployerProvince"
                                  name="selectedCoEmployerProvince"
                                  options={this.props.provinces}
                                  onChange={(e) =>
                                    this.props.changeSelect(
                                      e,
                                      "coEmployerProvince",
                                      "selectedCoEmployerProvince"
                                    )
                                  }
                                  value={this.props.selectedCoEmployerProvince}
                                  className="react-select-main "
                                  classNamePrefix="react-select"
                                  components={{
                                    Option: renderOption,
                                    MenuList: renderScrollbar,
                                  }}
                                  captureMenuScroll={false}
                                />
                                {/* <input
                                  type="text"
                                  id="coEmployerProvince"
                                  name="coEmployerProvince"
                                  className="form-control"
                                  placeholder=""
                                  value={this.props.coEmployerProvince}
                                  onChange={this.props.handleOnChange}
                                /> */}
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
                                  format="+1 (###) ###-####"
                                  placeholder="+1 (123) 456-7890"
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
                        // <div className="gross-monthly-income co-applicant-slider">
                        //   <h2> Gross Monthly Income </h2>
                        <div className="form-field-row two-col clearfix">
                          <div className="form-field-col">
                            <label>Monthly Income</label>
                            <Select
                              required
                              placeholder=""
                              id="coApplicantSelectedMonthlyGrossIncome"
                              name="coApplicantSelectedMonthlyGrossIncome"
                              options={this.props.grossMonthlyIncomeValues}
                              onChange={(e) =>
                                this.props.changeSelect(
                                  e,
                                  "coApplicantMonthlyGrossIncome",
                                  "coApplicantSelectedMonthlyGrossIncome"
                                )
                              }
                              value={
                                this.props.coApplicantSelectedMonthlyGrossIncome
                              }
                              className="react-select-main"
                              classNamePrefix="react-select"
                              components={{
                                Option: renderOption,
                                MenuList: renderScrollbar2,
                              }}
                              captureMenuScroll={false}
                            />
                          </div>
                          <div className="form-field-col"></div>
                          {/* <p>
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
                              onChange={(v) =>
                                this.props.handleChangeSlider(
                                  "coApplicantGrossMonthlyIncome",
                                  v
                                )
                              }
                            />
                            {/* <h2> Range Slider here </h2>
                          </div> */}
                          {/* <div className="range-slider">
                                                <h2> Range Slider here </h2>
                                            </div> */}
                        </div>
                      )}
                    </div>
                    {this.props.coEmploymentSinceYear &&
                      this.props.coEmploymentSinceYear < 2 && (
                        <>
                          <div className="forms-head clearfix mt-5">
                            <h1 className="">
                              Applicant Previous Employment Information
                            </h1>
                          </div>
                          <div className="form-main">
                            <div className="form-field-row two-col clearfix">
                              <div className="form-field-col">
                                <label>Previous Employment Status </label>
                                <Select
                                  required
                                  placeholder=""
                                  id="selectPreviousCoApplicantEmploymentStatus"
                                  name="selectPreviousCoApplicantEmploymentStatus"
                                  options={this.props.employmentStatuses}
                                  onChange={(e) =>
                                    this.props.changeSelect(
                                      e,
                                      "previousCoEmploymentStatus",
                                      "selectPreviousCoApplicantEmploymentStatus"
                                    )
                                  }
                                  value={
                                    this.props
                                      .selectPreviousCoApplicantEmploymentStatus
                                  }
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
                              {this.props.previousCoEmploymentStatus !==
                                "Unemployed" &&
                              this.props.previousCoEmploymentStatus !==
                                "Retired" ? (
                                this.props.previousCoEmploymentStatus ===
                                "Self employed" ? (
                                  <div className="form-field-col">
                                    <label>Previous Business Name </label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      name="previousCoEmployeeBusinessName"
                                      placeholder="Business Name"
                                      value={
                                        this.props
                                          .previousCoEmployeeBusinessName
                                      }
                                      onChange={this.props.handleOnChange}
                                    />
                                  </div>
                                ) : (
                                  <div className="form-field-col">
                                    <label>Previous Type of Employment </label>
                                    <Select
                                      required
                                      placeholder=""
                                      id="selectedPreviousCoApplicantTypeOfEmployment"
                                      name="selectedPreviousCoApplicantTypeOfEmployment"
                                      options={this.props.employmentStatuses}
                                      onChange={(e) =>
                                        this.props.changeSelect(
                                          e,
                                          "previousCoTypeOfEmployment",
                                          "selectedPreviousCoApplicantTypeOfEmployment"
                                        )
                                      }
                                      value={
                                        this.props
                                          .selectedPreviousCoApplicantTypeOfEmployment
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
                            {this.props.previousCoEmploymentStatus ===
                              "Unemployed" ||
                            this.props.previousCoEmploymentStatus ===
                              "Retired" ||
                            this.props.previousCoEmploymentStatus ===
                              "Self employed" ? null : (
                              <div className="form-field-row two-col clearfix">
                                <div className="form-field-col">
                                  <label>Previous Employer Name </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="previousCoEmployerName"
                                    placeholder="Employer Name"
                                    value={this.props.previousCoEmployerName}
                                    onChange={this.props.handleOnChange}
                                  />
                                </div>
                                <div className="form-field-col">
                                  <label>Previous Occupation </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="previousCoOccupation"
                                    placeholder="Occupation"
                                    value={this.props.previousCoOccupation}
                                    onChange={this.props.handleOnChange}
                                  />
                                </div>
                              </div>
                            )}

                            <div className="form-field-row two-col clearfix">
                              {this.props.previousCoEmploymentStatus ===
                                "Unemployed" ||
                              this.props.previousCoEmploymentStatus ===
                                "Retired" ? null : (
                                <div className="form-field-col">
                                  <label>Previous Duration</label>
                                  <div className="flexCenter">
                                    <div className="flexCenter mr-3">
                                      <NumberFormat
                                        required
                                        className="form-control"
                                        value={
                                          this.props
                                            .previousCoEmploymentSinceYear
                                        }
                                        onChange={this.props.handleOnChange}
                                        allowNegative={false}
                                        id="previousCoEmploymentSinceYear"
                                        name="previousCoEmploymentSinceYear"
                                        style={{ width: "50px" }}
                                      />
                                      <label
                                        className="mb-0 ml-2"
                                        style={{ color: "#828385" }}
                                      >
                                        Years
                                      </label>
                                    </div>
                                    <div className="flexCenter">
                                      <NumberFormat
                                        required
                                        className="form-control"
                                        value={
                                          this.props
                                            .previousCoEmploymentSinceMonth
                                        }
                                        onChange={this.props.handleOnChange}
                                        allowNegative={false}
                                        id="previousCoEmploymentSinceMonth"
                                        name="previousCoEmploymentSinceMonth"
                                        style={{ width: "50px" }}
                                      />
                                      <label
                                        className="mb-0 ml-2"
                                        style={{ color: "#828385" }}
                                      >
                                        Month
                                      </label>
                                    </div>
                                  </div>
                                </div>
                              )}
                              {this.props.previousCoEmploymentStatus !==
                              "Self employed" ? null : (
                                <div className="form-field-col">
                                  <label> Type of Previous Business </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="previousCoEmployeeTypeOfBusiness"
                                    placeholder="Type of Business"
                                    value={
                                      this.props
                                        .previousCoEmployeeTypeOfBusiness
                                    }
                                    onChange={this.props.handleOnChange}
                                  />
                                </div>
                              )}
                            </div>

                            {this.props.previousCoEmploymentStatus ===
                              "Retired" ||
                              (this.props.previousCoEmploymentStatus !==
                                "Unemployed" && (
                                <>
                                  {" "}
                                  <div className="PostApp-Form mt-5">
                                    <div className="clearfix ">
                                      <label>
                                        Previous Employer Street Address
                                      </label>
                                      <input
                                        required
                                        type="text"
                                        className="form-control"
                                        id="previousCoEmployerStreetAddress"
                                        name="previousCoEmployerStreetAddress"
                                        placeholder=""
                                        value={
                                          this.props
                                            .previousCoEmployerStreetAddress
                                        }
                                        onChange={this.props.handleOnChange}
                                      />
                                    </div>
                                  </div>
                                  <div className="form-field-row two-col clearfix">
                                    <div className="form-field-col">
                                      <label>Previous Employer City</label>
                                      <input
                                        type="text"
                                        id="previousCoEmployerCity"
                                        name="previousCoEmployerCity"
                                        className="form-control"
                                        placeholder=""
                                        value={
                                          this.props.previousCoEmployerCity
                                        }
                                        onChange={this.props.handleOnChange}
                                      />
                                    </div>
                                    <div className="form-field-col">
                                      <label>Previous Employer Province</label>
                                      <input
                                        type="text"
                                        id="previousCoEmployerProvince"
                                        name="previousCoEmployerProvince"
                                        className="form-control"
                                        placeholder=""
                                        value={
                                          this.props.previousCoEmployerProvince
                                        }
                                        onChange={this.props.handleOnChange}
                                      />
                                    </div>
                                  </div>
                                  <div className="form-field-row two-col clearfix">
                                    <div className="form-field-col">
                                      <label>Previous Employer Phone</label>
                                      <NumberFormat
                                        required
                                        className="form-control"
                                        value={
                                          this.props.previousCoEmployerPhone
                                        }
                                        onChange={this.props.handleOnChange}
                                        allowNegative={false}
                                        id="previousCoEmployerPhone"
                                        name="previousCoEmployerPhone"
                                        format="+1 (###) ###-####"
                                        placeholder="+1 (123) 456-7890"
                                      />
                                    </div>

                                    <div className="form-field-col">
                                      <label>
                                        Previous Employer Email (optional)
                                      </label>
                                      <input
                                        className="form-control"
                                        type="email"
                                        id="previousCoEmployerEmail"
                                        name="previousCoEmployerEmail"
                                        placeholder=""
                                        value={
                                          this.props.previousCoEmployerEmail
                                        }
                                        onChange={this.props.handleOnChange}
                                      />
                                    </div>
                                  </div>{" "}
                                </>
                              ))}

                            {this.props.previousCoEmploymentStatus ===
                            "Unemployed" ? null : (
                              // <div className="gross-monthly-income co-applicant-slider">
                              //   <h2> Gross Monthly Income </h2>
                              <div className="form-field-row two-col clearfix">
                                <div className="form-field-col">
                                  <label>Monthly Income</label>
                                  <Select
                                    required
                                    placeholder=""
                                    id="coApplicantPreviousSelectedMonthlyGrossIncome"
                                    name="coApplicantPreviousSelectedMonthlyGrossIncome"
                                    options={
                                      this.props.grossMonthlyIncomeValues
                                    }
                                    onChange={(e) =>
                                      this.props.changeSelect(
                                        e,
                                        "coApplicantPreviousMonthlyGrossIncome",
                                        "coApplicantPreviousSelectedMonthlyGrossIncome"
                                      )
                                    }
                                    value={
                                      this.props
                                        .coApplicantPreviousSelectedMonthlyGrossIncome
                                    }
                                    className="react-select-main"
                                    classNamePrefix="react-select"
                                    components={{
                                      Option: renderOption,
                                      MenuList: renderScrollbar2,
                                    }}
                                    captureMenuScroll={false}
                                  />
                                </div>
                                <div className="form-field-col"></div>
                                {/* <p>
                                {" "}
                                This is their total verifiable gross monthly sum
                                of income, including their salary, retirement
                                income or other sources of income they wish to
                                have considered as a basis for loan repayment{" "}
                              </p>
                              <div className="range-slider">
                                <Slider
                                  min={0}
                                  max={300000}
                                  value={this.props.previousCoGrossIncome}
                                  labels={horizontalLabelsPrevious}
                                  step={500}
                                  // format={formatkg}
                                  // handleLabel={horizontal}
                                  onChange={(v) =>
                                    this.props.handleChangeSlider(
                                      "previousCoGrossIncome",
                                      v
                                    )
                                  }
                                />
                                {/* <h2> Range Slider here </h2>
                              </div> */}
                                {/* <div className="range-slider">
                                                <h2> Range Slider here </h2>
                                            </div> */}
                              </div>
                            )}
                          </div>
                        </>
                      )}

                    <div class="switch-holder">
                      <input
                        id="swicth"
                        type="checkbox"
                        name="co_employement_complete"
                        checked={this.props.co_employement_complete}
                        onChange={(e) =>
                          this.props.changeCompleteStatus(
                            e,
                            "co_employement_complete"
                          )
                        }
                      />
                      <label for="swicth" class="switch">
                        <div></div>
                      </label>
                      <span class="switch-label"> Complete </span>
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
