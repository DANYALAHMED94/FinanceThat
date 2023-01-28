import React from "react";
import NumberFormat from "react-number-format";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getMonth, getYear } from "date-fns";
import range from "lodash/range";
import { Animated } from "react-animated-css";
import Select, { components } from "react-select";
import { Scrollbars } from "react-custom-scrollbars";
import MonthlyIncomeOptions from "../../../components/MonthlyIncomeOptions";

const { Option } = components;

const renderScrollbar = (props) => {
  return (
    <div style={{ height: 200 }}>
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
const CoApplicantEmploymentInformation = (props) => {
  const bar = props.state.startPerc / 2;
  const lastBar = props.state.startPerc * 1;
  const Next =
    props.state.backFromCo === ""
      ? props.state.startPerCo
      : lastBar + bar + props.state.startPerCo;
  const nextStep = props.state.backFromCo === "" ? 5 : 6;
  const years = range(1990, getYear(new Date()) + 1, 1);
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
  return (
    <React.Fragment>
      <Animated
        animationIn={props.state.animation}
        animationInDuration={500}
        animationOutDuration={500}
        animationOut="fadeOutUp"
        isVisible={true}
      >
        <div className="PostApp-SecThree">
          <div className="PostApp-Head">
            <h1>Co Applicant Employment Information</h1>
          </div>

          <div className="clearfix">
            <form>
              <div className="ApplicantInfo-Container">
                <div className="two-col-grid clearfix">
                  <div className="col-outer pt-0 pb-0">
                    <div className="PostApp-Form">
                      <label>Employment Status</label>
                      <Select
                        required
                        placeholder=""
                        id="selectCoEmploymentStatus"
                        name="selectCoEmploymentStatus"
                        options={props.state.employmentStatuses}
                        onChange={(e) =>
                          props.changeSelect(
                            e,
                            "coEmploymentStatus",
                            "selectCoEmploymentStatus"
                          )
                        }
                        value={props.state.selectCoEmploymentStatus}
                        className="react-select-main"
                        classNamePrefix="react-select"
                        placeHolder="Select Employment Status"
                        components={{
                          Option: renderOption,
                          MenuList: renderScrollbar,
                        }}
                        captureMenuScroll={false}
                        onBlur={() =>
                          props.validator.showMessageFor(
                            "Co Applicant Employement Status"
                          )
                        }
                      />
                      {props.validator.message(
                        "Co Applicant Employement Status",
                        props.state.coEmploymentStatus,
                        "required"
                      )}
                    </div>
                  </div>
                  <div
                    className={
                      props.state.coEmploymentStatus === "Unemployed" ||
                      props.state.coEmploymentStatus === "Retired" ||
                      props.state.coEmploymentStatus === "Self employed"
                        ? "col-outer pt-0 pb-0 display-none"
                        : "col-outer pt-0 pb-0"
                    }
                  >
                    <div className="PostApp-Form">
                      <label>Type of Employment</label>
                      <Select
                        required
                        placeholder=""
                        id="selectCoTypeOfEmployment"
                        name="selectCoTypeOfEmployment"
                        options={props.state.typeOfEmployments}
                        onChange={(e) =>
                          props.changeSelect(
                            e,
                            "coTypeOfEmployment",
                            "selectCoTypeOfEmployment"
                          )
                        }
                        value={props.state.selectCoTypeOfEmployment}
                        className="react-select-main"
                        classNamePrefix="react-select"
                        placeHolder="Select Employment Type"
                        components={{
                          Option: renderOption,
                          MenuList: renderScrollbarTypeEmployee,
                        }}
                        captureMenuScroll={false}
                        onBlur={() =>
                          props.validator.showMessageFor(
                            "Co Applicant Type Of Employee"
                          )
                        }
                      />
                      
                      {props.validator.message(
                        "Co Applicant Type Of Employee",
                        props.state.coTypeOfEmployment,
                        "required"
                      )}
                    </div>
                  </div>
                  <div
                    className={
                      props.state.coEmploymentStatus !== "Self employed"
                        ? "col-outer pt-0 pb-0 display-none"
                        : "col-outer pt-0 pb-0"
                    }
                  >
                    <div className="PostApp-Form Applicantin-Btm">
                      <div className="PostApp-Form Applicantin-Btm">
                        <label>Business Name</label>
                        <input
                          required
                          type="text"
                          id="coEmployeeBusinessName"
                          name="coEmployeeBusinessName"
                          placeHolder="Enter Business Name Here"
                          value={props.state.coEmployeeBusinessName}
                          onChange={props.handleOnChange}
                          onBlur={() =>
                            props.validator.showMessageFor(
                              "Co Applicant Business Name"
                            )
                          }
                        />
                        {props.validator.message(
                          "Co Applicant Business Name",
                          props.state.coEmployeeBusinessName,
                          "required"
                        )}
                      </div>
                    </div>
                  </div>
                  <div
                    className={
                      props.state.coEmploymentStatus === "Unemployed" ||
                      props.state.coEmploymentStatus === "Retired" ||
                      props.state.coEmploymentStatus === "Self employed"
                        ? "col-outer pt-0 pb-0 display-none"
                        : "col-outer pt-0 pb-0"
                    }
                  >
                    <div className="PostApp-Form">
                      <label>Employer Name</label>
                      <input
                        required
                        type="text"
                        id="coEmployerName"
                        name="coEmployerName"
                        value={props.state.coEmployerName}
                        placeHolder="Enter Employer Name Here"
                        onChange={props.handleOnChange}
                        onBlur={() =>
                          props.validator.showMessageFor(
                            "Co Applicant Employer Name"
                          )
                        }
                      />
                      {props.validator.message(
                        "Co Applicant Employer Name",
                        props.state.coEmployerName,
                        "required"
                      )}
                    </div>
                  </div>
                  <div
                    className={
                      props.state.coEmploymentStatus === "Unemployed" ||
                      props.state.coEmploymentStatus === "Retired" ||
                      props.state.coEmploymentStatus === "Self employed"
                        ? "col-outer pt-0 pb-0 display-none"
                        : "col-outer pt-0 pb-0"
                    }
                  >
                    <div className="PostApp-Form">
                      <label>Occupation</label>
                      <input
                        required
                        type="text"
                        id="coOccupation"
                        name="coOccupation"
                        placeHolder="Occupation"
                        onChange={props.handleOnChange}
                        value={props.state.coOccupation}
                        onBlur={() =>
                          props.validator.showMessageFor(
                            "Co Applicant Employer Occupation"
                          )
                        }
                      />
                      {props.validator.message(
                        "Co Applicant Employer Occupation",
                        props.state.coOccupation,
                        "required"
                      )}
                    </div>
                  </div>
                  <div
                    className={
                      props.state.coEmploymentStatus === "Unemployed"
                        ? "col-outer pt-0 pb-0 display-none"
                        : "col-outer pt-0 pb-0"
                    }
                  >
                    <div className="PostApp-Form Applicantin-Btm">
                    <label>Monthly income</label>
                      <MonthlyIncomeOptions 
                      value={props.state.coGrossIncome}
                      getDuration={(e) =>{
                          let ee = {target:{ name: "coGrossIncome", value:  e.value}};
                          props.handleOnChange(ee)
                          }} />
                      {props.validator.message(
                        "Co Applicant Monthly Income",
                        props.state.coGrossIncome,
                        "required"
                      )}
                    </div>
                  </div>

                  <div
                    className={
                      props.state.coEmploymentStatus === "Unemployed" ||
                      props.state.coEmploymentStatus === "Retired"
                        ? "col-outer pt-0 pb-0 display-none"
                        : "col-outer pt-0 pb-0"
                    }
                  >
                    <div className="PostApp-Form Applicantin-Btm">
                      <label>
                        {/* {props.state.employmentStatus === "Self employed"
                          ? "Business start date"
                          : "Employment since"} */}
                        Duration
                      </label>
                      <div className="flexCenter">
                        <div className="flexCenter mr-3">
                          <NumberFormat
                            required
                            className="form-control"
                            value={props.state.coEmploymentSinceYear}
                            onChange={props.handleOnChange}
                            allowNegative={false}
                            id="coEmploymentSinceYear"
                            name="coEmploymentSinceYear"
                            style={{ width: "50px" }}
                            onBlur={() =>
                              props.validator.showMessageFor(
                                "Co Applicant Employment Since Year"
                              )
                            }
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
                            value={props.state.coEmploymentSinceMonth}
                            onChange={props.handleOnChange}
                            allowNegative={false}
                            id="coEmploymentSinceMonth"
                            name="coEmploymentSinceMonth"
                            style={{ width: "50px" }}
                            onBlur={() =>
                              props.validator.showMessageFor(
                                "Co Applicant Employment Since Month"
                              )
                            }
                          />
                          <label
                            className="mb-0 ml-2"
                            style={{ color: "#828385" }}
                          >
                            Month
                          </label>
                        </div>
                      </div>

                      <div className="flexCenter mt-3">
                        {props.validator.message(
                          "Co Applicant Employment Since Year",
                          props.state.coEmploymentSinceYear,
                          "required"
                        )}
                        {props.state.coEmploymentSinceYear &&
                          props.validator.message(
                            "Co Applicant Employment Since Month",
                            props.state.coEmploymentSinceMonth,
                            "required"
                          )}
                      </div>
                    </div>
                  </div>

                  <div
                    className={
                      props.state.coEmploymentStatus !== "Self employed"
                        ? "col-outer pt-0 pb-0 display-none"
                        : "col-outer pt-0 pb-0"
                    }
                  >
                    <div className="PostApp-Form Applicantin-Btm">
                      <div className="PostApp-Form Applicantin-Btm">
                        <label>Type of Business</label>
                        <input
                          required
                          type="text"
                          id="coEmployeeTypeOfBusiness"
                          name="coEmployeeTypeOfBusiness"
                          placeHolder="Enter Business Type Here"
                          value={props.state.coEmployeeTypeOfBusiness}
                          onChange={props.handleOnChange}
                          onBlur={() =>
                            props.validator.showMessageFor(
                              "Co Applicant Business Type"
                            )
                          }
                        />
                        {props.validator.message(
                          "Co Applicant Business Type",
                          props.state.coEmployeeTypeOfBusiness,
                          "required"
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row align-items-center">
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6">
                  <div className="PostApp-NextBtn previous-btn float-left">
                    <button
                      type="button"
                      onClick={() =>
                        props.changeStepCoApplicant(2, -props.state.startPerCo)
                      }
                    >
                      {" "}
                      <i className="fa fa-angle-left"></i> Previous{" "}
                    </button>
                  </div>
                </div>
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6">
                  <div className="PostApp-NextBtn float-right">
                    <button
                      type="button"
                      onClick={
                        ["Unemployed", "Retired"].includes(
                          props.state.coEmploymentStatus
                        )
                          ? () => props.changeStepButton(4, nextStep, Next)
                          : () => props.changeCoEmploymentStep(1)
                      }
                    >
                      Next <i className="fa fa-angle-right"></i>
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </Animated>
    </React.Fragment>
  );
};
export default CoApplicantEmploymentInformation;
