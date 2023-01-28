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
import ConfirmModel from "../alertMessages/ConfirmModel";
import { API_URL } from "../../constant";

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

  update_buyer_detail = () => {
    const data = {
      id: this.props.buyerAppId,
      co_applicant: {
        first_name: this.props.coApplicantFirstName,
        last_name: this.props.coApplicantLastName,
        telephone: this.props.coApplicantTelephone,
        address: this.props.coApplicantLocationName,
        province: this.props.coApplicantProvince,
        city: this.props.coApplicantCity,
        postal_code: this.props.coApplicantPostalCode,
        country: this.props.coApplicantCountry,
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
  };
  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.updateCoBuyerApplicationPersonal !==
        this.props.updateCoBuyerApplicationPersonal &&
      this.props.updateCoBuyerApplicationPersonal !== undefined
    ) {
      this.props.onClickChangeStep(3);
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
                  this.props.coApplicantFirstName
                    ? this.props.coApplicantFirstName || ""
                    : ""
                } ${
                  this.props.coApplicantLastName
                    ? this.props.coApplicantLastName || ""
                    : ""
                }`}{" "}
              </strong>{" "}
              <span className="type d-inline-block">
                {" "}
                {this.props.firstTypeOfVehicle}{" "}
              </span>
              {/* <p> <span className="">  {this.props.firstTypeOfVehicle} </span>  </p> */}
            </div>
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
                      <div className="form-field-row clearfix">
                        <div className="form-field-col">
                          <label> Dealership Name </label>
                          <input
                            type="text"
                            className="form-control"
                            name="coApplicantDealerShipName"
                            placeholder="Dealer Ship Name"
                            value={this.props.coApplicantDealerShipName}
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
                        <div className="form-field-col">
                          <label> Email </label>
                          <input
                            type="text"
                            className="form-control"
                            name="coApplicantEmail"
                            placeholder="Email"
                            value={this.props.coApplicantEmail}
                            onChange={this.props.handleOnChange}
                          />
                        </div>
                      </div>
                      <div className="form-field-row clearfix">
                        <div className="form-field-col">
                          <label> Street Address </label>
                          <input
                            type="text"
                            className="form-control"
                            name="coApplicantLocationName"
                            placeholder="Street Address"
                            value={this.props.coApplicantLocationName}
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
                    </div>
                    <div className="footer-btns-holder clearfix">
                      <Link to={`${this.props.url}/applicant-detail`}>
                        {" "}
                        <button
                          className="btn btn-primary float-left"
                          onClick={() => this.props.onClickChangeStep(1)}
                        >
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
