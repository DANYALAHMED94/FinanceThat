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
import { API_URL } from "../../../constant";
import dateFormat from "dateformat";
import ApplicationHeaderAdmin from "./ApplicationHeaderAdmin";

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
    console.log(!this.props.addAppLication);
    const defaultData = {
      co_applicant: {},
      required_documents: [],
      seller: {},
      user: localStorage.getItem("userId") || "",
      vehicle: [],
    };
    if (para === "personal-detail") {
      let data = {
        salutation: this.props.salutation || "",
        first_name: this.props.applicantFirstName || "",
        last_name: this.props.applicantLastName || "",
        address: this.props.locationName || "",
        gender: this.props.gender || "",
        dob: dateFormat(this.props.applicantDateOfBirth, "yyyy-mm-dd"),
        telephone: this.props.applicantTelephone || "",
        street_address: this.props.applicantStreetAddress || "",
        street_address2: this.props.applicantStreetAddress2 || "",
        province: this.props.applicantProvince || "",
        city: this.props.applicantCity || "",
        postal_code: this.props.applicantPostalCode || "",
        // email: this.props.applicantEmail || "",
        applicant_email: this.props.applicantEmail || "",
        country: this.props.applicantCountry || "",
        status: this.props.selectedStatus || "",
        duration_address_mn: this.props.duration_address_mn || "",
        duration_address_yr: this.props.duration_address_yr || "",
        mortgage_amount: this.props.mortgage_amount || "",
        sin: this.props.applicantSin || "",
        marital_status: this.props.applicantMaritalStatus || "",
        additional_item: [],
      };
      if (
        this.props.duration_address_yr > 0 &&
        this.props.duration_address_yr < 2
      ) {
        data.previous_applicant_address = {
          street_address: this.props.applicantPreviousStreetAddress || "",
          street_address_2: this.props.applicantPreviousStreetAddress2 || "",
          city: this.props.previousCity || "",
          postal_code: this.props.previousPostalCode || "",
          province: this.props.previousProvince || "",
          status: this.props.previousStatus || "",
          duration_address_mn: this.props.durationAtPreviousAddress || "",
          duration_address_yr: this.props.durationAtPreviousAddressMonth || "",
          mortgage_amount: this.props.previousMortgageAmount || "",
          country: this.props.previousCountry || "",
        };
      }
      if (!this.props.addAppLication) {
        data.id = this.props.buyerAppId;
        delete data["applicant_email"];
      }
      if (this.props.addAppLication) {
        data = {
          ...data,
          ...defaultData,
        };
        data.application_type = 3;
        data.application_status = 2;
        data.application_category = 1;
        /// add new key #Hammad
        this.props.add_new_application_detail(
          data,
          "updateBuyerApplicationPersonal"
        );
      } else {
        this.props.update_application_detail(
          data,
          "updateBuyerApplicationPersonal"
        );
      }
    } else {
      let data = {
        employement_status: this.props.employmentStatus,
        employment_since: dateFormat(this.props.employmentSince, "yyyy-mm-dd"),
        gross_income: this.props.monthlyGrossIncome,
        employer_address: this.props.employerStreetAddress,
        employer_city: this.props.employerCity,
        employer_email: this.props.employerEmail,
        employer_province: this.props.employerProvince,
        employer_telephone: this.props.employerPhone,
        additional_item: [],
        other_income: {
          income_amount:
            this.props.income_amount === ""
              ? 0
              : this.props.income_amount?.toString()?.split(",")?.join(""),
          income_type: this.props.income_type,
          income_frequency: this.props.income_frequency,
        },
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
        data.gross_income = this.props.monthlyGrossIncome;
      }
      if (
        this.props.employmentSinceYear &&
        this.props.employmentSinceYear < 2
      ) {
        data.previous_employer_address = {
          employement_status: this.props.previousEmploymentStatus || "",
          // employment_since: dateFormat(this.props.previous, "yyyy-mm-dd"),
          gross_income: this.props.previousMonthlyGrossIncome || "",
          employer_address: this.props.previousEmployerStreetAddress || "",
          employer_city: this.props.previousEmployerCity || "",
          employer_email: this.props.previousEmployerEmail || "",
          employer_province: this.props.previousEmployerProvince || "",
          employer_telephone: this.props.previousEmployerPhone || "",
          additional_item: [],
        };
      }
      if (this.props.previousEmploymentStatus === "Self employed") {
        data.previous_employer_address.business_name =
          this.props.previousEmployeeBusinessName || "";
        data.previous_employer_address.type_of_business =
          this.props.previousEmployeeTypeOfBusiness || "";
        data.previous_employer_address.employer_name = "";
        data.previous_employer_address.type_of_employment = "";
        data.previous_employer_address.occupation = "";
        data.previous_employer_address.employer_address =
          this.props.previousEmployerStreetAddress || "";
        data.previous_employer_address.employer_province =
          this.props.previousEmployerProvince || "";
        data.previous_employer_address.employer_city =
          this.props.previousEmployerCity || "";
        data.previous_employer_address.employer_email =
          this.props.previousEmployerEmail || "";
        data.previous_employer_address.employer_telephone =
          this.props.previousEmployerPhone || "";
      }
      if (this.props.previousEmploymentStatus === "Employed") {
        data.previous_employer_address.business_name = "";
        data.previous_employer_address.type_of_business = "";
        data.previous_employer_address.employer_name =
          this.props.previousEmployerName || "";
        data.previous_employer_address.type_of_employment =
          this.props.previousTypeOfEmployment || "";
        data.previous_employer_address.occupation =
          this.props.previousOccupation || "";
        data.previous_employer_address.employer_address =
          this.props.previousEmployerStreetAddress || "";
        data.previous_employer_address.employer_province =
          this.props.previousEmployerProvince || "";
        data.previous_employer_address.employer_city =
          this.props.previousEmployerCity || "";
        data.previous_employer_address.employer_email =
          this.props.previousEmployerEmail || "";
        data.previous_employer_address.employer_telephone =
          this.props.previousEmployerPhone || "";
      }
      if (this.props.previousEmploymentStatus === "Unemployed") {
        data.previous_employer_address.employement_status = "";
        data.previous_employer_address.occupation = "";
        data.previous_employer_address.employment_since = "";
        data.previous_employer_address.business_name = "";
        data.previous_employer_address.type_of_business = "";
        data.previous_employer_address.gross_income = "";
      }
      if (this.props.previousEmploymentStatus === "Retired") {
        data.previous_employer_address.employement_status = "";
        data.previous_employer_address.occupation = "";
        data.previous_employer_address.employment_since = "";
        data.previous_employer_address.business_name = "";
        data.previous_employer_address.type_of_business = "";
        data.previous_employer_address.gross_income =
          this.props.previousMonthlyGrossIncome || "";
      }
      console.log(data, "data1");
      if (!this.props.addAppLication) {
        data.id = this.props.buyerAppId;
      }
      if (this.props.addAppLication) {
        data = {
          ...data,
          ...defaultData,
        };
        data.application_status = 2;
        data.application_category = 1;
        this.props.add_new_application_detail(
          data,
          "updateBuyerApplicationEmployement"
        );
      } else {
        this.props.update_application_detail(
          data,
          "updateBuyerApplicationEmployement"
        );
      }
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
    const renderScrollbarOtherIncome = (props) => {
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
    const renderScrollbarSalutation = (props) => {
      return (
        <div style={{ height: 105 }}>
          <Scrollbars>{props.children}</Scrollbars>
        </div>
      );
    };
    const horizontalLabels = {
      // grossMonthlyIncomeSlider
      0: "$0",
      [`${
        this.props.grossMonthlyIncomeSlider !== null &&
        this.props.grossMonthlyIncomeSlider !== ""
          ? this.props.grossMonthlyIncomeSlider
          : 150000
      }`]: `${
        this.props.grossMonthlyIncomeSlider !== null &&
        this.props.grossMonthlyIncomeSlider !== ""
          ? new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(Number(this.props.grossMonthlyIncome)) // '$100.00'
          : new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(0)
      }`,
      300000: `${new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(300000)} `,
    };
    const horizontalLabelsPrevious = {
      0: "$0",
      [`${
        this.props.previousGrossIncomeSlider !== null &&
        this.props.previousGrossIncomeSlider !== ""
          ? this.props.previousGrossIncomeSlider
          : 150000
      }`]: `${
        this.props.previousGrossIncomeSlider !== null &&
        this.props.previousGrossIncomeSlider !== ""
          ? new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(Number(this.props.previousGrossIncome)) // '$100.00'
          : new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(0)
      }`,
      300000: `${new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(300000)} `,
    };
    let first = this.props.applicantFirstName
      ? this.props.applicantFirstName.split(" ")[0]
      : "";
    let last = this.props.applicantLastName
      ? this.props.applicantLastName.split(" ")[0]
      : "";
    first = first ? first.charAt(0).toUpperCase() : "";
    last = last ? last.charAt(0).toUpperCase() : "";
    console.log(this.props, "props data");
    return (
      <React.Fragment>
        <div className="app-form-content">
          <div className="app-form-content-inner">
            <ApplicationHeaderAdmin {...this.props} />
            <ul
              className="nav nav-tabs-2 admin-tabs three-items text-left"
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
                      ? "nav-link active pl-5"
                      : "nav-link pl-5"
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
                      ? "nav-link active pl-5"
                      : "nav-link pl-5"
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
                className="tab-pane fade active show clearfix salman3"
                id="personal-detail"
                role="tabpanel"
                aria-labelledby="personal-detail-tab"
              >
                {this.state.screenName === "personal-detail" ? (
                  <React.Fragment>
                    <div className="forms-head clearfix">
                      {(this.props.applicantFirstName ||
                        this.props.applicantLastName) && (
                        <h1 className="float-left">
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
                          }${
                            this.props.applicantFirstName != undefined &&
                            this.props.applicantFirstName != null
                              ? "'s Details"
                              : ""
                          } `}
                        </h1>
                      )}

                      {(!this.props.coApplicant && !this.props.addAppLication) ? (
                        <Link
                          className="nav-link"
                          to={`${this.props.url}/co-applicant`}
                          onClick={() => this.props.onClickChangeStep(1, 2)}
                        >
                          {" "}
                          <button className=" AddCobtn float-right">
                            <i class="fa fa-plus-circle-fill">
                              {" "}
                              {""} Add co-applicant
                            </i>
                          </button>
                        </Link>
                      ) : null}
                    </div>
                    <div className="form-main">
                      <div className="form-field-row two-col clearfix">
                        <div className="form-field-col">
                          <label>Salutation</label>
                          <Select
                            required
                            placeholder="Select Salutation"
                            id="selectSalutation"
                            name="salutation"
                            options={this.props.salutations}
                            onChange={(e) =>
                              this.props.changeSelect(
                                e,
                                "salutation",
                                "selectSalutation"
                              )
                            }
                            value={this.props.selectSalutation}
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
                          <label> Telephone</label>
                          <NumberFormat
                            required
                            className="form-control"
                            format="+1 (###) ###-####"
                            placeholder="+1 (123) 456-7890"
                            onChange={this.props.handleOnChange}
                            value={this.props.applicantTelephone} //change pop firs
                            name="applicantTelephone"
                          />
                        </div>
                      </div>
                      <div className="form-field-row two-col clearfix">
                        <div className="form-field-col">
                          <label> Gender </label>
                          <Select
                            required
                            placeholder="Gender"
                            id="selectGender"
                            name="gender"
                            options={this.props.genders}
                            onChange={(e) =>
                              this.props.changeSelect(
                                e,
                                "gender",
                                "selectGender"
                              )
                            }
                            value={this.props.selectGender}
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
                          <label> Email</label>
                          <input
                            type="email"
                            className="form-control"
                            name="applicantEmail"
                            placeholder="Email"
                            value={this.props.applicantEmail}
                            onChange={this.props.handleOnChange}
                            disabled={!this.props.addAppLication}
                          />
                        </div>
                      </div>
                      <h1 className="mt-5 pt-2" style={{ fontSize: "18px" }}>
                        Current Address
                      </h1>
                      <div className="form-field-row clearfix">
                        <div className="form-field-col">
                          <label> Street Address </label>

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
                      <div className="form-field-row clearfix">
                        <div className="form-field-col">
                          <label> Street Address Line 2 </label>

                          <input
                            type="text"
                            className="form-control"
                            name="applicantStreetAddress2"
                            placeholder="Street Address Line 2 (Suite, unit etc...)"
                            value={this.props.applicantStreetAddress2}
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
                            placeholder="12345"
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
                                "duration_address_yr"
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
                                  item.value === this.props.duration_address_yr
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
                      </div>
                      <div className="form-field-row two-col clearfix">
                        <div className="form-field-col">
                          <label> Mortgage or rent amount </label>
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
                      {this.props.duration_address_yr &&
                        this.props.duration_address_yr < 2 && (
                          <>
                            <h1
                              className="mt-5 pt-2"
                              style={{ fontSize: "18px" }}
                            >
                              Previous Address
                            </h1>
                            <div className="form-field-row clearfix">
                              <div className="form-field-col">
                                <label> Street Address </label>

                                <input
                                  type="text"
                                  className="form-control"
                                  name="applicantPreviousStreetAddress"
                                  placeholder="Previous Street Address"
                                  value={
                                    this.props.applicantPreviousStreetAddress
                                  }
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
                                  name="applicantPreviousStreetAddress2"
                                  placeholder="Previous Street Address Line 2 (Suite, unit etc...)"
                                  value={
                                    this.props.applicantPreviousStreetAddress2
                                  }
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
                                  id="previousCity"
                                  name="previousCity"
                                  placeholder="City"
                                  className="form-control"
                                  onChange={this.props.handleOnChange}
                                  value={this.props.previousCity}
                                />
                              </div>
                              <div className="form-field-col">
                                <label> Province </label>
                                <Select
                                  required
                                  placeholder="Select Province"
                                  id="selectedPreviousProvince"
                                  name="selectedPreviousProvince"
                                  options={this.props.provinces}
                                  onChange={(e) =>
                                    this.props.changeSelect(
                                      e,
                                      "previousProvince",
                                      "selectedPreviousProvince"
                                    )
                                  }
                                  value={this.props.selectedPreviousProvince}
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
                                  placeholder="12345"
                                  id="previousPostalCode"
                                  name="previousPostalCode"
                                  value={this.props.previousPostalCode}
                                  onChange={this.props.handleOnChange}
                                />
                              </div>
                              <div className="form-field-col">
                                <label> Country </label>
                                <input
                                  required
                                  type="text"
                                  className="form-control"
                                  id="previousCountry"
                                  name="previousCountry"
                                  placeholder="Country"
                                  value={this.props.previousCountry}
                                  onChange={this.props.handleOnChange}
                                />
                              </div>
                            </div>
                            <div className="form-field-row two-col clearfix">
                              <div className="form-field-col">
                                <label>Years at previous address </label>
                                <NumberFormat
                                  required
                                  className="form-control"
                                  value={this.props.durationAtPreviousAddress}
                                  onChange={this.props.handleOnChange}
                                  allowNegative={false}
                                  id="durationAtPreviousAddress"
                                  name="durationAtPreviousAddress"
                                  placeholder="Years"
                                />
                              </div>
                              <div className="form-field-col">
                                <label> Months at previous address </label>
                                <NumberFormat
                                  required
                                  className="form-control"
                                  value={
                                    this.props.durationAtPreviousAddressMonth
                                  }
                                  onChange={this.props.handleOnChange}
                                  allowNegative={false}
                                  id="durationAtPreviousAddressMonth"
                                  name="durationAtPreviousAddressMonth"
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
                                  id="previousSelectedStatus"
                                  name="previousSelectedStatus"
                                  options={this.props.statuses}
                                  onChange={(e) =>
                                    this.props.changeSelect(
                                      e,
                                      "previousStatus",
                                      "previousSelectedStatus"
                                    )
                                  }
                                  value={this.props.previousSelectedStatus}
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
                                <label> Mortgage or rent amount </label>
                                <NumberFormat
                                  required
                                  className="form-control"
                                  value={this.props.previousMortgageAmount}
                                  onChange={this.props.handleOnChange}
                                  allowNegative={false}
                                  id="previousMortgageAmount"
                                  name="previousMortgageAmount"
                                  placeholder="Amount"
                                />
                              </div>
                            </div>
                          </>
                        )}
                    </div>
                    {!this.props.addAppLication && ( <div class="switch-holder">
                      <input
                        id="swicth"
                        type="checkbox"
                        name="personal_complete"
                        checked={this.props.personal_complete}
                        onChange={(e) =>
                          this.props.changeCompleteStatus(
                            e,
                            "personal_complete"
                          )
                        }
                      />
                      <label for="swicth" class="switch">
                        <div></div>
                      </label>
                      <span class="switch-label"> Complete </span>
                    </div>)}

                    <div className="footer-btns-holder clearfix">
                      <Link to={this.props.mainUrl}>
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
                          onClick={() => {
                            if (!this.props.selectSalutation) {
                              alert("Salutation is required");
                            } else if (!this.props.applicantFirstName) {
                              alert("First Name is required");
                            } else if (!this.props.applicantLastName) {
                              alert("Last Name is required");
                            } else if (!this.props.applicantDateOfBirth) {
                              alert("Date Of Birth is required");
                            } else if (!this.props.applicantTelephone) {
                              alert("Telephone is required");
                            } else if (!this.props.selectGender) {
                              alert("select Gender");
                            } else if (
                              !this.props.selectApplicantMaritalStatus
                            ) {
                              alert("Marital Status is required");
                            } else if (!this.props.applicantEmail) {
                              alert("Email is required");
                            } else {
                              this.update_buyer_detail("personal-detail");
                            }
                          }}
                        >
                          {" "}
                          Save{" "}
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
                      <h1 className="">Current Employment Information</h1>
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
                              {" "}
                              {this.props.employmentStatus === "Self employed"
                                ? "Business start date"
                                : "Employment since"}{" "}
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
                              className="form-control callendar"
                            />
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
                              <div className="py-2">
                                <h4> Current Employer Address </h4>
                              </div>
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
                                <Select
                                  required
                                  placeholder="Select Province"
                                  id="selectedEmployerProvince"
                                  name="selectedEmployerProvince"
                                  options={this.props.provinces}
                                  onChange={(e) =>
                                    this.props.changeSelect(
                                      e,
                                      "employerProvince",
                                      "selectedEmployerProvince"
                                    )
                                  }
                                  value={this.props.selectedEmployerProvince}
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
                                <label>Employer Phone</label>
                                <NumberFormat
                                  required
                                  className="form-control"
                                  value={this.props.employerPhone}
                                  onChange={this.props.handleOnChange}
                                  allowNegative={false}
                                  id="employerPhone"
                                  name="employerPhone"
                                  format="+1-###-###-####"
                                  placeholder="+1(123)456-7890"
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
                        // <div className="gross-monthly-income">
                        //   <h2> Monthly Income </h2>
                        <div className="form-field-row two-col clearfix">
                          <div className="form-field-col">
                            <label>Monthly Income</label>
                            <Select
                              required
                              placeholder=""
                              id="monthlySelectedGrossIncome"
                              name="monthlySelectedGrossIncome"
                              options={this.props.grossMonthlyIncomeValues}
                              onChange={(e) =>
                                this.props.changeSelect(
                                  e,
                                  "monthlyGrossIncome",
                                  "monthlySelectedGrossIncome"
                                )
                              }
                              value={this.props.monthlySelectedGrossIncome}
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
                        </div>
                      )}
                    </div>

                    {/* previous  employer  */}
                    {this.props.employmentSinceYear &&
                      this.props.employmentSinceYear < 2 && (
                        <>
                          <div className="forms-head clearfix mt-5">
                            <h1 className="">
                              Previous Employment Information
                            </h1>
                          </div>
                          <div className="form-main">
                            <div className="form-field-row two-col clearfix">
                              <div className="form-field-col">
                                <label> Employment Status </label>
                                <Select
                                  required
                                  placeholder=""
                                  id="selectPreviousEmploymentStatus"
                                  name="selectPreviousEmploymentStatus"
                                  options={this.props.employmentStatuses}
                                  onChange={(e) =>
                                    this.props.changeSelect(
                                      e,
                                      "previousEmploymentStatus",
                                      "selectPreviousEmploymentStatus"
                                    )
                                  }
                                  value={
                                    this.props.selectPreviousEmploymentStatus
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
                              {this.props.previousEmploymentStatus !==
                                "Unemployed" &&
                              this.props.previousEmploymentStatus !==
                                "Retired" ? (
                                this.props.previousEmploymentStatus ===
                                "Self employed" ? (
                                  <div className="form-field-col">
                                    <label> Business Name </label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      name="previousEmployeeBusinessName"
                                      placeholder="Business Name"
                                      value={
                                        this.props.previousEmployeeBusinessName
                                      }
                                      onChange={this.props.handleOnChange}
                                    />
                                  </div>
                                ) : (
                                  <div className="form-field-col">
                                    <label>Type of Employment </label>
                                    <Select
                                      required
                                      placeholder=""
                                      id="selectedPreviousTypeOfEmployment"
                                      name="selectedPreviousTypeOfEmployment"
                                      options={this.props.typeOfEmployments}
                                      onChange={(e) =>
                                        this.props.changeSelect(
                                          e,
                                          "previousTypeOfEmployment",
                                          "selectedPreviousTypeOfEmployment"
                                        )
                                      }
                                      value={
                                        this.props
                                          .selectedPreviousTypeOfEmployment
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
                            {this.props.previousEmploymentStatus ===
                              "Unemployed" ||
                            this.props.previousEmploymentStatus === "Retired" ||
                            this.props.previousEmploymentStatus ===
                              "Self employed" ? null : (
                              <div className="form-field-row two-col clearfix">
                                <div className="form-field-col">
                                  <label> Employer Name </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="previousEmployerName"
                                    placeholder="Employee Name"
                                    value={this.props.previousEmployerName}
                                    onChange={this.props.handleOnChange}
                                  />
                                </div>
                                <div className="form-field-col">
                                  <label>Occupation </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="previousOccupation"
                                    placeholder="Occupation"
                                    value={this.props.previousOccupation}
                                    onChange={this.props.handleOnChange}
                                  />
                                </div>
                              </div>
                            )}

                            <div className="form-field-row two-col clearfix">
                              {this.props.previousEmploymentStatus ===
                                "Unemployed" ||
                              this.props.previousEmploymentStatus ===
                                "Retired" ? null : (
                                <div className="form-field-col">
                                  <label>
                                    {" "}
                                    {this.props.previousEmploymentStatus ===
                                    "Self employed"
                                      ? "Business start date"
                                      : "Employment since"}{" "}
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
                                    selected={
                                      this.props.previousEmploymentSinceYear
                                    }
                                    placeholderText="YYYY-MM-DD"
                                    dateFormat="yyyy-MM-dd"
                                    onChange={(e) =>
                                      this.props.handleOnChangeDates(
                                        e,
                                        "previousEmploymentSinceYear"
                                      )
                                    }
                                    maxDate={new Date()}
                                    className="form-control callendar"
                                  />
                                </div>
                              )}
                              {this.props.previousEmploymentStatus !==
                              "Self employed" ? null : (
                                <div className="form-field-col">
                                  <label> Type of Previous Business </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="previousEmployeeTypeOfBusiness"
                                    placeholder="Type of Business"
                                    value={
                                      this.props.previousEmployeeTypeOfBusiness
                                    }
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
                                    <div class="py-2">
                                      <h4> Previous Employer Address </h4>
                                    </div>

                                    <div className="clearfix ">
                                      <label>Employer Street Address</label>
                                      <input
                                        required
                                        type="text"
                                        className="form-control"
                                        id="previousEmployerStreetAddress"
                                        name="previousEmployerStreetAddress"
                                        placeholder=""
                                        value={
                                          this.props
                                            .previousEmployerStreetAddress
                                        }
                                        onChange={this.props.handleOnChange}
                                      />
                                    </div>
                                  </div>
                                  <div className="form-field-row two-col clearfix">
                                    <div className="form-field-col">
                                      <label>Employer City</label>
                                      <input
                                        type="text"
                                        id="previousEmployerCity"
                                        name="previousEmployerCity"
                                        className="form-control"
                                        placeholder=""
                                        value={this.props.previousEmployerCity}
                                        onChange={this.props.handleOnChange}
                                      />
                                    </div>
                                    <div className="form-field-col">
                                      <label> Employer State</label>
                                      <Select
                                        required
                                        placeholder="Select State"
                                        id="selectedPreviousEmployerProvince"
                                        name="selectedPreviousEmployerProvince"
                                        options={this.props.provinces}
                                        onChange={(e) =>
                                          this.props.changeSelect(
                                            e,
                                            "previousEmployerProvince",
                                            "selectedPreviousEmployerProvince"
                                          )
                                        }
                                        value={
                                          this.props
                                            .selectedPreviousEmployerProvince
                                        }
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
                                      <label> Employer Phone</label>
                                      <NumberFormat
                                        required
                                        className="form-control"
                                        value={this.props.previousEmployerPhone}
                                        onChange={this.props.handleOnChange}
                                        allowNegative={false}
                                        id="previousEmployerPhone"
                                        name="previousEmployerPhone"
                                        format="+1-###-###-####"
                                        placeholder="+1(123)456-7890"
                                      />
                                    </div>

                                    <div className="form-field-col">
                                      <label>Employer Email (optional)</label>
                                      <input
                                        className="form-control"
                                        type="email"
                                        id="previousEmployerEmail"
                                        name="previousEmployerEmail"
                                        placeholder=""
                                        value={this.props.previousEmployerEmail}
                                        onChange={this.props.handleOnChange}
                                      />
                                    </div>
                                  </div>{" "}
                                </>
                              ))}

                            {this.props.previousEmploymentStatus ===
                            "Unemployed" ? null : (
                              // <div className="gross-monthly-income">
                              //   <h2>Monthly Income </h2>
                              <div className="form-field-row two-col clearfix">
                                <div className="form-field-col">
                                  <label>Monthly Income</label>
                                  <Select
                                    required
                                    placeholder=""
                                    id="previousSelectedMonthlyGrossIncome"
                                    name="previousSelectedMonthlyGrossIncome"
                                    options={
                                      this.props.grossMonthlyIncomeValues
                                    }
                                    onChange={(e) =>
                                      this.props.changeSelect(
                                        e,
                                        "previousMonthlyGrossIncome",
                                        "previousSelectedMonthlyGrossIncome"
                                      )
                                    }
                                    value={
                                      this.props
                                        .previousSelectedMonthlyGrossIncome
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
                                This is their total verifiable gross annual sum of income.{" "}
                              </p>
                              <div className="range-slider">
                                <Slider
                                  min={0}
                                  max={300000}
                                  value={this.props.previousGrossIncome}
                                  labels={horizontalLabelsPrevious}
                                  step={500}
                                  // format={formatkg}
                                  // handleLabel={horizontal}
                                  onChange={(v) =>
                                    this.props.handleChangeSlider(
                                      "previousGrossIncome",
                                      v
                                    )
                                  }
                                />
                                {/* <h2> Range Slider here </h2>
                              </div>*/}
                              </div>
                            )}
                          </div>
                        </>
                      )}
                    <div className="forms-head clearfix mt-2">
                      <h1 className="">Other Income</h1>
                    </div>
                    <div className="form-main">
                      <div className="form-field-row two-col clearfix">
                        {/* Other income Added by salman */}
                        <div className="form-field-col">
                          <label> Other Income Type </label>
                          <input
                            className="form-control"
                            type="email"
                            id="income_type"
                            name="income_type"
                            placeholder=""
                            value={this.props.income_type}
                            onChange={this.props.handleOnChange}
                          />
                          {/* <Select
                            required
                            placeholder=""
                            id="selectedIncomeType"
                            name="selectedIncomeType"
                            options={this.props.inComeTypes}
                            onChange={(e) =>
                              this.props.changeSelect(
                                e,
                                "income_type",
                                "selectedIncomeType"
                              )
                            }
                            value={this.props.selectedIncomeType}
                            className="react-select-main"
                            classNamePrefix="react-select"
                            components={{
                              Option: renderOption,
                              MenuList: renderScrollbarOtherIncome,
                            }}
                            captureMenuScroll={false}
                          /> */}
                        </div>

                        <div className="form-field-col">
                          <label>Other Income Amount</label>
                          <NumberFormat
                            required
                            className="form-control"
                            value={this.props.income_amount}
                            onChange={this.props.handleOnChange}
                            allowNegative={false}
                            id="income_amount"
                            name="income_amount"
                            placeholder=""
                            thousandSeparator={true}
                            prefix={"$"}
                          />
                        </div>
                      </div>
                      <div className="form-field-row two-col clearfix">
                        <div className="form-field-col">
                          <label>Frequency</label>
                          <Select
                            required
                            placeholder=""
                            id="selectedIncomeFrequency"
                            name="selectedIncomeFrequency"
                            options={this.props.inComeFrequencies}
                            onChange={(e) =>
                              this.props.changeSelect(
                                e,
                                "income_frequency",
                                "selectedIncomeFrequency"
                              )
                            }
                            value={this.props.selectedIncomeFrequency}
                            className="react-select-main"
                            classNamePrefix="react-select"
                            components={{
                              Option: renderOption,
                              MenuList: renderScrollbarOtherIncome,
                            }}
                            captureMenuScroll={false}
                          />
                        </div>
                      </div>
                    </div>
                    {!this.props.addAppLication && ( <div class="switch-holder">
                      <input
                        id="swicth"
                        type="checkbox"
                        name="employement_complete"
                        checked={this.props.employement_complete}
                        onChange={(e) =>
                          this.props.changeCompleteStatus(
                            e,
                            "employement_complete"
                          )
                        }
                      />
                      <label for="swicth" class="switch">
                        <div></div>
                      </label>
                      <span class="switch-label"> Complete </span>
                    </div>)}


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
                          onClick={() => {
                            this.update_buyer_detail("employment-information");
                          }}
                        >
                          {" "}
                          Save{" "}
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
